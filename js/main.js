// Shared: mobile menu toggle and footer year
var navToggle = document.getElementById("navToggle");
var mainNav = document.getElementById("mainNav");

navToggle.addEventListener("click", function () {
  var open = mainNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", open);
});

document.getElementById("year").textContent = new Date().getFullYear();
