const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const themeToggles = document.querySelectorAll(".theme-toggle");

const getPreferredTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    return savedTheme;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const applyTheme = (theme) => {
  document.body.setAttribute("data-theme", theme);
  const label = theme === "dark" ? "Light Mode" : "Dark Mode";
  themeToggles.forEach((toggle) => {
    toggle.setAttribute("aria-pressed", String(theme === "dark"));
    const labelSpan = toggle.querySelector(".theme-label");
    if (labelSpan) {
      labelSpan.textContent = label;
    }
  });
  localStorage.setItem("theme", theme);
};

applyTheme(getPreferredTheme());

menuToggle.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("show");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

themeToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const nextTheme =
      document.body.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "Thanks! Your message has been sent.";
  contactForm.reset();
});
