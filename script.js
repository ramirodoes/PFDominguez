(function() {
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
    const imagenProducto = selectProducto.options[selectProducto.selectedIndex].getAttribute('data-imagen');
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
    Swal.fire({
      title: 'Producto agregado al carrito',
      text: `${cantidadElegida} x ${productoElegido}`,
      icon: 'success',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        mostrarCarrito();
      }
    });    
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
        <td><img src="img/${producto}.jpg" alt="${producto}" width="50"></td>
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
    if (carrito.length === 0) {
      Swal.fire({
        title: 'El carrito ya está vacío',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    } else {
      Swal.fire({
        title: '¿Está seguro de que desea vaciar el carrito?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, vaciar carrito',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          carrito = [];
          mostrarCarrito();
          Swal.fire({
            title: 'Carrito vaciado',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        }
      });
    }
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

fetch('datos.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);

    const nombreProducto = data.producto1.nombre;
    const precioProducto = data.producto1.precio;

    console.log(nombreProducto);
    console.log(precioProducto);
  })
  .catch(error => {
    console.error('Error al cargar el archivo JSON:', error);
  });
})();