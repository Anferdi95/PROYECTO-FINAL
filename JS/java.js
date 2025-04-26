document.addEventListener('DOMContentLoaded', function() {
    // lista de productos
    let productos = [];
    let productosVisible = [];
    let productosPorPagina = 3; // cuantos se ven a la vez
    let indiceProducto = 0;

    // carga los datos del archivo json
    fetch('./db/datos.json')
        .then(response => response.json())
        .then(data => {
            productos = data; // guarda los productos
            mostrarProductos(); // los muestra al iniciar
        })
        .catch(error => {
            console.error('error cargando el json:', error);
        });

    // pone el precio en formato colombiano
    function formatoPrecio(precio) {
        const formato = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        });
        return formato.format(precio);
    }

    // muestra los productos en pantalla
    function mostrarProductos() {
        const contenedor = document.querySelector('.cards-container');
        
        // revisa que el contenedor exista
        if (contenedor) {
            contenedor.innerHTML = '';

            // corta el array segun el indice actual
            productosVisible = productos.slice(indiceProducto, indiceProducto + productosPorPagina);

            // si faltan productos, suma desde el principio
            if (productosVisible.length < productosPorPagina) {
                productosVisible = productosVisible.concat(productos.slice(0, productosPorPagina - productosVisible.length));
            }

            // crea las tarjetas de productos
            productosVisible.forEach(producto => {
                const div = document.createElement('div');
                div.classList.add('card');
                
                div.innerHTML = `
                    <img src="${producto.avatar2}" alt="${producto.nombre}" class="imagenproducto">
                    <h3 class="nombre">${producto.nombre}</h3>
                    <p class="Precio">${formatoPrecio(producto.Precio)}</p>
                    <p class="clase">${producto.habilidades}</p>
                    <a href="./html/servicios.html" target="_blank" class="boton_carrito">IR</a>`
                    ;
                
                contenedor.appendChild(div);
            });
        } else {
            console.error('contenedor con id "muestras" no encontrado.');
        }
    }

    // click en flecha izquierda
    document.getElementById('flecha-izquierda').addEventListener('click', () => {
        alternarProductos("izquierda");
    });

    // click en flecha derecha
    document.getElementById('flecha-derecha').addEventListener('click', () => {
        alternarProductos("derecha");
    });

    // cambia los productos segun la direccion
    function alternarProductos(direccion) {
        if (direccion === "izquierda") {
            indiceProducto = (indiceProducto - productosPorPagina + productos.length) % productos.length;
        } else if (direccion === "derecha") {
            indiceProducto = (indiceProducto + productosPorPagina) % productos.length;
        }

        mostrarProductos();
    }
});

// muestra u oculta el carrito al hacer click
document.addEventListener("DOMContentLoaded", () => {
    const toggleCarrito = document.getElementById("toggleCarrito");
    const carritoDiv = document.getElementById("carritoDiv");
  
    if (toggleCarrito && carritoDiv) {
        toggleCarrito.addEventListener("click", () => {
            const isVisible = carritoDiv.style.display === "block";
            carritoDiv.style.display = isVisible ? "none" : "block";
        });
    }
});


