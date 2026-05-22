import { getApp, getApps, initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-analytics.js";
import {
    createUserWithEmailAndPassword,
    EmailAuthProvider,
    getAuth,
    onAuthStateChanged,
    reauthenticateWithCredential,
    reload,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signOut,
    updatePassword,
    updateProfile,
    verifyBeforeUpdateEmail
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

let authPromise;
let firebaseStatePromise;

function getBackendBaseUrl() {
    const explicitUrl = document.body.dataset.backendUrl?.trim();
    if (explicitUrl) {
        return explicitUrl.replace(/\/$/, "");
    }

    if (window.location.protocol === "file:") {
        return "rentgear-production-7618.up.railway.app";
    }

    if (window.location.port === "3000") {
        return window.location.origin;
    }

    return `${window.location.protocol}//${window.location.hostname}:3000`;
}

async function loadFirebaseConfig() {
    const response = await fetch(`${getBackendBaseUrl()}/api/config`);
    const result = await response.json().catch(() => ({}));

    if (!response.ok || !result.firebase) {
        throw new Error(result.error || "Firebase web configuration could not be loaded.");
    }

    return result.firebase;
}

async function getFirebaseState() {
    if (!firebaseStatePromise) {
        firebaseStatePromise = (async () => {
            const firebaseConfig = await loadFirebaseConfig();
            const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
            let analytics = null;

            try {
                analytics = getAnalytics(app);
            } catch (error) {
                console.warn("Firebase Analytics could not be started in this environment.", error);
            }

            return {
                app,
                analytics,
                auth: getAuth(app),
                config: firebaseConfig
            };
        })();
    }

    return firebaseStatePromise;
}

async function getAuthClient() {
    if (!authPromise) {
        authPromise = getFirebaseState().then((state) => state.auth);
    }

    return authPromise;
}

async function getCurrentUserToken(forceRefresh = false) {
    const auth = await getAuthClient();
    const user = auth.currentUser;
    return user ? user.getIdToken(forceRefresh) : null;
}

async function getCurrentUser() {
    const auth = await getAuthClient();
    return auth.currentUser;
}

async function reloadCurrentUser() {
    const auth = await getAuthClient();
    if (auth.currentUser) {
        await reload(auth.currentUser);
    }

    return auth.currentUser;
}

async function waitForAuthReady() {
    const auth = await getAuthClient();

    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            resolve(user);
        });
    });
}

async function reauthenticate(password) {
    const auth = await getAuthClient();
    const user = auth.currentUser;

    if (!user || !user.email) {
        throw new Error("No signed-in user is available for reauthentication.");
    }

    const credential = EmailAuthProvider.credential(user.email, password);
    return reauthenticateWithCredential(user, credential);
}

window.RentGearFirebase = {
    ready: getFirebaseState,
    async getApp() {
        return (await getFirebaseState()).app;
    },
    async getAnalytics() {
        return (await getFirebaseState()).analytics;
    },
    async getConfig() {
        return (await getFirebaseState()).config;
    }
};

window.RentGearFirebaseAuth = {
    async signUp(email, password) {
        const auth = await getAuthClient();
        return createUserWithEmailAndPassword(auth, email, password);
    },
    async signIn(email, password) {
        const auth = await getAuthClient();
        return signInWithEmailAndPassword(auth, email, password);
    },
    async signOut() {
        const auth = await getAuthClient();
        return signOut(auth);
    },
    async sendVerification(user) {
        await sendEmailVerification(user);
    },
    async setProfile(user, profile) {
        await updateProfile(user, profile);
    },
    async onAuthChanged(callback) {
        const auth = await getAuthClient();
        return onAuthStateChanged(auth, callback);
    },
    async reauthenticate(password) {
        return reauthenticate(password);
    },
    async changePassword(oldPassword, newPassword) {
        await reauthenticate(oldPassword);
        const auth = await getAuthClient();
        if (!auth.currentUser) {
            throw new Error("No signed-in user is available.");
        }

        await updatePassword(auth.currentUser, newPassword);
    },
    async requestEmailChange(newEmail, currentPassword) {
        await reauthenticate(currentPassword);
        const auth = await getAuthClient();
        if (!auth.currentUser) {
            throw new Error("No signed-in user is available.");
        }

        await verifyBeforeUpdateEmail(auth.currentUser, newEmail);
    },
    getAuthClient,
    getCurrentUser,
    getCurrentUserToken,
    reloadCurrentUser,
    waitForAuthReady
};
