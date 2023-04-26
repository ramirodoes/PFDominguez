document.addEventListener("DOMContentLoaded", function() {

  const selectProducto = document.getElementById("producto-elegido");
  const inputCantidad = document.getElementById("cantidad-elegida");
  const botonComprar = document.getElementById("boton-comprar");
  const listaCarrito = document.getElementById("lista-carrito");
  const botonVaciarCarrito = document.getElementById("boton-vaciar-carrito");
  const totalCarrito = document.getElementById("total-carrito");
  let carrito = [];

  function agregarProducto(e) {
    e.preventDefault();
    const productoElegido = selectProducto.value;
    const cantidadElegida = parseInt(inputCantidad.value);
    const precio = selectProducto.options[selectProducto.selectedIndex].innerText.match(/\d+/)[0];
    const productoEnCarrito = carrito.find(item => item.producto === productoElegido);

    if (productoEnCarrito) {
      productoEnCarrito.cantidad += cantidadElegida;
    } else {
      const producto = {
        producto: productoElegido,
        cantidad: cantidadElegida,
        precio: precio
      };
      carrito.push(producto);
    }
    mostrarCarrito();
  }

  function mostrarCarrito() {
    listaCarrito.innerHTML = "";

    carrito.forEach(item => {
      const { producto, cantidad, precio } = item;
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${producto}</td>
        <td>${cantidad}</td>
        <td>$${precio}</td>
        <td>$${cantidad * precio}</td>
        <td><button class="borrar-producto" data-producto="${producto}">X</button></td>
      `;
      listaCarrito.appendChild(row);
    });

    calcularTotal();
  }

  function calcularTotal() {
    let total = 0;
    carrito.forEach(item => {
      const { cantidad, precio } = item;
      total += cantidad * precio;
    });

    totalCarrito.innerText = `Total: $${total}`;
  }

  function vaciarCarrito() {
    carrito = [];
    mostrarCarrito();
  }

  function borrarProducto(e) {
    if (e.target.classList.contains("borrar-producto")) {
      const productoABorrar = e.target.dataset.producto;
      carrito = carrito.filter(item => item.producto !== productoABorrar);
      mostrarCarrito();
    }
  }

  botonComprar.addEventListener("click", agregarProducto);
  listaCarrito.addEventListener("click", borrarProducto);
  botonVaciarCarrito.addEventListener("click", vaciarCarrito);

});