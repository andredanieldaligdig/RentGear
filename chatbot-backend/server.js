const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
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

function getRequiredEnv(name) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }

    return value;
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

function getResendFromAddress() {
    return process.env.RESEND_FROM_EMAIL || "RentGear <onboarding@resend.dev>";
}

function getResendInboxAddress() {
    return process.env.RESEND_TO_EMAIL || process.env.GMAIL_TO_EMAIL || "andredanieldaligdig1@gmail.com";
}

function getFirebaseWebConfig() {
    return {
        apiKey: getRequiredEnv("FIREBASE_API_KEY"),
        authDomain: getRequiredEnv("FIREBASE_AUTH_DOMAIN"),
        projectId: getRequiredEnv("FIREBASE_PROJECT_ID"),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "",
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "",
        appId: getRequiredEnv("FIREBASE_APP_ID"),
        measurementId: process.env.FIREBASE_MEASUREMENT_ID || ""
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

function getAvailabilityLine(availability) {
    return availability.carFound
        ? availability.isAvailable
            ? `${availability.displayName} appears available for the selected dates.`
            : `${availability.displayName} already has an overlapping confirmed reservation or is not marked available.`
        : "The requested car could not be matched exactly in the cars table.";
}

async function findMatchingCar(connection, requestedCar, requestedCarId = null) {
    const numericCarId = Number(requestedCarId);

    // Search by car ID first
    if (Number.isInteger(numericCarId) && numericCarId > 0) {
        const [rows] = await connection.execute(
            `
            SELECT
                id,
                brand,
                model,
                CONCAT(brand, ' ', model) AS name,
                status
            FROM cars
            WHERE id = ?
            LIMIT 1
            `,
            [numericCarId]
        );

        if (rows[0]) return rows[0];
    }

    const normalized = String(requestedCar || "").trim();

    if (!normalized) {
        return null;
    }

    // Search by brand + model
    const [rows] = await connection.execute(
    `
    SELECT
        id,
        brand,
        model,
        CONCAT(brand, ' ', model) AS name,
        status
    FROM cars
    WHERE LOWER(CONCAT(brand, ' ', model)) = LOWER(?)
       OR LOWER(model) = LOWER(?)
    LIMIT 1
    `,
    [normalized, normalized]
);

    return rows[0] || null;
}

async function buildAvailability(connection, requestedCar, pickupDate, returnDate, requestedCarId = null) {
    const car = await findMatchingCar(connection, requestedCar, requestedCarId);
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

    const displayName = car.name;
    const isAvailable = car.status === "available" && reservationRows.length === 0;

    return {
        carFound: true,
        carId: car.id,
        displayName,
        isAvailable
    };
}

async function sendInternalLeadEmail(lead, availability) {
    const resend = getResendClient();
    const from = getResendFromAddress();
    const to = getResendInboxAddress();
    const availabilityLine = getAvailabilityLine(availability);

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

    return { subject, htmlTextSummary: availabilityLine, recipient: to };
}

async function sendCustomerConfirmationEmail(lead, availability, leadId) {
    const resend = getResendClient();
    const from = getResendFromAddress();
    const to = String(lead.email).trim().toLowerCase();
    const availabilityLine = getAvailabilityLine(availability);
    const subject = `RentGear inquiry received${leadId ? ` (#${leadId})` : ""}`;
    const html = `
        <h2>We received your RentGear inquiry</h2>
        <p>Hi ${escapeHtml(lead.name)},</p>
        <p>Thank you for contacting RentGear. This message is your confirmation that we received your vehicle inquiry and sent it to our team for review.</p>
        <p><strong>Inquiry reference:</strong> ${escapeHtml(leadId || "Pending")}</p>
        <p><strong>Requested car:</strong> ${escapeHtml(lead.requested_car)}</p>
        <p><strong>Pickup date:</strong> ${escapeHtml(lead.pickup_date)}</p>
        <p><strong>Return date:</strong> ${escapeHtml(lead.return_date)}</p>
        <p><strong>Status:</strong> Inquiry received</p>
        <p><strong>Availability note:</strong> ${escapeHtml(availabilityLine)}</p>
        <hr>
        <p>Our team will follow up with you using this email address if any clarification is needed.</p>
        <p>RentGear</p>
    `;

    await resend.emails.send({
        from,
        to,
        subject,
        html
    });

    return {
        subject,
        htmlTextSummary: `Customer confirmation sent for inquiry #${leadId || "pending"}.`,
        recipient: to
    };
}

app.get("/health", (req, res) => {
    res.json({ ok: true });
});

app.get("/api/config", (req, res) => {
    try {
        res.json({ firebase: getFirebaseWebConfig() });
    } catch (error) {
        res.status(500).json({ error: error.message || "Firebase web configuration is unavailable." });
    }
});

app.get("/api/bookings/history", async (req, res) => {
    const email = String(req.query.email || "").trim().toLowerCase();

    if (!email) {
        res.status(400).json({ message: "Email is required." });
        return;
    }

    try {
        const connection = getPool();
        await connection.query("SELECT 1");
        const [rows] = await connection.execute(
            `
                SELECT id, name, email, phone, message, requested_car, pickup_date, return_date, status, created_at
                FROM chatbot_leads
                WHERE email = ?
                ORDER BY created_at DESC
                LIMIT 8
            `,
            [email]
        );

        res.json({
            success: true,
            bookings: rows.map((row) => ({
                reference_id: row.id ? `RG-${row.id}` : "",
                name: row.name,
                email: row.email,
                phone: row.phone,
                message: row.message,
                requested_car: row.requested_car,
                pickup_date: row.pickup_date,
                return_date: row.return_date,
                status: row.status,
                created_at: row.created_at instanceof Date ? row.created_at.toISOString().slice(0, 10) : String(row.created_at || "")
            }))
        });
    } catch (error) {
        res.status(500).json({ message: error.message || "Booking history could not be loaded." });
    }
});

async function handleChatbotLead(req, res) {
    const { requested_car, requested_car_id, pickup_date, return_date, name, email } = req.body || {};

    if (!requested_car || !pickup_date || !return_date || !name || !email) {
        res.status(400).json({ message: "Requested car, pickup date, return date, name, and email are required." });
        return;
    }

    if (!isValidDate(pickup_date) || !isValidDate(return_date)) {
        res.status(400).json({ message: "Pickup date and return date must use YYYY-MM-DD format." });
        return;
    }

    if (new Date(return_date) < new Date(pickup_date)) {
        res.status(400).json({ message: "Return date must be the same as or later than the pickup date." });
        return;
    }

    let leadId = null;

    try {
        const connection = getPool();
        const availability = await buildAvailability(
    connection,
    requested_car,
    pickup_date,
    return_date,
    requested_car_id
);

// HARD STOP (must be before ANY DB write)
if (!availability.carFound) {
    console.log("BLOCKED INVALID CAR:", requested_car);

    return res.status(400).json({
        success: false,
        error: "INVALID_CAR",
        message: "Car not found. Please select a valid car."
    });
}

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
                " ",
                "Reservation request submitted from website chatbot",
                String(requested_car).trim(),
                pickup_date,
                return_date
            ]
        );

        leadId = leadResult.insertId;

        const leadPayload = {
            requested_car: String(requested_car).trim(),
            pickup_date,
            return_date,
            name: String(name).trim(),
            email: String(email).trim().toLowerCase()
        };

        const internalEmailResult = await sendInternalLeadEmail(
            leadPayload,
            availability
        );

        const customerEmailResult = await sendCustomerConfirmationEmail(
            {
                ...leadPayload
            },
            availability,
            leadId
        );

        await connection.execute(
            `
                INSERT INTO email_logs (user_email, subject, message, type)
                VALUES (?, ?, ?, 'chatbot')
            `,
            [leadPayload.email, internalEmailResult.subject, `Internal inquiry email sent to ${internalEmailResult.recipient}. ${internalEmailResult.htmlTextSummary}`]
        );

        await connection.execute(
            `
                INSERT INTO email_logs (user_email, subject, message, type)
                VALUES (?, ?, ?, 'chatbot')
            `,
            [leadPayload.email, customerEmailResult.subject, `Customer confirmation email sent to ${customerEmailResult.recipient}. ${customerEmailResult.htmlTextSummary}`]
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
app.post("/api/cars/validate", async (req, res) => {
    try {
        const { requested_car } = req.body || {};

        if (!requested_car) {
            return res.status(400).json({
                success: false,
                message: "Car name is required."
            });
        }

        const connection = getPool();

        const car = await findMatchingCar(
            connection,
            requested_car
        );

        if (!car) {
            return res.status(404).json({
                success: false,
                message: "Car not found."
            });
        }

        return res.json({
            success: true,
            car: {
                id: car.id,
                brand: car.brand,
                model: car.model
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server error validating car."
        });
    }
});
app.post("/api/chatbot/lead", handleChatbotLead);
app.post("/chatbot-reservation", handleChatbotLead);

app.listen(port, () => {
    console.log(`Chatbot backend listening on port ${port}`);
});
