const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const admin = require("firebase-admin");
const mysql = require("mysql2/promise");
const { Resend } = require("resend");

dotenv.config({ path: path.resolve(__dirname, ".env") });
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const port = Number(process.env.PORT || 3000);
const siteRoot = path.resolve(__dirname, "..");

app.use(cors());
app.use(express.json());
app.use(express.static(siteRoot));

let pool;
let firebaseAdminApp;

function getRequiredEnv(name) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }

    return value;
}

function getStatusForAuthError(error) {
    const message = String(error?.message || "");

    if (message.includes("Missing Firebase ID token")) {
        return 401;
    }

    if (message.includes("verify your email")) {
        return 403;
    }

    if (
        message.includes("Firebase ID token") ||
        message.includes("auth/") ||
        message.includes("argument-error") ||
        message.includes("decoding Firebase ID token")
    ) {
        return 401;
    }

    return 500;
}

function getPool() {
    if (!pool) {
        const databaseUrl = new URL(getRequiredEnv("MYSQL_URL"));
        pool = mysql.createPool({
            host: databaseUrl.hostname,
            port: databaseUrl.port ? Number(databaseUrl.port) : 3306,
            user: decodeURIComponent(databaseUrl.username),
            password: decodeURIComponent(databaseUrl.password),
            database: databaseUrl.pathname.replace(/^\//, ""),
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
            ssl: process.env.MYSQL_SSL === "disable" ? undefined : { rejectUnauthorized: false }
        });
    }

    return pool;
}

function getResendClient() {
    return new Resend(getRequiredEnv("RESEND_API_KEY"));
}

function getFirebaseAdminApp() {
    if (firebaseAdminApp) {
        return firebaseAdminApp;
    }

    const projectId = getRequiredEnv("FIREBASE_PROJECT_ID");
    const clientEmail = getRequiredEnv("FIREBASE_ADMIN_CLIENT_EMAIL");
    const privateKey = getRequiredEnv("FIREBASE_ADMIN_PRIVATE_KEY").replace(/\\n/g, "\n");

    firebaseAdminApp = admin.apps.length
        ? admin.app()
        : admin.initializeApp({
            credential: admin.credential.cert({
                projectId,
                clientEmail,
                privateKey
            })
        });

    return firebaseAdminApp;
}

async function verifyFirebaseTokenFromRequest(req) {
    const authHeader = req.headers.authorization || "";
    if (!authHeader.startsWith("Bearer ")) {
        throw new Error("Missing Firebase ID token.");
    }

    const token = authHeader.slice("Bearer ".length).trim();
    if (!token) {
        throw new Error("Missing Firebase ID token.");
    }

    const firebaseApp = getFirebaseAdminApp();
    return admin.auth(firebaseApp).verifyIdToken(token);
}

async function ensureUsersAuthColumns(connection) {
    const [firebaseUidColumns] = await connection.query("SHOW COLUMNS FROM users LIKE 'firebase_uid'");
    if (!firebaseUidColumns.length) {
        await connection.query("ALTER TABLE users ADD COLUMN firebase_uid VARCHAR(128) NULL AFTER id");
    }

    const [emailVerifiedColumns] = await connection.query("SHOW COLUMNS FROM users LIKE 'email_verified'");
    if (!emailVerifiedColumns.length) {
        await connection.query("ALTER TABLE users ADD COLUMN email_verified TINYINT(1) NOT NULL DEFAULT 0 AFTER password");
    }
}

async function upsertFirebaseUser(connection, decodedToken, usernameOverride = "") {
    await ensureUsersAuthColumns(connection);

    const email = String(decodedToken.email || "").trim().toLowerCase();
    if (!email) {
        throw new Error("Firebase user does not have an email address.");
    }

    const firebaseUid = String(decodedToken.uid || "").trim();
    const emailVerified = decodedToken.email_verified ? 1 : 0;
    const preferredUsername = String(usernameOverride || decodedToken.name || email.split("@")[0] || "RentGear User").trim();

    const [rows] = await connection.execute(
        `
            SELECT id, username, email
            FROM users
            WHERE firebase_uid = ?
               OR email = ?
            LIMIT 1
        `,
        [firebaseUid, email]
    );

    const existingUser = rows[0];

    if (existingUser) {
        await connection.execute(
            `
                UPDATE users
                SET username = ?, email = ?, firebase_uid = ?, email_verified = ?
                WHERE id = ?
            `,
            [preferredUsername || existingUser.username, email, firebaseUid, emailVerified, existingUser.id]
        );

        return {
            id: existingUser.id,
            username: preferredUsername || existingUser.username,
            email,
            emailVerified: Boolean(emailVerified)
        };
    }

    const [result] = await connection.execute(
        `
            INSERT INTO users (username, email, password, firebase_uid, email_verified)
            VALUES (?, ?, ?, ?, ?)
        `,
        [preferredUsername, email, "firebase-auth", firebaseUid, emailVerified]
    );

    return {
        id: result.insertId,
        username: preferredUsername,
        email,
        emailVerified: Boolean(emailVerified)
    };
}

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }[character]));
}

function isValidDate(value) {
    return /^\d{4}-\d{2}-\d{2}$/.test(String(value || ""));
}

async function findMatchingCar(connection, requestedCar) {
    const normalized = String(requestedCar || "").trim();
    if (!normalized) {
        return null;
    }

    const [rows] = await connection.execute(
        `
            SELECT id, brand, model, status
            FROM cars
            WHERE LOWER(TRIM(CONCAT(brand, ' ', model))) = LOWER(TRIM(?))
               OR LOWER(TRIM(model)) = LOWER(TRIM(?))
            LIMIT 1
        `,
        [normalized, normalized]
    );

    return rows[0] || null;
}

async function buildAvailability(connection, requestedCar, pickupDate, returnDate) {
    const car = await findMatchingCar(connection, requestedCar);
    if (!car) {
        return {
            carFound: false,
            displayName: requestedCar,
            isAvailable: null
        };
    }

    const [reservationRows] = await connection.execute(
        `
            SELECT id
            FROM reservations
            WHERE car_id = ?
              AND status = 'confirmed'
              AND pickup_date <= ?
              AND return_date >= ?
        `,
        [car.id, returnDate, pickupDate]
    );

    const displayName = `${car.brand} ${car.model}`.trim();
    const isAvailable = car.status === "available" && reservationRows.length === 0;

    return {
        carFound: true,
        carId: car.id,
        displayName,
        isAvailable
    };
}

async function sendLeadEmail(lead, availability) {
    const resend = getResendClient();
    const from = process.env.RESEND_FROM_EMAIL || "RentGear <onboarding@resend.dev>";
    const to = process.env.RESEND_TO_EMAIL || process.env.GMAIL_TO_EMAIL || "andredanieldaligdig1@gmail.com";
    const availabilityLine = availability.carFound
        ? availability.isAvailable
            ? `${availability.displayName} appears available for the selected dates.`
            : `${availability.displayName} already has an overlapping confirmed reservation or is not marked available.`
        : "The requested car could not be matched exactly in the cars table.";

    const subject = `New chatbot reservation request for ${lead.requested_car}`;
    const html = `
        <h2>New RentGear chatbot reservation request</h2>
        <p><strong>Requested car:</strong> ${escapeHtml(lead.requested_car)}</p>
        <p><strong>Pickup date:</strong> ${escapeHtml(lead.pickup_date)}</p>
        <p><strong>Return date:</strong> ${escapeHtml(lead.return_date)}</p>
        <p><strong>Name:</strong> ${escapeHtml(lead.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(lead.email)}</p>
        <p><strong>Availability check:</strong> ${escapeHtml(availabilityLine)}</p>
        <hr>
        <p>This request was submitted from the floating booking chatbot.</p>
    `;

    await resend.emails.send({
        from,
        to,
        subject,
        html
    });

    return { subject, htmlTextSummary: availabilityLine };
}

app.get("/health", (req, res) => {
    res.json({ ok: true });
});

app.post("/api/auth/signup", async (req, res) => {
    const { username } = req.body || {};

    if (!username) {
        res.status(400).json({ message: "Username is required." });
        return;
    }

    try {
        const connection = getPool();
        const decodedToken = await verifyFirebaseTokenFromRequest(req);
        const user = await upsertFirebaseUser(connection, decodedToken, String(username).trim());

        res.status(201).json({
            success: true,
            verificationRequired: !user.emailVerified,
            user
        });
    } catch (error) {
        res.status(getStatusForAuthError(error)).json({ message: error.message || "Signup failed." });
    }
});

app.post("/api/auth/login", async (req, res) => {
    try {
        const connection = getPool();
        const decodedToken = await verifyFirebaseTokenFromRequest(req);
        const user = await upsertFirebaseUser(connection, decodedToken);

        if (!decodedToken.email_verified) {
            res.status(403).json({ message: "Please verify your email address before logging in." });
            return;
        }

        res.json({
            success: true,
            user
        });
    } catch (error) {
        res.status(getStatusForAuthError(error)).json({ message: error.message || "Login failed." });
    }
});

async function handleChatbotLead(req, res) {
    const { requested_car, pickup_date, return_date, name, email } = req.body || {};

    if (!requested_car || !pickup_date || !return_date || !name || !email) {
        res.status(400).json({ message: "Requested car, pickup date, return date, name, and email are required." });
        return;
    }

    if (!isValidDate(pickup_date) || !isValidDate(return_date)) {
        res.status(400).json({ message: "Pickup date and return date must use YYYY-MM-DD format." });
        return;
    }

    if (String(return_date) < String(pickup_date)) {
        res.status(400).json({ message: "Return date must be the same as or later than the pickup date." });
        return;
    }

    let leadId = null;

    try {
        const connection = getPool();
        const availability = await buildAvailability(connection, requested_car, pickup_date, return_date);

        const [leadResult] = await connection.execute(
            `
                INSERT INTO chatbot_leads (
                    name,
                    email,
                    phone,
                    message,
                    requested_car,
                    pickup_date,
                    return_date,
                    status
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, 'new')
            `,
            [
                String(name).trim(),
                String(email).trim().toLowerCase(),
                null,
                "Reservation request submitted from website chatbot",
                String(requested_car).trim(),
                pickup_date,
                return_date
            ]
        );

        leadId = leadResult.insertId;

        const emailResult = await sendLeadEmail(
            {
                requested_car: String(requested_car).trim(),
                pickup_date,
                return_date,
                name: String(name).trim(),
                email: String(email).trim().toLowerCase()
            },
            availability
        );

        await connection.execute(
            `
                INSERT INTO email_logs (user_email, subject, message, type)
                VALUES (?, ?, ?, 'chatbot')
            `,
            [String(email).trim().toLowerCase(), emailResult.subject, emailResult.htmlTextSummary]
        );

        await connection.execute(
            `
                UPDATE chatbot_leads
                SET status = 'emailed'
                WHERE id = ?
            `,
            [leadId]
        );

        res.json({
            success: true,
            leadId,
            availability
        });
    } catch (error) {
        if (leadId) {
            try {
                await getPool().execute(
                    `
                        UPDATE chatbot_leads
                        SET status = 'processed'
                        WHERE id = ?
                    `,
                    [leadId]
                );
            } catch (updateError) {
                console.error("Failed to update lead status after error:", updateError);
            }
        }

        console.error(error);
        res.status(500).json({ message: error.message || "Chatbot request failed." });
    }
}

app.post("/api/chatbot/lead", handleChatbotLead);
app.post("/chatbot-reservation", handleChatbotLead);

app.listen(port, () => {
    console.log(`Chatbot backend listening on port ${port}`);
});
