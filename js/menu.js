////////// RESPONSIVE MENU ////////// 
const menuHamburguesa = document.querySelector(".menu-hamburguesa");
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-link");

menuHamburguesa.addEventListener('click', () => {
  menuHamburguesa.classList.toggle("open");
  navbar.classList.toggle("open");
});

navLinks.forEach((e) => {
  e.addEventListener('click', () => {
    navbar.classList.remove("open");
    menuHamburguesa.classList.toggle("open");
  })
});