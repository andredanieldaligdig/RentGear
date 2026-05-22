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
    showcaseAnimating: false
};

document.addEventListener("DOMContentLoaded", () => {
    setDefaultDates();
    renderVehicles();
    renderShowcase(true);
    bindTabs();
    bindSearch();
    bindFaq();
    bindMenu();
    bindModals();
    bindAuthForms();
    bindShowcase();
    updateFleetStatus();
    startShowcaseAutoplay();
});

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
            handleRentClick(vehicle.name);
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
        button.addEventListener("click", () => handleRentClick(button.dataset.rentVehicle));
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
                <button class="btn-rent button-wipe" type="button" data-rent-vehicle="${escapeHtml(vehicle.name)}"><span>Reserve Now</span></button>
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
}

async function postJson(path, payload, options = {}) {
    let response;

    try {
        response = await fetch(`${getBackendBaseUrl()}${path}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {})
            },
            body: payload === undefined ? undefined : JSON.stringify(payload)
        });
    } catch (error) {
        throw new Error("Cannot reach the auth server. Start the Express backend on http://localhost:3000 and try again.");
    }

    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw new Error(result.message || result.error || "The request could not be completed.");
    }

    return result;
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

        const credential = await window.RentGearFirebaseAuth.signIn(email, password);
        await window.RentGearFirebaseAuth.reloadCurrentUser();

        if (!credential.user.emailVerified) {
            await window.RentGearFirebaseAuth.signOut();
            throw new Error("Please verify your email address first before logging in.");
        }

        const token = await credential.user.getIdToken(true);
        const result = await postJson(
            "/api/auth/login",
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        window.localStorage.setItem("rentgearUser", JSON.stringify(result.user));
        alert(`Welcome back, ${result.user.username}.`);
        closeModal("loginModal");
        form.reset();
    } catch (error) {
        if (window.RentGearFirebaseAuth) {
            try {
                await window.RentGearFirebaseAuth.signOut();
            } catch (signOutError) {
                console.warn("Failed to sign out after login error.", signOutError);
            }
        }

        alert(`Login could not be completed: ${error.message}`);
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

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    let createdFirebaseUser = null;

    try {
        if (!window.RentGearFirebaseAuth) {
            throw new Error("Firebase auth is still loading. Please try again.");
        }

        const credential = await window.RentGearFirebaseAuth.signUp(email, password);
        createdFirebaseUser = credential.user;
        await window.RentGearFirebaseAuth.sendVerification(credential.user);
        const token = await credential.user.getIdToken(true);

        const result = await postJson(
            "/api/auth/signup",
            {
                username
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        await window.RentGearFirebaseAuth.signOut();
        alert(`Account created for ${result.user.username}. A verification email was sent to ${result.user.email}. Please verify it before logging in.`);
        closeModal("signupModal");
        form.reset();
        openModal("loginModal");
    } catch (error) {
        if (createdFirebaseUser) {
            try {
                await window.RentGearFirebaseAuth.deleteUserAccount(createdFirebaseUser);
            } catch (deleteError) {
                try {
                    await window.RentGearFirebaseAuth.signOut();
                } catch (signOutError) {
                    console.warn("Failed to sign out after signup error.", signOutError);
                }
            }
        }

        alert(`Signup could not be completed: ${error.message}`);
    }
}

function handleRentClick(vehicleName) {
    if (window.RentGearChatbot?.open) {
        window.RentGearChatbot.open(vehicleName);
        return;
    }

    alert(`You selected ${vehicleName}. The booking chatbot is still loading.`);
}
