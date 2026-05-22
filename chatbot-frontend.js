const chatbotSteps = [
    {
        key: "requested_car",
        type: "text",
        placeholder: "Toyota Vios",
        prompt: "What car do you want?"
    },
    {
        key: "pickup_date",
        type: "date",
        placeholder: "",
        prompt: "When will you pick it up?"
    },
    {
        key: "return_date",
        type: "date",
        placeholder: "",
        prompt: "When will you return it?"
    },
    {
        key: "name",
        type: "text",
        placeholder: "Juan Dela Cruz",
        prompt: "What is your name?"
    },
    {
        key: "email",
        type: "email",
        placeholder: "juan@email.com",
        prompt: "What email should we use for this booking?"
    }
];

const chatbotState = {
    open: false,
    step: 0,
    data: {},
    isSending: false,
    lastSubmittedCar: ""
};

function normalizePrefilledCar(prefill) {
    if (!prefill) {
        return { requested_car: "", requested_car_id: null };
    }

    if (typeof prefill === "string") {
        return {
            requested_car: prefill,
            requested_car_id: null
        };
    }

    return {
        requested_car: String(prefill.name || "").trim(),
        requested_car_id: Number.isInteger(Number(prefill.id)) ? Number(prefill.id) : null
    };
}

function getBackendBaseUrl() {
    const explicitUrl = document.body.dataset.backendUrl?.trim();
    if (explicitUrl) {
        return explicitUrl.replace(/\/$/, "");
    }

    if (window.location.protocol === "file:") {
        return "https://rentgear-production-7618.up.railway.app";
    }

    return window.location.origin;
}

async function postJson(path, payload) {
    const requestUrl = `${getBackendBaseUrl()}${path}`;
    let response;

    try {
        response = await fetch(requestUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
    } catch (error) {
        throw new Error(`Could not reach ${requestUrl}. ${error.message || "Network request failed."}`);
    }

    const responseText = await response.text();
    let result = {};

    try {
        result = responseText ? JSON.parse(responseText) : {};
    } catch {
        result = {};
    }

    if (!response.ok) {
        const fallbackMessage = responseText && !result.message && !result.error
            ? `Request to ${requestUrl} failed with status ${response.status}.`
            : "The request could not be completed.";
        throw new Error(result.message || result.error || fallbackMessage);
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

function getCurrentStep() {
    return chatbotSteps[chatbotState.step] || null;
}

function syncInputForStep() {
    const input = document.getElementById("chatbotInput");
    const step = getCurrentStep();

    if (!input || !step) {
        return;
    }

    input.type = step.type;
    input.placeholder = step.placeholder;
    input.value = chatbotState.data[step.key] || "";
}

function askCurrentQuestion() {
    const step = getCurrentStep();
    const input = document.getElementById("chatbotInput");

    if (!step || !input) {
        return;
    }

    appendChatbotMessage("bot", step.prompt);
    syncInputForStep();
    input.focus();
}

function updateChatbotToolState() {
    const backButton = document.getElementById("chatbotBackButton");
    const changeCarButton = document.getElementById("chatbotChangeCarButton");

    if (backButton) {
        backButton.disabled = chatbotState.step === 0 && !chatbotState.data.requested_car;
    }

    if (changeCarButton) {
        changeCarButton.disabled = !chatbotState.data.requested_car && chatbotState.step === 0;
    }
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

    const normalizedPrefill = normalizePrefilledCar(prefilledCar);
    if (normalizedPrefill.requested_car) {
        chatbotState.data.requested_car = normalizedPrefill.requested_car;
        chatbotState.data.requested_car_id = normalizedPrefill.requested_car_id;
        chatbotState.lastSubmittedCar = normalizedPrefill.requested_car;
        chatbotState.step = 1;
        appendChatbotMessage("bot", `Great choice. I will use ${normalizedPrefill.requested_car} as your car choice.`);
    }

    updateChatbotToolState();
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
    } else {
        syncInputForStep();
        updateChatbotToolState();
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
    return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isValidEmailInput(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function applyChatbotAnswer(rawValue) {
    const value = rawValue.trim();
    const step = getCurrentStep();

    if (!step || !value) {
        return { success: false, message: "Please enter a response before sending." };
    }

    if (step.key === "requested_car") {

    try {

        const res = await postJson("/api/cars/validate", {
            requested_car: value
        });

        chatbotState.data.requested_car = value;
        chatbotState.data.requested_car_id = res.car.id;
        chatbotState.lastSubmittedCar = value;

        return { success: true };

    } catch (error) {
        const message = String(error?.message || "");

        if (/car not found/i.test(message)) {
            return {
                success: false,
                message: "Car not found. Please enter a valid car name."
            };
        }

        return {
            success: false,
            message: `Car validation is unavailable right now: ${message || "Please try again."}`
        };
    }
}

    if (step.key === "pickup_date") {
        if (!isValidDateInput(value)) {
            return { success: false, message: "Please choose a pickup date from the calendar." };
        }

        chatbotState.data.pickup_date = value;
        return { success: true };
    }

    if (step.key === "return_date") {
        if (!isValidDateInput(value)) {
            return { success: false, message: "Please choose a return date from the calendar." };
        }

        if (chatbotState.data.pickup_date && value < chatbotState.data.pickup_date) {
            return { success: false, message: "The return date should be the same as or later than the pickup date." };
        }

        chatbotState.data.return_date = value;
        return { success: true };
    }

    if (step.key === "name") {
        chatbotState.data.name = value;
        return { success: true };
    }

    if (step.key === "email") {
        if (!isValidEmailInput(value)) {
            return { success: false, message: "Please enter a valid email address." };
        }

        chatbotState.data.email = value;
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
            requested_car_id: chatbotState.data.requested_car_id,
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

        appendChatbotMessage("bot", "You can pick another car, go back, or start over anytime.");
        chatbotState.step = 0;
        chatbotState.data = {};
    } catch (error) {
        appendChatbotMessage("bot", `I could not send the request right now: ${error.message}`);
        appendChatbotMessage("bot", "You can go back and correct any answer, or start over.");
        chatbotState.step = Math.max(chatbotSteps.length - 1, 0);
    } finally {
        chatbotState.isSending = false;
        if (input) {
            input.disabled = false;
        }

        submitButton?.removeAttribute("disabled");
        syncInputForStep();
        updateChatbotToolState();
        input?.focus();
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

    const result = await applyChatbotAnswer(value);

if (!result.success) {
    appendChatbotMessage("bot", result.message);
    input.focus();
    return; // ❌ STOP HERE (correct)
}

// 🔥 IMPORTANT SAFETY: ensure car step cannot auto-advance without valid car
const step = getCurrentStep();

if (step?.key === "requested_car" && !chatbotState.data.requested_car_id) {
    appendChatbotMessage("bot", "Please select a valid car from the list.");
    return;
}
    input.value = "";
    const isFinalStep = chatbotState.step === chatbotSteps.length - 1;

    if (!isFinalStep) {
    // extra safety for car step
    const currentStep = getCurrentStep();

    if (currentStep?.key === "requested_car" && !chatbotState.data.requested_car_id) {
        appendChatbotMessage("bot", "Please enter a valid car before continuing.");
        return;
    }

    chatbotState.step += 1;
    updateChatbotToolState();
    askCurrentQuestion();
    return;
}

    updateChatbotToolState();
    await submitChatbotLead();
}

function goBackOneStep() {
    if (chatbotState.isSending) {
        return;
    }

    if (chatbotState.step > 0) {
        const currentStep = getCurrentStep();
        if (currentStep) {
            delete chatbotState.data[currentStep.key];
        }

        chatbotState.step -= 1;
        const previousStep = getCurrentStep();
        if (previousStep) {
            delete chatbotState.data[previousStep.key];
            appendChatbotMessage("bot", `Let's update your ${previousStep.key.replace(/_/g, " ")}.`);
            syncInputForStep();
            updateChatbotToolState();
            document.getElementById("chatbotInput")?.focus();
        }
        return;
    }

    if (chatbotState.data.requested_car) {
        delete chatbotState.data.requested_car;
        delete chatbotState.data.requested_car_id;
        chatbotState.step = 0;
        appendChatbotMessage("bot", "Okay, let's choose a different car.");
        syncInputForStep();
        updateChatbotToolState();
        document.getElementById("chatbotInput")?.focus();
    }
}

function bindChatbot() {
    const toggle = document.getElementById("chatbotToggle");
    const close = document.getElementById("chatbotClose");
    const form = document.getElementById("chatbotForm");
    const input = document.getElementById("chatbotInput");

    toggle?.addEventListener("click", () => {
        if (chatbotState.open) {
            closeChatbot();
            return;
        }

        openChatbot();
    });

    close?.addEventListener("click", () => closeChatbot());
    form?.addEventListener("submit", handleChatbotSubmit);
    document.getElementById("chatbotRestartButton")?.addEventListener("click", () => resetChatbot());
    document.getElementById("chatbotChangeCarButton")?.addEventListener("click", () => {
        resetChatbot();
        appendChatbotMessage("bot", "No problem. Tell me the car you want now.");
        document.getElementById("chatbotInput")?.focus();
    });
    document.getElementById("chatbotBackButton")?.addEventListener("click", goBackOneStep);

    input?.addEventListener("change", () => {
        if (getCurrentStep()?.type === "date" && input.value) {
            form?.requestSubmit();
        }
    });
}

window.RentGearChatbot = {
    open: openChatbot,
    close: closeChatbot,
    reset: resetChatbot
};

document.addEventListener("DOMContentLoaded", bindChatbot);
