import { getApp, getApps, initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyBSbQWBVj9vCD-LREzHTyDcau7INq-K-Uc",
    authDomain: "carandtruckrentals-50d8f.firebaseapp.com",
    projectId: "carandtruckrentals-50d8f",
    storageBucket: "carandtruckrentals-50d8f.firebasestorage.app",
    messagingSenderId: "257038010251",
    appId: "1:257038010251:web:7f030ff3db9d463c10118e",
    measurementId: "G-PQLJ2VGVBB"
};

const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
let analytics = null;

try {
    analytics = getAnalytics(firebaseApp);
} catch (error) {
    console.warn("Firebase Analytics could not be started in this environment.", error);
}

const chatbotSteps = [
    {
        key: "requested_car",
        placeholder: "Toyota Vios",
        prompt: "What car do you want?"
    },
    {
        key: "pickup_date",
        placeholder: "YYYY-MM-DD",
        prompt: "When will you pick it up?"
    },
    {
        key: "return_date",
        placeholder: "YYYY-MM-DD",
        prompt: "When will you return it?"
    },
    {
        key: "contact",
        placeholder: "Juan Dela Cruz, juan@email.com",
        prompt: "Please enter your name and email. Use this format: Name, email@example.com"
    }
];

const chatbotState = {
    open: false,
    step: 0,
    data: {},
    isSending: false
};

function formatDate(date) {
    return date.toISOString().slice(0, 10);
}

function getBackendBaseUrl() {
    const explicitUrl = document.body.dataset.backendUrl?.trim();
    if (explicitUrl) {
        return explicitUrl.replace(/\/$/, "");
    }

    if (window.location.protocol === "file:") {
        return "http://localhost:3000";
    }

    if (window.location.port === "3000") {
        return window.location.origin;
    }

    return `${window.location.protocol}//${window.location.hostname}:3000`;
}

async function postJson(path, payload) {
    const response = await fetch(`${getBackendBaseUrl()}${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw new Error(result.message || result.error || "The request could not be completed.");
    }

    return result;
}

function appendChatbotMessage(role, content) {
    const messages = document.getElementById("chatbotMessages");
    if (!messages) {
        return;
    }

    const bubble = document.createElement("div");
    bubble.className = `chatbot-message ${role}`;
    bubble.textContent = content;
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
}

function askCurrentQuestion() {
    const step = chatbotSteps[chatbotState.step];
    const input = document.getElementById("chatbotInput");

    if (!step || !input) {
        return;
    }

    appendChatbotMessage("bot", step.prompt);
    input.placeholder = step.placeholder;
}

function resetChatbot(prefilledCar = "") {
    chatbotState.step = 0;
    chatbotState.data = {};
    chatbotState.isSending = false;

    const messages = document.getElementById("chatbotMessages");
    if (!messages) {
        return;
    }

    messages.innerHTML = "";
    appendChatbotMessage("bot", "Hi, I can help you reserve a vehicle in a few quick steps.");

    if (prefilledCar) {
        chatbotState.data.requested_car = prefilledCar;
        chatbotState.step = 1;
        appendChatbotMessage("bot", `Great choice. I will use ${prefilledCar} as your car choice.`);
    }

    askCurrentQuestion();
}

function openChatbot(prefilledCar = "") {
    const panel = document.getElementById("chatbotPanel");
    const toggle = document.getElementById("chatbotToggle");

    if (!panel || !toggle) {
        return;
    }

    panel.classList.add("show");
    panel.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
    chatbotState.open = true;

    if (!document.getElementById("chatbotMessages")?.children.length || prefilledCar) {
        resetChatbot(prefilledCar);
    }

    document.getElementById("chatbotInput")?.focus();
}

function closeChatbot() {
    const panel = document.getElementById("chatbotPanel");
    const toggle = document.getElementById("chatbotToggle");

    if (!panel || !toggle) {
        return;
    }

    panel.classList.remove("show");
    panel.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
    chatbotState.open = false;
}

function isValidDateInput(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return false;
    }

    const date = new Date(`${value}T00:00:00`);
    return !Number.isNaN(date.getTime()) && formatDate(date) === value;
}

function parseContactDetails(value) {
    const rawValue = value.trim();
    const segments = rawValue.split(",").map((part) => part.trim()).filter(Boolean);

    if (segments.length < 2) {
        return null;
    }

    const email = segments.at(-1);
    const name = segments.slice(0, -1).join(", ");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !emailPattern.test(email)) {
        return null;
    }

    return { name, email };
}

function applyChatbotAnswer(rawValue) {
    const value = rawValue.trim();
    const step = chatbotSteps[chatbotState.step];

    if (!step || !value) {
        return { success: false, message: "Please enter a response before sending." };
    }

    if (step.key === "requested_car") {
        chatbotState.data.requested_car = value;
        return { success: true };
    }

    if (step.key === "pickup_date") {
        if (!isValidDateInput(value)) {
            return { success: false, message: "Please enter the pickup date as YYYY-MM-DD." };
        }

        chatbotState.data.pickup_date = value;
        return { success: true };
    }

    if (step.key === "return_date") {
        if (!isValidDateInput(value)) {
            return { success: false, message: "Please enter the return date as YYYY-MM-DD." };
        }

        if (chatbotState.data.pickup_date && value < chatbotState.data.pickup_date) {
            return { success: false, message: "The return date should be the same as or later than the pickup date." };
        }

        chatbotState.data.return_date = value;
        return { success: true };
    }

    if (step.key === "contact") {
        const details = parseContactDetails(value);
        if (!details) {
            return { success: false, message: "Please use this format: Name, email@example.com" };
        }

        chatbotState.data.name = details.name;
        chatbotState.data.email = details.email;
        return { success: true };
    }

    return { success: false, message: "That answer could not be processed." };
}

async function submitChatbotLead() {
    const input = document.getElementById("chatbotInput");
    const submitButton = document.querySelector("#chatbotForm button");

    chatbotState.isSending = true;
    if (input) {
        input.disabled = true;
    }

    submitButton?.setAttribute("disabled", "disabled");
    appendChatbotMessage("bot", "Thanks. I am sending your request now.");

    try {
        const result = await postJson("/api/chatbot/lead", {
            requested_car: chatbotState.data.requested_car,
            pickup_date: chatbotState.data.pickup_date,
            return_date: chatbotState.data.return_date,
            name: chatbotState.data.name,
            email: chatbotState.data.email
        });

        appendChatbotMessage("bot", "Your request has been sent to our team and saved successfully.");

        if (result.availability?.carFound && result.availability?.isAvailable) {
            appendChatbotMessage("bot", `${result.availability.displayName} looks available for those dates based on current confirmed reservations.`);
        } else if (result.availability?.carFound && !result.availability?.isAvailable) {
            appendChatbotMessage("bot", `${result.availability.displayName} already has an overlapping confirmed reservation for those dates, but we still emailed your request.`);
        } else {
            appendChatbotMessage("bot", "I could not match that car exactly in the database, but your request was still emailed.");
        }

        chatbotState.data = {};
        chatbotState.step = 0;
        appendChatbotMessage("bot", "If you want to make another request, tell me what car you want.");
    } catch (error) {
        appendChatbotMessage("bot", `I could not send the request right now: ${error.message}`);
        appendChatbotMessage("bot", "Please send your name and email again to retry.");
        chatbotState.step = chatbotSteps.length - 1;
    } finally {
        chatbotState.isSending = false;
        if (input) {
            input.disabled = false;
            const currentStep = chatbotSteps[chatbotState.step];
            input.placeholder = currentStep ? currentStep.placeholder : "Type your answer here";
            input.focus();
        }

        submitButton?.removeAttribute("disabled");
    }
}

async function handleChatbotSubmit(event) {
    event.preventDefault();

    if (chatbotState.isSending) {
        return;
    }

    const input = document.getElementById("chatbotInput");
    if (!input) {
        return;
    }

    const value = input.value.trim();
    if (!value) {
        appendChatbotMessage("bot", "Please enter your answer before sending.");
        input.focus();
        return;
    }

    appendChatbotMessage("user", value);

    const result = applyChatbotAnswer(value);
    if (!result.success) {
        appendChatbotMessage("bot", result.message);
        input.value = "";
        input.focus();
        return;
    }

    input.value = "";
    const isFinalStep = chatbotState.step === chatbotSteps.length - 1;

    if (!isFinalStep) {
        chatbotState.step += 1;
        askCurrentQuestion();
        input.focus();
        return;
    }

    await submitChatbotLead();
}

function bindChatbot() {
    const toggle = document.getElementById("chatbotToggle");
    const close = document.getElementById("chatbotClose");
    const form = document.getElementById("chatbotForm");

    toggle?.addEventListener("click", () => {
        if (chatbotState.open) {
            closeChatbot();
            return;
        }

        openChatbot();
    });

    close?.addEventListener("click", () => closeChatbot());
    form?.addEventListener("submit", handleChatbotSubmit);
}

window.RentGearFirebase = {
    app: firebaseApp,
    analytics
};

window.RentGearChatbot = {
    open: openChatbot,
    close: closeChatbot,
    reset: resetChatbot
};

document.addEventListener("DOMContentLoaded", bindChatbot);
