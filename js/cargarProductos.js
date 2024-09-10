// Deshabilitar la caché en la página index.html
window.onpageshow = function (event) {
  if (event.persisted) {
    window.location.reload();
  }
};

const contenedorProductos = document.getElementById("contenedor-productos");
const modalProductoAgregado = document.getElementById('modal-producto-agregado');
const cerrarModalProductoAgregado = document.getElementById('cerrar-modal-producto-agregado');
const body = document.body;

// Cargar los productos en la página
productos.forEach((producto) => {
  const div = document.createElement("div");
  div.className = "producto";
  div.innerHTML = `
    <picture>
      <source srcset="${producto.imagenWebp}" alt="${producto.alt}">
      <img src="${producto.imagen}" alt="${producto.alt}" class="producto-imagen" width="500" height="500"> 
    </picture>
    <h3 class="producto-titulo">${producto.titulo}</h3>
    <p class="producto-precio">$ ${producto.precio} USD</p>
    <div class="contenedor-botones">
    <button class="boton boton-agregar" id="boton-agregar${producto.id}">Agregar al carrito</button>
      <button class="boton boton-info" id="boton-info${producto.id}">Ver producto</button>
    </div>     
  `;
  contenedorProductos.append(div);

  // Boton Info: abre el modal producto info
  const botonInfo = document.getElementById(`boton-info${producto.id}`);
  botonInfo.addEventListener("click", () => {
    modalProductoInfo.classList.add("active");
    mostrarProductoInfo(producto.id);
    body.style.overflow = "hidden";
  })

  // Boton Agregar: realiza 3 acciones 
  const botonAgregar = document.getElementById(`boton-agregar${producto.id}`);

  // 1) muestra el modal producto agregado
  botonAgregar.addEventListener("click", () => {
    modalProductoAgregado.classList.add("active");

    // 2) muestra el título del producto agregado
    const productoTitulo = document.querySelector('.modal-producto-agregado p');
    productoTitulo.innerHTML = `${producto.titulo}`;

    // 3) agrega el producto al carrito
    agregarProductoAlCarrito(producto.id);
  })
});

// Cerrar Modal Producto Agregado
cerrarModalProductoAgregado.addEventListener("click", () => {
  modalProductoAgregado.classList.remove("active");
});

////////// PRODUCTO INFO //////////
const productoInfo = [];
const modalProductoInfo = document.getElementById('modal-producto-info');
const pintarProductoInfo = () => {

  modalProductoInfo.innerHTML = "";

  // Cargar la información del producto
  productoInfo.forEach((producto) => {
    const div = document.createElement("div");
    div.className = "producto-info";
    div.innerHTML = `
      <h2>${producto.titulo}</h2>
      <div class="producto-info-galeria">
        <picture>
          <source srcset="${producto.galeria.imagen1Webp}">
          <img src="${producto.galeria.imagen1}">
        </picture>
        <picture>
          <source srcset="${producto.galeria.imagen2Webp}">
          <img src="${producto.galeria.imagen2}">
        </picture>
        <picture>
          <source srcset="${producto.galeria.imagen3Webp}">
          <img src="${producto.galeria.imagen3}">
        </picture>
      </div>
      <p>${producto.info}</p>
      <button class="boton-cerrar-modal" id="cerrar-modal-producto-info">Cerrar</button>
    `;
    modalProductoInfo.append(div);
  });

  // Cerrar modal producto info desde el boton cerrar
  const cerrarModalProductoInfo = document.getElementById('cerrar-modal-producto-info');
  cerrarModalProductoInfo.addEventListener("click", () => {
    modalProductoInfo.classList.remove("active");
    productoInfo.length = 0;
    body.style.overflow = "auto";
  });
}

// Mostrar modal producto info
const mostrarProductoInfo = (idProducto) => {
  const item = productos.find((prod) => prod.id === idProducto);
  productoInfo.push(item);
  pintarProductoInfo();
}