const mysql = require("mysql2/promise");

let pool;

function getPool() {
    if (!process.env.MYSQL_URL) {
        throw new Error("Missing MYSQL_URL.");
    }

    if (!pool) {
        const databaseUrl = new URL(process.env.MYSQL_URL);
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

module.exports = {
    getPool
};
