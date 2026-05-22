const cars = [
    { id: 1, name: "Toyota Corolla Altis", description: "Reliable sedan, perfect for daily commute and city tours. Fuel efficient and comfortable.", price: 2500, type: "cars", location: "Paranaque", specs: ["Manual", "4 Seats", "A/C"] },
    { id: 2, name: "Honda Civic", description: "Sporty sedan with excellent handling. Great for weekend getaways and business trips.", price: 2800, type: "cars", location: "Makati", specs: ["Automatic", "5 Seats", "A/C"] },
    { id: 3, name: "Mitsubishi Mirage", description: "Compact and economical. Perfect for solo travelers and couples exploring the city.", price: 1800, type: "cars", location: "Pasay", specs: ["Manual", "4 Seats", "A/C"] },
    { id: 4, name: "Hyundai Accent", description: "Modern compact car with stylish design. Equipped with latest safety features.", price: 2000, type: "cars", location: "Paranaque", specs: ["Automatic", "5 Seats", "A/C"] },
    { id: 5, name: "Toyota Vios", description: "Spacious sedan ideal for families. Excellent fuel economy and reliability.", price: 2200, type: "cars", location: "Taguig", specs: ["Manual", "5 Seats", "A/C"] },
    { id: 6, name: "Nissan Almera", description: "Comfortable family car with generous boot space. Perfect for group outings.", price: 2300, type: "cars", location: "Makati", specs: ["Automatic", "5 Seats", "A/C"] },
    { id: 7, name: "Suzuki Alto", description: "Budget-friendly option with excellent maneuverability in city traffic.", price: 1500, type: "cars", location: "Pasay", specs: ["Manual", "4 Seats", "A/C"] },
    { id: 8, name: "Hyundai Elantra", description: "Mid-size sedan with premium features and smooth ride quality.", price: 2600, type: "cars", location: "Paranaque", specs: ["Automatic", "5 Seats", "A/C"] },
    { id: 9, name: "Toyota Yaris", description: "Compact hatchback perfect for navigating tight parking spaces and urban areas.", price: 1900, type: "cars", location: "Taguig", specs: ["Manual", "4 Seats", "A/C"] },
    { id: 10, name: "Honda City", description: "Practical and spacious sedan with advanced features. Great for daily use.", price: 2400, type: "cars", location: "Makati", specs: ["Automatic", "5 Seats", "A/C"] },
    { id: 11, name: "Kia Picanto", description: "Agile city car with modern design. Easy to park and very fuel efficient.", price: 1700, type: "cars", location: "Paranaque", specs: ["Manual", "4 Seats", "A/C"] },
    { id: 12, name: "Chevrolet Spark", description: "Fun and dynamic hatchback perfect for young professionals and adventurers.", price: 1600, type: "cars", location: "Pasay", specs: ["Manual", "4 Seats", "A/C"] },
    { id: 13, name: "Mazda 3", description: "Stylish sedan with driver-focused features. Excellent for those who love driving.", price: 3000, type: "cars", location: "Taguig", specs: ["Automatic", "5 Seats", "A/C"] },
    { id: 14, name: "Isuzu D-Max", description: "Rugged yet comfortable SUV. Perfect for beach trips and mountain adventures.", price: 3500, type: "cars", location: "Paranaque", specs: ["Automatic", "5 Seats", "A/C"] },
    { id: 15, name: "Subaru XV", description: "Compact crossover with all-wheel drive. Ideal for off-road and adventure travels.", price: 3200, type: "cars", location: "Makati", specs: ["Automatic", "5 Seats", "A/C"] }
];

const trucks = [
    { id: 101, name: "Isuzu ELF (Cargo)", description: "Medium-duty cargo truck perfect for deliveries and logistics. Spacious loading bay.", price: 3500, type: "trucks", location: "Paranaque", specs: ["Manual", "3 Seats", "Cargo"] },
    { id: 102, name: "Hino 300 Series", description: "Heavy-duty truck for industrial and commercial needs. Reliable workhorse.", price: 4500, type: "trucks", location: "Makati", specs: ["Manual", "3 Seats", "Cargo"] },
    { id: 103, name: "Canter Fuso", description: "Mid-size truck ideal for small to medium cargo transport and moving services.", price: 3200, type: "trucks", location: "Pasay", specs: ["Manual", "3 Seats", "Cargo"] },
    { id: 104, name: "Isuzu ELF (High Roof)", description: "Box truck variant with extra height for various cargo types. Excellent for events.", price: 3800, type: "trucks", location: "Taguig", specs: ["Manual", "2 Seats", "Cargo"] },
    { id: 105, name: "Suzuki Carry (Mini Truck)", description: "Compact cargo truck perfect for small deliveries and urban transportation.", price: 2200, type: "trucks", location: "Paranaque", specs: ["Manual", "2 Seats", "Cargo"] },
    { id: 106, name: "Toyota Dyna", description: "Reliable cargo truck with good fuel efficiency. Perfect for regular deliveries.", price: 3400, type: "trucks", location: "Makati", specs: ["Manual", "3 Seats", "Cargo"] },
    { id: 107, name: "Mitsubishi Canter", description: "Spacious cargo box with easy access doors. Ideal for logistics and moving.", price: 3300, type: "trucks", location: "Pasay", specs: ["Manual", "3 Seats", "Cargo"] },
    { id: 108, name: "Hino 500 Series", description: "Large capacity truck for heavy-duty commercial operations and bulk transport.", price: 5500, type: "trucks", location: "Taguig", specs: ["Manual", "3 Seats", "Cargo"] },
    { id: 109, name: "Isuzu ELF (Refrigerated)", description: "Temperature-controlled truck for perishable goods and cold chain logistics.", price: 4800, type: "trucks", location: "Paranaque", specs: ["Manual", "2 Seats", "Cargo"] },
    { id: 110, name: "Nissan Cabstar", description: "Versatile truck for various cargo types. Modern cabin with comfort features.", price: 3600, type: "trucks", location: "Makati", specs: ["Manual", "3 Seats", "Cargo"] },
    { id: 111, name: "Suzuki Super Carry", description: "Enhanced mini truck with better payload capacity. Perfect for vendors and merchants.", price: 2400, type: "trucks", location: "Pasay", specs: ["Manual", "2 Seats", "Cargo"] },
    { id: 112, name: "Foton Aumark", description: "Reliable truck with low operating costs and good payload capacity.", price: 2800, type: "trucks", location: "Taguig", specs: ["Manual", "3 Seats", "Cargo"] },
    { id: 113, name: "JAC Truck", description: "Compact cargo solution ideal for small business operations and local deliveries.", price: 2500, type: "trucks", location: "Paranaque", specs: ["Manual", "2 Seats", "Cargo"] },
    { id: 114, name: "Hino XZU (Box Truck)", description: "Heavy-duty box truck with reinforced cargo area. Built for demanding work.", price: 4200, type: "trucks", location: "Makati", specs: ["Manual", "3 Seats", "Cargo"] },
    { id: 115, name: "Isuzu Giga (Tipper)", description: "High-capacity tipper truck for construction and bulk material transport.", price: 6000, type: "trucks", location: "Taguig", specs: ["Manual", "3 Seats", "Cargo"] }
];

const SHOWCASE_INTERVAL_MS = 7000;
const SHOWCASE_SLIDE_MS = 1150;

const state = {
    activeTab: "all",
    filteredCars: cars,
    filteredTrucks: trucks,
    showcaseIndex: 0,
    showcaseTimer: null,
    showcaseAnimating: false,
    authUser: null,
    authFlow: null
};

document.addEventListener("DOMContentLoaded", async () => {
    setDefaultDates();
    renderVehicles();
    renderShowcase(true);
    bindTabs();
    bindSearch();
    bindFaq();
    bindMenu();
    bindModals();
    bindAuthForms();
    bindSettingsForms();
    bindShowcase();
    bindAccountActions();
    updateFleetStatus();
    startShowcaseAutoplay();
    await initializeAuthUi();
});

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

function getStoredPhoneKey(uid) {
    return `rentgearPhone:${uid}`;
}

function getStoredPhone(uid) {
    return uid ? window.localStorage.getItem(getStoredPhoneKey(uid)) || "" : "";
}

function setStoredPhone(uid, phone) {
    if (!uid) {
        return;
    }

    window.localStorage.setItem(getStoredPhoneKey(uid), phone.trim());
}

function getVehicleImagePath(vehicleName) {
    return `src/${vehicleName.toLowerCase().replace(/\s+/g, "-")}.png`;
}

function getVehicleImageStyle(vehicleName) {
    if (vehicleName === "Chevrolet Spark") {
        return "transform: scale(1.16);";
    }

    if (
        vehicleName === "Isuzu ELF (Refrigerated)" ||
        vehicleName === "Nissan Cabstar" ||
        vehicleName === "Isuzu Giga (Tipper)" ||
        vehicleName === "Foton Aumark" ||
        vehicleName === "Suzuki Super Carry"
    ) {
        return "object-fit: cover;";
    }

    return "";
}

function applyShowcaseImageStyle(imageElement, vehicleName) {
    if (!imageElement) {
        return;
    }

    imageElement.style.objectFit = "contain";
    imageElement.style.setProperty("--showcase-scale", vehicleName === "Chevrolet Spark" ? "1.16" : "1");
}

function setShowcaseImageOffset(imageElement, offset) {
    if (!imageElement) {
        return;
    }

    imageElement.style.setProperty("--showcase-offset", offset);
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

function setDefaultDates() {
    const pickupInput = document.getElementById("pickupDate");
    const returnInput = document.getElementById("returnDate");

    if (!pickupInput || !returnInput) {
        return;
    }

    const today = new Date();
    const pickupDate = new Date(today);
    pickupDate.setDate(today.getDate() + 1);

    const returnDate = new Date(today);
    returnDate.setDate(today.getDate() + 2);

    pickupInput.value = formatDate(pickupDate);
    returnInput.value = formatDate(returnDate);
}

function formatDate(date) {
    return date.toISOString().slice(0, 10);
}

function bindTabs() {
    document.querySelectorAll("[data-tab-filter]").forEach((button) => {
        button.addEventListener("click", () => {
            state.activeTab = button.dataset.tabFilter;
            document.querySelectorAll("[data-tab-filter]").forEach((tab) => {
                tab.classList.toggle("active", tab === button);
            });
            updateFleet();
        });
    });
}

function bindSearch() {
    const searchForm = document.getElementById("vehicleSearchForm");
    const resetFilters = document.getElementById("resetFilters");

    if (searchForm) {
        searchForm.addEventListener("submit", (event) => {
            event.preventDefault();
            updateFleet();
        });
    }

    if (resetFilters) {
        resetFilters.addEventListener("click", () => {
            window.requestAnimationFrame(() => {
                setDefaultDates();
                state.activeTab = "all";
                document.querySelectorAll("[data-tab-filter]").forEach((button) => {
                    button.classList.toggle("active", button.dataset.tabFilter === "all");
                });
                updateFleet();
            });
        });
    }
}

function bindMenu() {
    const toggle = document.getElementById("menuToggle");
    const menu = document.getElementById("siteMenu");

    if (!toggle || !menu) {
        return;
    }

    toggle.addEventListener("click", (event) => {
        event.stopPropagation();
        const isOpen = menu.classList.toggle("show");
        toggle.classList.toggle("active", isOpen);
        toggle.setAttribute("aria-expanded", String(isOpen));
    });

    menu.querySelectorAll("a, button").forEach((item) => {
        item.addEventListener("click", () => {
            menu.classList.remove("show");
            toggle.classList.remove("active");
            toggle.setAttribute("aria-expanded", "false");
        });
    });

    window.addEventListener("click", (event) => {
        if (!menu.contains(event.target) && event.target !== toggle && !toggle.contains(event.target)) {
            menu.classList.remove("show");
            toggle.classList.remove("active");
            toggle.setAttribute("aria-expanded", "false");
        }
    });
}

function getFilters() {
    return {
        vehicleType: document.getElementById("vehicleType")?.value || "",
        pickupLocation: document.getElementById("pickupLocation")?.value || "",
        priceRange: document.getElementById("priceRange")?.value || ""
    };
}

function matchesPriceRange(price, range) {
    if (!range) {
        return true;
    }

    if (range === "5000+") {
        return price >= 5000;
    }

    const [min, max] = range.split("-").map(Number);
    return price >= min && price <= max;
}

function matchesVehicle(vehicle, filters) {
    const typeFilter = filters.vehicleType || state.activeTab;
    const typeMatch = typeFilter === "all" || typeFilter === "" || vehicle.type === typeFilter;
    const locationMatch = !filters.pickupLocation || vehicle.location === filters.pickupLocation;
    const priceMatch = matchesPriceRange(vehicle.price, filters.priceRange);

    return typeMatch && locationMatch && priceMatch;
}

function updateFleet() {
    const filters = getFilters();
    state.filteredCars = cars.filter((vehicle) => matchesVehicle(vehicle, filters));
    state.filteredTrucks = trucks.filter((vehicle) => matchesVehicle(vehicle, filters));
    renderVehicles();
    updateFleetStatus();
}

function renderVehicles() {
    renderVehicleGrid("carsGrid", state.filteredCars);
    renderVehicleGrid("trucksGrid", state.filteredTrucks);

    const displayMode = document.getElementById("vehicleType")?.value || state.activeTab;
    const carsSection = document.getElementById("carsSection");
    const trucksSection = document.getElementById("trucksSection");

    if (carsSection) {
        carsSection.style.display = displayMode === "trucks" ? "none" : "block";
    }

    if (trucksSection) {
        trucksSection.style.display = displayMode === "cars" ? "none" : "block";
    }
}

function bindShowcase() {
    document.getElementById("showcasePrev")?.addEventListener("click", () => changeShowcase(-1));
    document.getElementById("showcaseNext")?.addEventListener("click", () => changeShowcase(1));
    document.getElementById("showcaseReserveButton")?.addEventListener("click", () => {
        const vehicle = cars[state.showcaseIndex];
        if (vehicle) {
            handleRentClick(vehicle);
        }
    });
}

function startShowcaseAutoplay() {
    window.clearTimeout(state.showcaseTimer);
    state.showcaseTimer = window.setTimeout(() => {
        changeShowcase(1);
    }, SHOWCASE_INTERVAL_MS);
}

function renderShowcase(isInitialRender = false) {
    const vehicle = cars[state.showcaseIndex];
    if (!vehicle) {
        return;
    }

    renderShowcaseDetails(vehicle);

    if (isInitialRender) {
        const currentImage = document.getElementById("showcaseCurrentImage");
        const nextImage = document.getElementById("showcaseNextImage");

        if (currentImage && nextImage) {
            currentImage.src = getVehicleImagePath(vehicle.name);
            currentImage.alt = vehicle.name;
            applyShowcaseImageStyle(currentImage, vehicle.name);
            setShowcaseImageOffset(currentImage, "0");
            currentImage.style.opacity = "1";
            nextImage.removeAttribute("src");
            nextImage.alt = "";
            applyShowcaseImageStyle(nextImage, "");
            setShowcaseImageOffset(nextImage, "140%");
            nextImage.style.opacity = "0";
        }
    }
}

function renderShowcaseDetails(vehicle) {
    const label = document.getElementById("showcaseLabel");
    const name = document.getElementById("showcaseName");
    const description = document.getElementById("showcaseDescription");
    const meta = document.getElementById("showcaseMeta");
    const price = document.getElementById("showcasePrice");

    if (!label || !name || !description || !meta || !price) {
        return;
    }

    label.textContent = `Featured Car ${state.showcaseIndex + 1} of ${cars.length}`;
    name.textContent = vehicle.name;
    description.textContent = vehicle.description;
    meta.innerHTML = `${vehicle.specs.map((spec) => `<span>${escapeHtml(spec)}</span>`).join("")}<span>${escapeHtml(vehicle.location)}</span>`;
    price.textContent = `PHP ${vehicle.price.toLocaleString()} per day`;
}

function changeShowcase(step) {
    const currentImage = document.getElementById("showcaseCurrentImage");
    const nextImage = document.getElementById("showcaseNextImage");
    const stage = document.getElementById("showcaseStage");

    if (!currentImage || !nextImage || !stage || state.showcaseAnimating || !cars.length) {
        return;
    }

    const nextIndex = (state.showcaseIndex + step + cars.length) % cars.length;
    const nextVehicle = cars[nextIndex];
    const enterFrom = step > 0 ? "140%" : "-140%";
    const exitTo = step > 0 ? "-140%" : "140%";

    state.showcaseAnimating = true;
    window.clearTimeout(state.showcaseTimer);

    nextImage.src = getVehicleImagePath(nextVehicle.name);
    nextImage.alt = nextVehicle.name;
    applyShowcaseImageStyle(nextImage, nextVehicle.name);
    nextImage.style.transition = "none";
    setShowcaseImageOffset(nextImage, enterFrom);
    nextImage.style.opacity = "1";

    applyShowcaseImageStyle(currentImage, cars[state.showcaseIndex].name);
    currentImage.style.transition = "none";
    setShowcaseImageOffset(currentImage, "0");
    currentImage.style.opacity = "1";

    stage.classList.add("animating");

    window.requestAnimationFrame(() => {
        currentImage.style.transition = `transform ${SHOWCASE_SLIDE_MS}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${SHOWCASE_SLIDE_MS}ms ease`;
        nextImage.style.transition = `transform ${SHOWCASE_SLIDE_MS}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${SHOWCASE_SLIDE_MS}ms ease`;
        setShowcaseImageOffset(currentImage, exitTo);
        currentImage.style.opacity = "0.2";
        setShowcaseImageOffset(nextImage, "0");
        nextImage.style.opacity = "1";
    });

    window.setTimeout(() => {
        state.showcaseIndex = nextIndex;
        renderShowcaseDetails(nextVehicle);

        currentImage.src = nextVehicle ? getVehicleImagePath(nextVehicle.name) : "";
        currentImage.alt = nextVehicle ? nextVehicle.name : "";
        applyShowcaseImageStyle(currentImage, nextVehicle ? nextVehicle.name : "");
        currentImage.style.transition = "none";
        setShowcaseImageOffset(currentImage, "0");
        currentImage.style.opacity = "1";

        nextImage.removeAttribute("src");
        nextImage.alt = "";
        applyShowcaseImageStyle(nextImage, "");
        nextImage.style.transition = "none";
        setShowcaseImageOffset(nextImage, enterFrom);
        nextImage.style.opacity = "0";

        stage.classList.remove("animating");
        state.showcaseAnimating = false;
        startShowcaseAutoplay();
    }, SHOWCASE_SLIDE_MS);
}

function renderVehicleGrid(containerId, vehicles) {
    const container = document.getElementById(containerId);
    if (!container) {
        return;
    }

    if (!vehicles.length) {
        container.innerHTML = '<div class="empty-state">No vehicles match the current filters.</div>';
        return;
    }

    container.innerHTML = vehicles.map(createVehicleCard).join("");
    container.querySelectorAll("[data-rent-vehicle]").forEach((button) => {
        button.addEventListener("click", () => handleRentClick({
            id: Number(button.dataset.rentId),
            name: button.dataset.rentVehicle
        }));
    });
}

function createVehicleCard(vehicle) {
    const imageStyle = getVehicleImageStyle(vehicle.name);

    return `
        <div class="vehicle-card">
            <div class="vehicle-image">
                <img src="${getVehicleImagePath(vehicle.name)}" alt="${escapeHtml(vehicle.name)}" onerror="this.style.display='none'" ${imageStyle ? `style="${imageStyle}"` : ""}>
                <div class="badge">${vehicle.type === "cars" ? "CAR" : "TRUCK"}</div>
            </div>
            <div class="vehicle-info">
                <div class="vehicle-name">${escapeHtml(vehicle.name)}</div>
                <div class="vehicle-description">${escapeHtml(vehicle.description)}</div>
                <div class="vehicle-specs">
                    <div class="spec"><i class="fas fa-cog"></i> ${escapeHtml(vehicle.specs[0])}</div>
                    <div class="spec"><i class="fas fa-users"></i> ${escapeHtml(vehicle.specs[1])}</div>
                    <div class="spec"><i class="fas fa-box"></i> ${escapeHtml(vehicle.specs[2])}</div>
                </div>
                <div class="vehicle-price">
                    <div>
                        <div class="price">PHP ${vehicle.price.toLocaleString()}</div>
                        <div class="price-period">per day</div>
                    </div>
                </div>
                <button class="btn-rent button-wipe" type="button" data-rent-id="${vehicle.id}" data-rent-vehicle="${escapeHtml(vehicle.name)}"><span>Reserve Now</span></button>
            </div>
        </div>
    `;
}

function updateFleetStatus() {
    const status = document.getElementById("fleetStatus");
    if (!status) {
        return;
    }

    const total = state.filteredCars.length + state.filteredTrucks.length;
    status.textContent = total ? `Showing ${total} available unit${total === 1 ? "" : "s"}.` : "No vehicles match the current filters.";
}

function bindFaq() {
    document.querySelectorAll(".faq-question").forEach((button) => {
        button.addEventListener("click", () => {
            button.classList.toggle("active");
            const answer = button.nextElementSibling;
            if (answer) {
                answer.classList.toggle("show");
            }
        });
    });
}

function bindModals() {
    document.querySelectorAll("[data-modal-open]").forEach((button) => {
        button.addEventListener("click", () => openModal(button.dataset.modalOpen));
    });

    document.querySelectorAll("[data-modal-close]").forEach((button) => {
        button.addEventListener("click", () => closeModal(button.dataset.modalClose));
    });

    document.querySelectorAll("[data-modal-switch]").forEach((button) => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".modal.show").forEach((modal) => closeModal(modal.id));
            openModal(button.dataset.modalSwitch);
        });
    });

    window.addEventListener("click", (event) => {
        document.querySelectorAll(".modal.show").forEach((modal) => {
            if (event.target === modal) {
                closeModal(modal.id);
            }
        });
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) {
        return;
    }

    modal.classList.add("show");
    document.body.classList.add("modal-open");
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) {
        return;
    }

    modal.classList.remove("show");
    if (!document.querySelector(".modal.show")) {
        document.body.classList.remove("modal-open");
    }
}

function bindAuthForms() {
    document.getElementById("loginForm")?.addEventListener("submit", handleLogin);
    document.getElementById("signupForm")?.addEventListener("submit", handleSignup);
    bindSignupTermsGuard();
}

function bindSignupTermsGuard() {
    const termsCheckbox = document.getElementById("signupTerms");
    const submitButton = document.getElementById("signupSubmitButton");

    if (!(termsCheckbox instanceof HTMLInputElement) || !(submitButton instanceof HTMLButtonElement)) {
        return;
    }

    const syncSignupButtonState = () => {
        submitButton.disabled = !termsCheckbox.checked;
        submitButton.title = termsCheckbox.checked ? "" : "Please agree to the Terms and Conditions first.";
    };

    termsCheckbox.addEventListener("change", syncSignupButtonState);
    syncSignupButtonState();
}

function bindSettingsForms() {
    document.getElementById("profileSettingsForm")?.addEventListener("submit", handleProfileSave);
    document.getElementById("passwordSettingsForm")?.addEventListener("submit", handlePasswordChange);
    document.getElementById("refreshHistoryButton")?.addEventListener("click", () => refreshBookingHistory());
}

function bindAccountActions() {
    document.getElementById("menuLogoutButton")?.addEventListener("click", handleLogout);
}

function getFriendlyFirebaseMessage(error, action) {
    const code = String(error?.code || "");

    if (code === "auth/invalid-credential") {
        return action === "login"
            ? "Invalid email or password. Use the exact credentials you signed up with in Firebase."
            : "Those credentials could not be accepted by Firebase.";
    }

    if (code === "auth/user-not-found") {
        return "That account was not found in Firebase.";
    }

    if (code === "auth/wrong-password") {
        return "The password you entered is incorrect.";
    }

    if (code === "auth/email-already-in-use") {
        return "That email address is already registered in Firebase.";
    }

    if (code === "auth/requires-recent-login") {
        return "For security, please log out and log back in before changing this account detail.";
    }

    if (code === "auth/weak-password") {
        return "Password should be at least 6 characters long.";
    }

    if (code === "auth/invalid-email") {
        return "Please enter a valid email address.";
    }

    if (code === "auth/too-many-requests") {
        return "Too many attempts were made. Please wait a bit and try again.";
    }

    return error?.message || "The request could not be completed.";
}

function getDisplayName(user) {
    return user?.displayName || (user?.email ? user.email.split("@")[0] : "Account");
}

function updateAuthUi(user) {
    const isLoggedIn = Boolean(user);
    const headerLogin = document.getElementById("headerLoginButton");
    const headerSignup = document.getElementById("headerSignupButton");
    const headerAccount = document.getElementById("headerAccountButton");
    const menuLogin = document.getElementById("menuLoginButton");
    const menuSignup = document.getElementById("menuSignupButton");
    const menuSettings = document.getElementById("menuSettingsButton");
    const menuLogout = document.getElementById("menuLogoutButton");

    if (headerLogin) {
        headerLogin.hidden = isLoggedIn;
    }

    if (headerSignup) {
        headerSignup.hidden = isLoggedIn;
    }

    if (headerAccount) {
        headerAccount.hidden = !isLoggedIn;
        headerAccount.querySelector("span").textContent = isLoggedIn ? getDisplayName(user) : "Account";
    }

    if (menuLogin) {
        menuLogin.hidden = isLoggedIn;
    }

    if (menuSignup) {
        menuSignup.hidden = isLoggedIn;
    }

    if (menuSettings) {
        menuSettings.hidden = !isLoggedIn;
    }

    if (menuLogout) {
        menuLogout.hidden = !isLoggedIn;
    }

    populateSettingsForm();
}

async function getVerifiedUserSession(user) {
    if (!user || !window.RentGearFirebaseAuth) {
        return null;
    }

    if (state.authFlow === "signup") {
        return null;
    }

    if (state.authFlow === "login") {
        return user.emailVerified ? user : null;
    }

    try {
        await window.RentGearFirebaseAuth.reloadCurrentUser();
        const refreshedUser = await window.RentGearFirebaseAuth.getCurrentUser();
        const activeUser = refreshedUser || user;

        if (activeUser.emailVerified) {
            return activeUser;
        }

        await window.RentGearFirebaseAuth.signOut();
    } catch (error) {
        console.warn("Unverified user session could not be finalized cleanly.", error);
    }

    return null;
}

async function initializeAuthUi() {
    if (!window.RentGearFirebaseAuth) {
        return;
    }

    const initialUser = await window.RentGearFirebaseAuth.waitForAuthReady();
    const verifiedInitialUser = await getVerifiedUserSession(initialUser);
    state.authUser = verifiedInitialUser;
    updateAuthUi(verifiedInitialUser);
    await refreshBookingHistory();

    await window.RentGearFirebaseAuth.onAuthChanged(async (user) => {
        const verifiedUser = await getVerifiedUserSession(user);
        state.authUser = verifiedUser;
        updateAuthUi(verifiedUser);
        await refreshBookingHistory();
    });
}

function populateSettingsForm() {
    const user = state.authUser;
    const username = getDisplayName(user);
    const email = user?.email || "";
    const phone = getStoredPhone(user?.uid || "");

    const summaryName = document.getElementById("profileDisplayName");
    const summaryEmail = document.getElementById("profileEmail");
    const summaryPhone = document.getElementById("profilePhone");
    const summaryVerification = document.getElementById("profileVerificationStatus");

    if (summaryName) {
        summaryName.textContent = user ? username : "Not logged in";
    }

    if (summaryEmail) {
        summaryEmail.textContent = email || "-";
    }

    if (summaryPhone) {
        summaryPhone.textContent = phone || "Not set";
    }

    if (summaryVerification) {
        summaryVerification.textContent = user ? (user.emailVerified ? "Verified" : "Not verified") : "Not logged in";
    }

    const usernameInput = document.getElementById("settingsUsername");
    const phoneInput = document.getElementById("settingsPhone");
    const emailInput = document.getElementById("settingsEmail");

    if (usernameInput) {
        usernameInput.value = user ? username : "";
        usernameInput.disabled = !user;
    }

    if (phoneInput) {
        phoneInput.value = phone;
        phoneInput.disabled = !user;
    }

    if (emailInput) {
        emailInput.value = email;
        emailInput.disabled = !user;
    }

    document.querySelectorAll("#profileSettingsForm input, #profileSettingsForm button, #passwordSettingsForm input, #passwordSettingsForm button").forEach((element) => {
        if (element instanceof HTMLInputElement || element instanceof HTMLButtonElement) {
            element.disabled = !user;
        }
    });
}

async function handleLogin(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    try {
        if (!window.RentGearFirebaseAuth) {
            throw new Error("Firebase auth is still loading. Please try again.");
        }

        state.authFlow = "login";
        const credential = await window.RentGearFirebaseAuth.signIn(email, password);
        await credential.user.reload();

        if (!credential.user.emailVerified) {
            await window.RentGearFirebaseAuth.signOut();
            throw new Error("Please verify your email address first before logging in.");
        }

        window.localStorage.setItem("rentgearUser", JSON.stringify({
            uid: credential.user.uid,
            email: credential.user.email || "",
            username: getDisplayName(credential.user),
            emailVerified: Boolean(credential.user.emailVerified)
        }));

        alert(`Welcome back, ${getDisplayName(credential.user)}.`);
        closeModal("loginModal");
        form.reset();
    } catch (error) {
        if (window.RentGearFirebaseAuth) {
            try {
                await window.RentGearFirebaseAuth.signOut();
            } catch (signOutError) {
                console.warn("Failed to clear the Firebase session after login error.", signOutError);
            }
        }

        alert(`Login could not be completed: ${getFriendlyFirebaseMessage(error, "login")}`);
    } finally {
        state.authFlow = null;
    }
}

async function handleSignup(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const username = String(formData.get("username") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");
    const confirmPassword = String(formData.get("confirmPassword") || "");
    const termsAccepted = Boolean(formData.get("termsAccepted"));

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    if (!termsAccepted) {
        alert("Please agree to the Terms and Conditions before signing up.");
        return;
    }

    try {
        if (!window.RentGearFirebaseAuth) {
            throw new Error("Firebase auth is still loading. Please try again.");
        }

        state.authFlow = "signup";
        const credential = await window.RentGearFirebaseAuth.signUp(email, password);
        await window.RentGearFirebaseAuth.setProfile(credential.user, {
            displayName: username
        });
        await window.RentGearFirebaseAuth.sendVerification(credential.user);
        await window.RentGearFirebaseAuth.signOut();

        alert(`Account created for ${username}. A verification email was sent to ${email}. Please verify it before logging in.`);
        closeModal("signupModal");
        form.reset();
    } catch (error) {
        if (window.RentGearFirebaseAuth) {
            try {
                await window.RentGearFirebaseAuth.signOut();
            } catch (signOutError) {
                console.warn("Failed to clear the Firebase session after signup error.", signOutError);
            }
        }

        alert(`Signup could not be completed: ${getFriendlyFirebaseMessage(error, "signup")}`);
    } finally {
        state.authFlow = null;
    }
}

async function handleProfileSave(event) {
    event.preventDefault();

    if (!state.authUser || !window.RentGearFirebaseAuth) {
        alert("Please log in first.");
        return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const username = String(formData.get("username") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const currentPassword = String(formData.get("currentPassword") || "");
    const currentEmail = state.authUser.email || "";

    try {
        if (username && username !== getDisplayName(state.authUser)) {
            await window.RentGearFirebaseAuth.setProfile(state.authUser, {
                displayName: username
            });
        }

        setStoredPhone(state.authUser.uid, phone);

        if (email && email !== currentEmail) {
            if (!currentPassword) {
                throw new Error("Enter your current password to change your email address.");
            }

            await window.RentGearFirebaseAuth.requestEmailChange(email, currentPassword);
            alert(`A verification link was sent to ${email}. Click that link to complete the email change.`);
        } else {
            alert("Profile updated successfully.");
        }

        await window.RentGearFirebaseAuth.reloadCurrentUser();
        updateAuthUi(state.authUser);
        form.reset();
        document.getElementById("settingsUsername").value = username;
        document.getElementById("settingsPhone").value = phone;
        document.getElementById("settingsEmail").value = currentEmail;
    } catch (error) {
        alert(`Profile update could not be completed: ${getFriendlyFirebaseMessage(error, "profile")}`);
    }
}

async function handlePasswordChange(event) {
    event.preventDefault();

    if (!state.authUser || !window.RentGearFirebaseAuth) {
        alert("Please log in first.");
        return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const oldPassword = String(formData.get("oldPassword") || "");
    const newPassword = String(formData.get("newPassword") || "");
    const confirmNewPassword = String(formData.get("confirmNewPassword") || "");

    if (newPassword !== confirmNewPassword) {
        alert("New passwords do not match.");
        return;
    }

    try {
        await window.RentGearFirebaseAuth.changePassword(oldPassword, newPassword);
        alert("Password updated successfully.");
        form.reset();
    } catch (error) {
        alert(`Password change could not be completed: ${getFriendlyFirebaseMessage(error, "password")}`);
    }
}

async function refreshBookingHistory() {
    const historyContainer = document.getElementById("bookingHistory");
    if (!historyContainer) {
        return;
    }

    if (!state.authUser?.email) {
        historyContainer.innerHTML = '<div class="history-empty">Log in to see your recent booking requests.</div>';
        return;
    }

    historyContainer.innerHTML = '<div class="history-empty">Loading recent booking requests...</div>';

    try {
        const response = await fetch(`${getBackendBaseUrl()}/api/bookings/history?email=${encodeURIComponent(state.authUser.email)}`);
        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(result.message || "Booking history could not be loaded.");
        }

        if (!result.bookings?.length) {
            historyContainer.innerHTML = '<div class="history-empty">No booking requests found for this account yet.</div>';
            return;
        }

        historyContainer.innerHTML = result.bookings.map((booking) => {
            const detailRows = [
                ["Request ID", booking.reference_id],
                ["Pickup Date", booking.pickup_date],
                ["Return Date", booking.return_date],
                ["Requested By", booking.name],
                ["Email Used", booking.email],
                ["Contact Phone", booking.phone],
                ["Request Notes", booking.message],
                ["Submitted", booking.created_at]
            ].filter(([, value]) => value && value !== "-");

            return `
                <article class="history-item">
                    <div class="history-item-head">
                        <strong>${escapeHtml(booking.requested_car || "Vehicle request")}</strong>
                        <span>${escapeHtml(booking.status || "new")}</span>
                    </div>
                    <div class="history-item-details">
                        ${detailRows.map(([label, value]) => `
                            <p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>
                        `).join("")}
                    </div>
                </article>
            `;
        }).join("");
    } catch (error) {
        historyContainer.innerHTML = `<div class="history-empty">${escapeHtml(error.message || "Booking history is unavailable right now.")}</div>`;
    }
}

async function handleLogout() {
    try {
        await window.RentGearFirebaseAuth?.signOut();
        window.localStorage.removeItem("rentgearUser");
        closeModal("settingsModal");
        alert("You have been logged out.");
    } catch (error) {
        alert(`Logout could not be completed: ${getFriendlyFirebaseMessage(error, "logout")}`);
    }
}

function handleRentClick(vehicle) {
    const selectedVehicle = typeof vehicle === "string"
        ? { name: vehicle }
        : vehicle;

    if (window.RentGearChatbot?.open) {
        window.RentGearChatbot.open(selectedVehicle);
        return;
    }

    alert(`You selected ${selectedVehicle.name}. The booking chatbot is still loading.`);
}
