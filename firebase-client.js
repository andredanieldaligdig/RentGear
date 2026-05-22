import { getApp, getApps, initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import {
    createUserWithEmailAndPassword,
    deleteUser,
    getAuth,
    onAuthStateChanged,
    reload,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBSbQWBVj9vCD-LREzHTyDcau7INq-K-Uc",
    authDomain: "carandtruckrentals-50d8f.firebaseapp.com",
    projectId: "carandtruckrentals-50d8f",
    storageBucket: "carandtruckrentals-50d8f.firebasestorage.app",
    messagingSenderId: "257038010251",
    appId: "1:257038010251:web:7f030ff3db9d463c10118e",
    measurementId: "G-PQLJ2VGVBB"
};

let authPromise;

async function getAuthClient() {
    if (!authPromise) {
        authPromise = Promise.resolve().then(() => {
            const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
            return getAuth(app);
        });
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
    async deleteUserAccount(user) {
        await deleteUser(user);
    },
    getAuthClient,
    getCurrentUser,
    getCurrentUserToken,
    reloadCurrentUser,
    waitForAuthReady
};
