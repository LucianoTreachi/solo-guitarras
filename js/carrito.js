// Deshabilitar la caché en la página carrito.html
window.onpageshow = function (event) {
  if (event.persisted) {
    window.location.reload();
  }
};

////////// MODAL CARRITO ////////// 
const botonCarrito = document.getElementById('boton-carrito')
const modalCarrito = document.getElementById('modal-carrito')
const cerrarModalCarrito = document.getElementById('cerrar-modal-carrito')

botonCarrito.addEventListener('click', () => {
  modalCarrito.classList.add('active')
});

cerrarModalCarrito.addEventListener('click', () => {
  modalCarrito.classList.remove('active')
});

////////// CARRITO //////////
let carrito = [];

const carritoContenedor = document.getElementById('carrito-contenedor');
const mensajeCarritoVacio = document.getElementById('mensaje-carrito-vacio');
const mensajeProductosAgregados = document.getElementById('mensaje-productos-agregados');
const contadorCarrito = document.getElementById('contador-carrito');
const precioTotal = document.getElementById('precio-total');
const botonVaciarCarrito = document.getElementById('boton-vaciar-carrito');
const botonContinuarCompra = document.getElementById('boton-continuar-compra');
const botonVolverTienda = document.getElementById('boton-volver-tienda');
const botonContinuarPagar = document.getElementById('boton-continuar-pagar');
const seccionPagar = document.getElementById('seccion-pagar');
const preguntaPago = document.getElementById('pago');
const datosUsuarioSeccion = document.getElementById('datos-usuario');
const efectivo = document.getElementById('efectivo');
const tarjeta = document.getElementById('tarjeta');
const datosUsuarioEfectivo = document.getElementById('datos-usuario-efectivo');
const datosUsuarioTarjeta = document.getElementById('datos-usuario-tarjeta');
const formularioPagarEfectivo = document.getElementById('formulario-pagar-efectivo');
const formularioPagarTarjeta = document.getElementById('formulario-pagar-tarjeta');
const modalEliminarProducto = document.getElementById('modal-eliminar-producto');
const botonVaciarSi = document.getElementById('boton-vaciar-si');
const botonVaciarNo = document.getElementById('boton-vaciar-no');
const modalVaciarCarrito = document.getElementById('modal-vaciar-carrito');
const botonEliminarSi = document.getElementById('boton-eliminar-si');
const botonEliminarNo = document.getElementById('boton-eliminar-no');

// Local Storage: guardar información
function guardarCarritoEnLocalStorage() {
  localStorage.setItem('carrito', JSON.stringify(carrito))
}

// Local Storage: obtener información
document.addEventListener('DOMContentLoaded', () => {
  carrito = JSON.parse(localStorage.getItem('carrito')) || []
  pintarCarrito();
});

// Pintar Carrito
const pintarCarrito = () => {

  carritoContenedor.innerHTML = "";

  carrito.forEach((producto) => {
    const div = document.createElement("div");
    div.className = "producto-en-carrito";
    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.titulo}">
      
      <div class="contenedor-titulo">
        <small>Titulo</small>
        <h3>${producto.titulo}</h3>
      </div>

      <div class="contenedor-precio">
        <small>Precio</small>
        <p>$ ${producto.precio}</p>
      </div>

      <div class="contenedor-cantidad">
        <small>Cantidad</small>
        <p> ${producto.cantidad}</p>
      </div>

      <button onclick = "eliminarProductoDelCarrito(${producto.id})" class="boton-eliminar-producto"><i class="ri-delete-bin-line"></i></button>  
    `;
    carritoContenedor.append(div)
  })

  guardarCarritoEnLocalStorage()
  mostrarMensajeCarritoVacio()
  actualizarMensajeProductosAgregados()
  actualizarContadorCarrito()
  mostrarTotal()
  mostrarBotonesVaciarContinuar()
  validarFormaPagoEfectivo()
  validarFormaPagoTarjeta()
}

// Mostrar mensaje "Tu carrito está vacío"
function mostrarMensajeCarritoVacio() {
  if (carrito.length === 0) {
    mensajeCarritoVacio.style.display = "block"
  }

  else {
    mensajeCarritoVacio.style.display = "none"
  }
}

// Mostrar mensaje de productos Agregados
function actualizarMensajeProductosAgregados() {
  let compras = carrito.reduce((acc, producto) => acc + producto.cantidad, 0)

  if (compras == 0) {
    mensajeProductosAgregados.innerText = "No tienes productos agregados";
  }

  if (compras == 1) {
    mensajeProductosAgregados.innerText = "Tienes 1 producto agregado";
  }

  if (compras > 1) {
    mensajeProductosAgregados.innerText = "Tienes " + compras + " productos agregados";
  }
}

// Agregar Productos al carrito
const agregarProductoAlCarrito = (idProducto) => {

  // Validar los parámetros de entrada
  if (!idProducto || typeof idProducto !== 'number') {
    console.error('El parámetro idProducto no es válido');
    return;
  }

  const producto = productos.find((prod) => prod.id === idProducto);

  if (carrito.includes(producto)) {
    const indexProducto = carrito.findIndex(prod => prod.id === idProducto);
    carrito[indexProducto].cantidad++;
  }

  else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  pintarCarrito();
}

// Actualizar Contador Carrito
function actualizarContadorCarrito() {
  let contador = carrito.reduce((acc, producto) => acc + producto.cantidad, 0)
  contadorCarrito.innerText = contador;
}

// Mostrar total
function mostrarTotal() {

  let total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0).toLocaleString();

  if (carrito.length === 0) {
    precioTotal.innerText = "";
  }

  else {
    precioTotal.innerText = "Precio Total: $ " + total + " USD";
  }
}

// Mostrar botones Vaciar carrito y Continuar compra
function mostrarBotonesVaciarContinuar() {

  if (carrito.length === 0) {
    botonVaciarCarrito.style.display = "none";
    botonContinuarCompra.style.display = "none";
    botonContinuarPagar.style.display = "none";
  }

  else {
    botonVaciarCarrito.style.display = "block";
    botonContinuarCompra.style.display = "block";
    botonContinuarPagar.style.display = "block";
  }
}
mostrarBotonesVaciarContinuar();

// Eliminar producto del carrito
const eliminarProductoDelCarrito = (idProducto) => {
  const indice = carrito.findIndex((prod) => prod.id === idProducto);
  if (indice !== -1) {
    modalEliminarProducto.classList.add("active");

    // Agregar evento click solo una vez
    botonEliminarSi.onclick = () => {
      modalEliminarProducto.classList.remove("active");
      carrito.splice(indice, 1);
      pintarCarrito();
      // Remover el evento click para evitar agregarlo de nuevo
      botonEliminarSi.onclick = null;
    };

    botonEliminarNo.addEventListener("click", () => {
      modalEliminarProducto.classList.remove("active");
    });
  }
}

// Vaciar carrito
botonVaciarCarrito.addEventListener("click", () => {
  modalVaciarCarrito.classList.add("active");

  botonVaciarSi.addEventListener("click", () => {
    modalVaciarCarrito.classList.remove("active");
    seccionPagar.style.display = "none"
    datosUsuarioEfectivo.style.opacity = "0";
    datosUsuarioEfectivo.style.display = "none";
    datosUsuarioTarjeta.style.display = "0";
    datosUsuarioTarjeta.style.display = "none";
    carrito = [];
    pintarCarrito();
  });

  botonVaciarNo.addEventListener("click", () => {
    modalVaciarCarrito.classList.remove("active");
  });
});

// Continuar compra
botonContinuarCompra.addEventListener("click", () => {
  location.href = "carrito.html"
});

// Boton Volver a la tienda
// Si existe botonVolverTienda se ejecuta el siguiente código
if (botonVolverTienda) {
  botonVolverTienda.addEventListener("click", () => {
    location.href = "index.html#tienda"
  })
}

// Boton que lleva a la seccion Pagar
botonContinuarPagar.addEventListener("click", () => {
  seccionPagar.style.display = "block"
  location.href = "#seccion-pagar"
});

// Si presiono Pago Efectivo
function validarFormaPagoEfectivo() {
  efectivo.addEventListener("click", () => {
    location.href = "#datos-usuario"
    datosUsuarioSeccion.style.display = "block"
    datosUsuarioEfectivo.style.opacity = "1";
    datosUsuarioEfectivo.style.display = "flex";
    datosUsuarioTarjeta.style.opacity = "0";
    datosUsuarioTarjeta.style.display = "none";

    formularioPagarEfectivo.reset();
    alertaNombreEfectivo.textContent = '';
    alertaApellidoEfectivo.textContent = '';
    alertaEmailEfectivo.textContent = '';
    alertaPaisEfectivo.textContent = '';
    alertaCiudadEfectivo.textContent = '';
    alertaCodigoPostalEfectivo.textContent = '';
  });
}

// Si presiono Pago Tarjeta
function validarFormaPagoTarjeta() {
  tarjeta.addEventListener("click", () => {
    location.href = "#datos-usuario"
    datosUsuarioSeccion.style.display = "block"
    datosUsuarioEfectivo.style.opacity = "0";
    datosUsuarioEfectivo.style.display = "none";
    datosUsuarioTarjeta.style.opacity = "1";
    datosUsuarioTarjeta.style.display = "flex";

    formularioPagarTarjeta.reset();
    alertaNombreTarjeta.textContent = '';
    alertaApellidoTarjeta.textContent = '';
    alertaEmailTarjeta.textContent = '';
    alertaPaisTarjeta.textContent = '';
    alertaCiudadTarjeta.textContent = '';
    alertaCodigoPostalTarjeta.textContent = '';
    alertaNumeroTarjeta.textContent = '';
    alertaMesTarjeta.textContent = '';
    alertaAnoTarjeta.textContent = '';
    alertaCodigoTarjeta.textContent = '';
  });
}