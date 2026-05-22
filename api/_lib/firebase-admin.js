const admin = require("firebase-admin");

let app;

function getPrivateKey() {
    return (process.env.FIREBASE_ADMIN_PRIVATE_KEY || "").replace(/\\n/g, "\n");
}

function getFirebaseAdminApp() {
    if (app) {
        return app;
    }

    const projectId = process.env.FIREBASE_PROJECT_ID || "";
    const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL || "";
    const privateKey = getPrivateKey();

    if (!projectId || !clientEmail || !privateKey) {
        throw new Error("Missing Firebase Admin environment variables.");
    }

    app = admin.apps.length
        ? admin.app()
        : admin.initializeApp({
            credential: admin.credential.cert({
                projectId,
                clientEmail,
                privateKey
            })
        });

    return app;
}

async function verifyIdTokenFromRequest(req) {
    const authHeader = req.headers.authorization || "";
    if (!authHeader.startsWith("Bearer ")) {
        return null;
    }

    const token = authHeader.slice("Bearer ".length).trim();
    if (!token) {
        return null;
    }

    const firebaseApp = getFirebaseAdminApp();
    return admin.auth(firebaseApp).verifyIdToken(token);
}

module.exports = {
    getFirebaseAdminApp,
    verifyIdTokenFromRequest
};
