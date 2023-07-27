// Deshabilitar la caché en la página de éxito
window.onload = function() {
  window.history.pushState({}, '');
};

const botonVolver = document.getElementById('boton-volver');

botonVolver.addEventListener("click", () => {
  location.href = "index.html"
});