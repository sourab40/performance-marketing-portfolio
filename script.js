const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuButton?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});
nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton?.setAttribute("aria-expanded", "false");
}));
document.getElementById("year").textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
// ==============================
// THEME SWITCHER
// ==============================

const themeButton = document.getElementById("theme-toggle");
const themeIcon = themeButton.querySelector(".theme-toggle-icon");

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);

  const isLight = theme === "light";

  themeIcon.textContent = isLight ? "☾" : "☀";

  themeButton.setAttribute(
    "aria-label",
    isLight ? "Switch to dark theme" : "Switch to light theme"
  );

  themeButton.setAttribute("aria-pressed", String(isLight));

  document.querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", isLight ? "#FAF7F5" : "#090909");

  localStorage.setItem("portfolio-theme", theme);
}

// Restore saved theme (dark by default)
const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
applyTheme(savedTheme);

// Toggle theme on click
themeButton.addEventListener("click", () => {
  const currentTheme =
    document.documentElement.getAttribute("data-theme") || "dark";

  applyTheme(currentTheme === "dark" ? "light" : "dark");
});
