const { getPool } = require("./_lib/db");
const { verifyIdTokenFromRequest } = require("./_lib/firebase-admin");

const DAY_IN_MS = 24 * 60 * 60 * 1000;

function isValidDate(value) {
    return /^\d{4}-\d{2}-\d{2}$/.test(String(value || ""));
}

function getRentalDays(pickupDate, returnDate) {
    const pickup = new Date(`${pickupDate}T00:00:00Z`);
    const dropoff = new Date(`${returnDate}T00:00:00Z`);
    const difference = Math.round((dropoff.getTime() - pickup.getTime()) / DAY_IN_MS);

    return Math.max(1, difference);
}

async function assertReservationsSchema(pool) {
    const [columns] = await pool.query("SHOW COLUMNS FROM reservations");
    const columnNames = new Set(columns.map((column) => String(column.Field || "").toLowerCase()));

    if (!columnNames.has("firebase_uid") || columnNames.has("user_id")) {
        throw new Error("The reservations table still needs the Firebase migration. Add a firebase_uid column and remove the MySQL-only user_id dependency first.");
    }

    if (!columnNames.has("car_id") || !columnNames.has("pickup_date") || !columnNames.has("return_date") || !columnNames.has("total_price")) {
        throw new Error("The reservations table is missing one or more required columns: car_id, pickup_date, return_date, total_price.");
    }
}

async function findCar(pool, body) {
    const numericCarId = Number(body?.carId);
    if (Number.isInteger(numericCarId) && numericCarId > 0) {
        const [rows] = await pool.execute(
            `
                SELECT id, brand, model, price_per_day, status
                FROM cars
                WHERE id = ?
                LIMIT 1
            `,
            [numericCarId]
        );

        return rows[0] || null;
    }

    const vehicleName = String(body?.vehicleName || "").trim();
    if (!vehicleName) {
        return null;
    }

    const [rows] = await pool.execute(
        `
            SELECT id, brand, model, price_per_day, status
            FROM cars
            WHERE LOWER(TRIM(CONCAT(brand, ' ', model))) = LOWER(TRIM(?))
               OR LOWER(TRIM(model)) = LOWER(TRIM(?))
            LIMIT 1
        `,
        [vehicleName, vehicleName]
    );

    return rows[0] || null;
}

module.exports = async function handler(req, res) {
    res.setHeader("Content-Type", "application/json");

    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        res.status(405).json({ error: "Method not allowed." });
        return;
    }

    let body;
    try {
        body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    } catch (error) {
        res.status(400).json({ error: "Request body must be valid JSON." });
        return;
    }

    const requiredFields = ["pickupDate", "returnDate"];

    for (const field of requiredFields) {
        if (!body || !body[field]) {
            res.status(400).json({ error: `Missing required field: ${field}.` });
            return;
        }
    }

    if (!body.carId && !body.vehicleName) {
        res.status(400).json({ error: "Either carId or vehicleName is required." });
        return;
    }

    if (!isValidDate(body.pickupDate) || !isValidDate(body.returnDate)) {
        res.status(400).json({ error: "pickupDate and returnDate must use YYYY-MM-DD format." });
        return;
    }

    if (String(body.returnDate) < String(body.pickupDate)) {
        res.status(400).json({ error: "returnDate must be the same as or later than pickupDate." });
        return;
    }

    let decodedToken = null;
    try {
        decodedToken = await verifyIdTokenFromRequest(req);
    } catch (error) {
        res.status(401).json({ error: "Firebase ID token is invalid or expired." });
        return;
    }

    if (!decodedToken?.uid) {
        res.status(401).json({ error: "Firebase authentication is required for reservations." });
        return;
    }

    try {
        const pool = getPool();
        await assertReservationsSchema(pool);

        const car = await findCar(pool, body);
        if (!car) {
            res.status(404).json({ error: "The selected car could not be matched in MySQL." });
            return;
        }

        if (car.status !== "available") {
            res.status(409).json({ error: "That car is not currently available for reservation." });
            return;
        }

        const [existingReservations] = await pool.execute(
            `
                SELECT id
                FROM reservations
                WHERE car_id = ?
                  AND status IN ('pending', 'confirmed')
                  AND pickup_date <= ?
                  AND return_date >= ?
                LIMIT 1
            `,
            [car.id, body.returnDate, body.pickupDate]
        );

        if (existingReservations.length) {
            res.status(409).json({ error: "That car already has an overlapping reservation for the selected dates." });
            return;
        }

        const rentalDays = getRentalDays(body.pickupDate, body.returnDate);
        const totalPrice = Number(car.price_per_day || 0) * rentalDays;
        const query = `
            insert into reservations (
                firebase_uid,
                car_id,
                pickup_date,
                return_date,
                total_price,
                status
            )
            values (?, ?, ?, ?, ?, ?)
        `;

        const values = [
            decodedToken.uid,
            car.id,
            body.pickupDate,
            body.returnDate,
            totalPrice,
            "pending"
        ];

        const [result] = await pool.execute(query, values);
        res.status(200).json({
            success: true,
            reservation: {
                id: result.insertId,
                firebase_uid: decodedToken.uid,
                carId: car.id,
                vehicleName: `${car.brand} ${car.model}`.trim(),
                totalPrice,
                status: "pending"
            }
        });
    } catch (error) {
        res.status(500).json({
            error: error.message || "Unexpected MySQL reservation error."
        });
    }
};
