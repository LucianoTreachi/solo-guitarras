// Deshabilitar la caché en la página de pago
window.onpageshow = function (event) {
  if (event.persisted) {
    window.location.reload();
  }
};

////////// VALIDAR PAGO //////////

/* Inputs */
const inputs = document.querySelectorAll('input');

/* Alertas para pago en Efectivo */
const alertaNombreEfectivo = document.getElementById('alerta-nombre-efectivo')
const alertaApellidoEfectivo = document.getElementById('alerta-apellido-efectivo')
const alertaEmailEfectivo = document.getElementById('alerta-email-efectivo')
const alertaPaisEfectivo = document.getElementById('alerta-pais-efectivo')
const alertaCiudadEfectivo = document.getElementById('alerta-ciudad-efectivo')
const alertaCodigoPostalEfectivo = document.getElementById('alerta-codigo-postal-efectivo')

/* Alertas para pago con Tarjeta */
const alertaNombreTarjeta = document.getElementById('alerta-nombre-tarjeta')
const alertaApellidoTarjeta = document.getElementById('alerta-apellido-tarjeta')
const alertaEmailTarjeta = document.getElementById('alerta-email-tarjeta')
const alertaPaisTarjeta = document.getElementById('alerta-pais-tarjeta')
const alertaCiudadTarjeta = document.getElementById('alerta-ciudad-tarjeta')
const alertaCodigoPostalTarjeta = document.getElementById('alerta-codigo-postal-tarjeta')
const alertaNumeroTarjeta = document.getElementById('alerta-numero-tarjeta')
const alertaMesTarjeta = document.getElementById('alerta-mes-tarjeta')
const alertaAnoTarjeta = document.getElementById('alerta-anio-tarjeta')
const alertaCodigoTarjeta = document.getElementById('alerta-codigo-tarjeta')

/* Cancelar Compra */
const botonCancelarCompra = document.querySelectorAll('.boton-cancelar-compra');
const modalCancelarCompra = document.getElementById('modal-cancelar-compra');
const botonCancelarSi = document.getElementById('boton-cancelar-si');
const botonCancelarNo = document.getElementById('boton-cancelar-no');

/* Alerta Formulario */
const modalAlertaFormulario = document.getElementById('modal-alerta-formulario');
const botonCerrarAlertaFormulario = document.getElementById('boton-cerrar-alerta-formulario');

/* Modal Loader */
const modalLoader = document.getElementById('modal-loader');

/* Expresiones Regulares */
const expresionNombre = /^[\S][a-zA-ZÀ-ÿ\s]{1,50}$/;
const expresionEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{4,63}\.){1,125}(com|net|org|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)\b$/i;
const expresionCodigoPostal = /[0-9]{4,10}$/;
const expresionPais = /^[a-zA-ZÀ-ÿ\s]{2,100}$/;
const expresionCiudad = /^[a-zA-ZÀ-ÿ\s]{2,100}(\s\([a-zA-ZÀ-ÿ\s]+\))?$/;
const expresionNumeroTarjeta = /[0-9]{13,18}$/;
const expresionMesTarjeta = /^(0[1-9]|1[0-2])$/;
const expresionAnioTarjeta = /^(202[3-9]|20[3-9]\d)$/;
const expresionCodigoTarjeta = /^[0-9]{3,4}$/;

/* Campos para efectivo */
const camposEfectivo = {
  nombre: false,
  apellido: false,
  correo: false,
  pais: false,
  ciudad: false,
  codigoPostal: false,
}

/* Campos para tarjeta */
const camposTarjeta = {
  nombre: false,
  apellido: false,
  correo: false,
  pais: false,
  ciudad: false,
  codigoPostal: false,
  numeroTarjeta: false,
  mesTarjeta: false,
  anioTarjeta: false,
  codigoTarjeta: false,
}

////////// VALIDAR PAGO EN EFECTIVO //////////

/* 1. Validar expresiones regulares para pago en efectivo */
function validarExpresionesRegularesEfectivo(e) {

  const check = e.target.parentElement.querySelector('[data-check]');

  switch (e.target.id) {

    case "input-nombre-efectivo":
      camposEfectivo.nombre = expresionNombre.test(e.target.value);
      alertaNombreEfectivo.textContent = camposEfectivo.nombre ? "" : "Ingresa tu nombre como figura en el DNI";
      check.style.display = camposEfectivo.nombre ? "block" : "none";
      break;

    case "input-apellido-efectivo":
      camposEfectivo.apellido = expresionNombre.test(e.target.value);
      alertaApellidoEfectivo.textContent = camposEfectivo.apellido ? "" : "Ingresa tu apellido como figura en el DNI";
      check.style.display = camposEfectivo.apellido ? "block" : "none";
      break;

    case "input-email-efectivo":
      camposEfectivo.correo = expresionEmail.test(e.target.value);
      alertaEmailEfectivo.textContent = camposEfectivo.correo ? "" : "Ingresa un email válido para recibir el comprobante de pago";
      check.style.display = camposEfectivo.correo ? "block" : "none";
      break;

    case "input-pais-efectivo":
      camposEfectivo.pais = expresionPais.test(e.target.value);
      alertaPaisEfectivo.textContent = camposEfectivo.pais ? "" : "Ingresa tu país";
      check.style.display = camposEfectivo.pais ? "block" : "none";
      break;

    case "input-ciudad-efectivo":
      camposEfectivo.ciudad = expresionCiudad.test(e.target.value);
      alertaCiudadEfectivo.textContent = camposEfectivo.ciudad ? "" : "Ingresa tu ciudad";
      check.style.display = camposEfectivo.ciudad ? "block" : "none";
      break;

    case "input-codigo-postal-efectivo":
      camposEfectivo.codigoPostal = expresionCodigoPostal.test(e.target.value);
      alertaCodigoPostalEfectivo.textContent = camposEfectivo.codigoPostal ? "" : "Ingresa el código postal de tu ciudad. Solo números";
      check.style.display = camposEfectivo.codigoPostal ? "block" : "none";
      break;
  }
}

/* 2. Eventos para pagar en Efectivo */
inputs.forEach((input) => {
  input.addEventListener('input', validarExpresionesRegularesEfectivo);
  input.addEventListener('blur', validarExpresionesRegularesEfectivo);
});

/* 3. Formulario para pagar en Efectivo */
formularioPagarEfectivo.addEventListener("submit", (evento) => {
  evento.preventDefault();

  if (!camposEfectivo.nombre ||
    !camposEfectivo.apellido ||
    !camposEfectivo.correo ||
    !camposEfectivo.pais ||
    !camposEfectivo.ciudad ||
    !camposEfectivo.codigoPostal) {

    modalAlertaFormulario.classList.add("active");

    botonCerrarAlertaFormulario.addEventListener("click", () => {
      modalAlertaFormulario.classList.remove("active");
    });
  }

  else {
    modalLoader.classList.add("active");

    setTimeout(() => {
      formularioPagarEfectivo.reset();
      localStorage.clear();
      carrito = [];
      pintarCarrito();
      window.location.replace("exito.html");
    }, 4000);
  }
});

////////// VALIDAR PAGO CON TARJETA //////////

/* 1. Validar expresiones regulares para pago con tarjeta */
function validarExpresionesRegularesTarjeta(e) {

  const check = e.target.parentElement.querySelector('[data-check]');

  switch (e.target.id) {

    case "input-nombre-tarjeta":
      camposTarjeta.nombre = expresionNombre.test(e.target.value);
      alertaNombreTarjeta.textContent = camposTarjeta.nombre ? "" : "Ingresa tu nombre como figura en el DNI";
      check.style.display = camposTarjeta.nombre ? "block" : "none";
      break;

    case "input-apellido-tarjeta":
      camposTarjeta.apellido = expresionNombre.test(e.target.value);
      alertaApellidoTarjeta.textContent = camposTarjeta.apellido ? "" : "Ingresa tu apellido como figura en el DNI";
      check.style.display = camposTarjeta.apellido ? "block" : "none";
      break;

    case "input-email-tarjeta":
      camposTarjeta.correo = expresionEmail.test(e.target.value);
      alertaEmailTarjeta.textContent = camposTarjeta.correo ? "" : "Ingresa un email válido para recibir el comprobante de pago";
      check.style.display = camposTarjeta.correo ? "block" : "none";
      break;

    case "input-pais-tarjeta":
      camposTarjeta.pais = expresionPais.test(e.target.value);
      alertaPaisTarjeta.textContent = camposTarjeta.pais ? "" : "Ingresa tu país";
      check.style.display = camposTarjeta.pais ? "block" : "none";
      break;

    case "input-ciudad-tarjeta":
      camposTarjeta.ciudad = expresionCiudad.test(e.target.value);
      alertaCiudadTarjeta.textContent = camposTarjeta.ciudad ? "" : "Ingresa tu ciudad";
      check.style.display = camposTarjeta.ciudad ? "block" : "none";
      break;

    case "input-codigo-postal-tarjeta":
      camposTarjeta.codigoPostal = expresionCodigoPostal.test(e.target.value);
      alertaCodigoPostalTarjeta.textContent = camposTarjeta.codigoPostal ? "" : "Ingresa el código postal de tu ciudad. Solo números";
      check.style.display = camposTarjeta.codigoPostal ? "block" : "none";
      break;

    case "input-numero-tarjeta":
      camposTarjeta.numeroTarjeta = expresionNumeroTarjeta.test(e.target.value);
      alertaNumeroTarjeta.textContent = camposTarjeta.numeroTarjeta ? "" : "Ingresa los números de tu tarjeta";
      check.style.display = camposTarjeta.numeroTarjeta ? "block" : "none";
      break;

    case "input-mes-tarjeta":
      camposTarjeta.mesTarjeta = expresionMesTarjeta.test(e.target.value);
      alertaMesTarjeta.textContent = camposTarjeta.mesTarjeta ? "" : "Ingresa 2 números para el mes de vencimiento";
      check.style.display = camposTarjeta.mesTarjeta ? "block" : "none";
      break;

    case "input-anio-tarjeta":
      camposTarjeta.anioTarjeta = expresionAnioTarjeta.test(e.target.value);
      alertaAnoTarjeta.textContent = camposTarjeta.anioTarjeta ? "" : "Ingresa 4 números para el año de vencimiento";
      check.style.display = camposTarjeta.anioTarjeta ? "block" : "none";
      break;

    case "input-codigo-tarjeta":
      camposTarjeta.codigoTarjeta = expresionCodigoTarjeta.test(e.target.value);
      alertaCodigoTarjeta.textContent = camposTarjeta.codigoTarjeta ? "" : "Ingresa el código de seguridad de tu tarjeta";
      check.style.display = camposTarjeta.codigoTarjeta ? "block" : "none";
      break;
  }
}

/* 2. Eventos para pagar en Efectivo */
inputs.forEach((input) => {
  input.addEventListener('input', validarExpresionesRegularesEfectivo);
  input.addEventListener('blur', validarExpresionesRegularesTarjeta);
});

/* 3. Formulario para pagar con Tareta */
formularioPagarTarjeta.addEventListener("submit", (evento) => {
  evento.preventDefault();

  if (!camposTarjeta.nombre ||
    !camposTarjeta.apellido ||
    !camposTarjeta.correo ||
    !camposTarjeta.pais ||
    !camposTarjeta.ciudad ||
    !camposTarjeta.codigoPostal ||
    !camposTarjeta.numeroTarjeta ||
    !camposTarjeta.mesTarjeta ||
    !camposTarjeta.anioTarjeta ||
    !camposTarjeta.codigoTarjeta) {

    modalAlertaFormulario.classList.add("active");

    botonCerrarAlertaFormulario.addEventListener("click", () => {
      modalAlertaFormulario.classList.remove("active");
    });
  }

  else {
    modalLoader.classList.add("active");

    setTimeout(() => {
      formularioPagarTarjeta.reset();
      localStorage.clear();
      carrito = [];
      pintarCarrito();
      window.location.replace("exito.html");
    }, 4000);
  }
});

////////// CANCELAR COMPRA //////////

/* Cancelar Compra */
botonCancelarCompra.forEach((btn) => {
  btn.addEventListener("click", () => {
    modalCancelarCompra.classList.add("active");

    botonCancelarSi.addEventListener("click", () => {
      modalCancelarCompra.classList.remove("active");
      seccionPagar.style.display = "none"
      datosUsuarioEfectivo.style.opacity = "0";
      datosUsuarioEfectivo.style.display = "none";
      datosUsuarioTarjeta.style.display = "0";
      datosUsuarioTarjeta.style.display = "none";
      carrito = [];
      pintarCarrito();
    });

    botonCancelarNo.addEventListener("click", () => {
      modalCancelarCompra.classList.remove("active");
    });
  });
});