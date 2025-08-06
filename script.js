const toggle = document.getElementById("theme-toggle");
toggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  if (currentTheme === "dark") {
    document.documentElement.removeAttribute("data-theme");
    toggle.textContent = "🌙";
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    toggle.textContent = "☀️";
  }
});
