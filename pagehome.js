
document.getElementById("toggleTheme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});


document.getElementById("menuToggle").addEventListener("click", () => {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("open");
});

