const { getPool } = require("./_lib/db");
const { verifyIdTokenFromRequest } = require("./_lib/firebase-admin");

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

    const requiredFields = [
        "vehicleName",
        "pickupLocation",
        "customerName",
        "email",
        "phone",
        "driversLicense",
        "pickupDate",
        "returnDate"
    ];

    for (const field of requiredFields) {
        if (!body || !body[field]) {
            res.status(400).json({ error: `Missing required field: ${field}.` });
            return;
        }
    }

    let decodedToken = null;
    try {
        decodedToken = await verifyIdTokenFromRequest(req);
    } catch (error) {
        res.status(401).json({ error: "Firebase ID token is invalid or expired." });
        return;
    }

    try {
        const pool = getPool();
        const query = `
            insert into reservations (
                firebase_uid,
                vehicle_name,
                pickup_location,
                customer_name,
                email,
                phone,
                drivers_license,
                pickup_date,
                return_date,
                notes,
                status
            )
            values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            decodedToken?.uid || null,
            body.vehicleName,
            body.pickupLocation,
            body.customerName,
            body.email,
            body.phone,
            body.driversLicense,
            body.pickupDate,
            body.returnDate,
            body.notes || null,
            "pending"
        ];

        const [result] = await pool.execute(query, values);
        res.status(200).json({
            success: true,
            reservation: {
                id: result.insertId,
                status: "pending"
            }
        });
    } catch (error) {
        res.status(500).json({
            error: error.message || "Unexpected MySQL reservation error."
        });
    }
};
