////////// NEWSLETTER //////////

// Variables
const newsletterBoton = document.getElementById("newsletter-boton");
const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll('input');
const inputNombre = document.getElementById("input-nombre");
const inputApellido = document.getElementById("input-apellido");
const emailInput = document.getElementById("input-email");
const botonSuscribirse = document.getElementById("boton-suscribirse");

// Alertas
const alertaNombre = document.getElementById("alerta-nombre");
const alertaApellido = document.getElementById("alerta-apellido");
const alertaEmail = document.getElementById("alerta-email");

// Modales
const modalNewsletter = document.getElementById("modal-newsletter");
const cerrarModalNewsletter = document.getElementById("cerrar-modal-newsletter");
const modalNewsletterExitoso = document.getElementById("modal-newsletter-exitoso");
const cerrarModalNewsletterExitoso = document.getElementById("cerrar-modal-newsletter-exitoso");

// Expresiones Regulares
const expresionNombre = /^[\S][a-zA-ZÀ-ÿ\s]{1,20}$/;
const expresionEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{4,63}\.){1,125}[A-Z]{2,4}$/i;

/* Reemplazar espacios en blanco en el input email */
emailInput.addEventListener("input", () => {
  emailInput.value = emailInput.value.replace(/ /g, "")
})

/* Botón Newsletter */
newsletterBoton.addEventListener("click", () => {
  modalNewsletter.classList.add("active");
})

/* Validar expresiones regulares */
function validarExpresionesRegulares(e) {
  switch (e.target.name) {

    case "input-nombre":
      if (!expresionNombre.test(e.target.value)) {
        alertaNombre.style.display = "block";
      }
      else {
        alertaNombre.style.display = "none";
      }
      break;

    case "input-apellido":
      if (!expresionNombre.test(e.target.value)) {
        alertaApellido.style.display = "block";
      }
      else {
        alertaApellido.style.display = "none";
      }
      break;

    case "input-email":
      if (!expresionEmail.test(e.target.value)) {
        alertaEmail.style.display = "block";
      }
      else {
        alertaEmail.style.display = "none";
      }
      break;
  }
}

/* Eventos */
inputs.forEach((input) => {
  input.addEventListener('input', validarExpresionesRegulares);
  input.addEventListener('blur', validarExpresionesRegulares);
});

/* Deshabilitar o Habilitar el botón del formulario */
botonSuscribirse.disabled = true;
botonSuscribirse.style.opacity = "0.4";
botonSuscribirse.style.cursor = "auto";

formulario.addEventListener("keyup", () => {
  if (expresionNombre.test(inputNombre.value) &&
    expresionNombre.test(inputApellido.value) &&
    expresionEmail.test(emailInput.value)) {
    botonSuscribirse.disabled = false;
    botonSuscribirse.style.opacity = "1";
    botonSuscribirse.style.cursor = "pointer";
  }

  else {
    botonSuscribirse.disabled = true;
    botonSuscribirse.style.opacity = "0.4";
    botonSuscribirse.style.cursor = "auto";
  }
});

/* Enviar formulario */
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  modalNewsletter.classList.remove("active");
  modalNewsletterExitoso.classList.add("active");
});

/* Cerrar Modal Newsletter */
cerrarModalNewsletter.addEventListener("click", () => {
  modalNewsletter.classList.remove("active");

  formulario.reset();

  alertaNombre.style.display = "none";
  alertaApellido.style.display = "none";
  alertaEmail.style.display = "none";

  botonSuscribirse.disabled = true;
  botonSuscribirse.style.opacity = "0.4";
  botonSuscribirse.style.cursor = "auto";
});

/* Cerrar Modal Newsletter exitoso */
cerrarModalNewsletterExitoso.addEventListener("click", () => {
  modalNewsletterExitoso.classList.remove("active");
  location.href = "index.html"
})