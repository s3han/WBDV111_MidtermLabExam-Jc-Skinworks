// ── MOBILE MENU ──
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click", () => {
    document.body.classList.toggle("show-mobile-menu");
});
menuCloseButton.addEventListener("click", () => menuOpenButton.click());

// ── SPA NAVIGATION ──
const navLinks = document.querySelectorAll(".nav-link[data-section]");
const navLogo  = document.querySelector(".nav-logo[data-section]");
const sections = document.querySelectorAll(".page-section");

function showSection(sectionId) {
    sections.forEach(sec => sec.classList.remove("active"));
    navLinks.forEach(link => link.classList.remove("active"));

    const target = document.getElementById("section-" + sectionId);
    if (target) target.classList.add("active");

    navLinks.forEach(link => {
        if (link.dataset.section === sectionId) link.classList.add("active");
    });

    // close mobile menu if open
    document.body.classList.remove("show-mobile-menu");

    // scroll to top so header shows
    window.scrollTo({ top: 0, behavior: "smooth" });
}

navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        showSection(link.dataset.section);
    });
});

if (navLogo) {
    navLogo.addEventListener("click", (e) => {
        e.preventDefault();
        showSection("home");
    });
}

// ── LETTERS-ONLY VALIDATION HELPER ──
function isLettersOnly(value) {
    return /^[A-Za-zÀ-ÿ\s'-]+$/.test(value.trim());
}

// ── CONTACT FORM ──
const contactForm    = document.getElementById("contact-form");
const contactName    = document.getElementById("contact-name");
const nameError      = document.getElementById("name-error");
const contactThankyou = document.getElementById("contact-thankyou");

if (contactName) {
    contactName.addEventListener("input", () => {
        // Strip numbers as the user types
        contactName.value = contactName.value.replace(/[^A-Za-zÀ-ÿ\s'-]/g, "");
    });
}

if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let valid = true;

        if (!isLettersOnly(contactName.value)) {
            nameError.classList.add("visible");
            valid = false;
        } else {
            nameError.classList.remove("visible");
        }

        if (valid) {
            contactForm.style.display = "none";
            contactThankyou.style.display = "block";
        }
    });
}

// ── BOOKING FORM ──
const bookingForm     = document.getElementById("booking-form");
const bookingName     = document.getElementById("booking-name");
const bookingNameError = document.getElementById("booking-name-error");
const bookingThankyou = document.getElementById("booking-thankyou");
const bookingPhone = document.getElementById("booking-phone");

// Set minimum date to today
const bookingDate = document.getElementById("booking-date");
if (bookingDate) {
    const today = new Date().toISOString().split("T")[0];
    bookingDate.setAttribute("min", today);
    bookingDate.setAttribute("max", "2030-12-31");
}

if (bookingName) {
    bookingName.addEventListener("input", () => {
        bookingName.value = bookingName.value.replace(/[^A-Za-zÀ-ÿ\s'-]/g, "");
    });
}

if (bookingPhone) {
    bookingPhone.addEventListener("input", () => {
        bookingPhone.value = bookingPhone.value.replace(/[^0-9]/g, "");
    });
}
if(bookingPhone.length > 0 && !bookingPhone.startWith("09")) {
    bookingPhone = "09" + bookingPhone.replace(/^0+/, ""); }
if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let valid = true;

        if (!isLettersOnly(bookingName.value)) {
            bookingNameError.classList.add("visible");
            valid = false;
        } else {
            bookingNameError.classList.remove("visible");
        }

        if (valid) {
            bookingForm.style.display = "none";
            bookingThankyou.style.display = "block";
        }
    });
}

// ── SWIPER ──
new Swiper('.services-swiper', {
    loop: true,
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: 24,

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        640: { slidesPerView: 1, spaceBetween: 20 },
        768: { slidesPerView: 2, spaceBetween: 24, centeredSlides: false },
        1024: { slidesPerView: 3, spaceBetween: 24, centeredSlides: false },
    },
});
