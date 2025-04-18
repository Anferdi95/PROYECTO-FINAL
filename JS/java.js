document.addEventListener('DOMContentLoaded', function() {
    // Array para almacenar los productos
    let productos = [];
    let productosVisible = [];
    let productosPorPagina = 3; // Número de productos a mostrar por página
    let indiceProducto = 0; // Índice del primer producto que se muestra

    // Función para cargar el JSON
    fetch('./db/datos.json')
        .then(response => response.json())
        .then(data => {
            productos = data; // Guardamos los productos
            mostrarProductos(); // Mostramos los productos al inicio
        })
        .catch(error => {
            console.error('Error cargando el JSON:', error);
        });

    // Función para formatear el precio en pesos colombianos
    function formatoPrecio(precio) {
        const formato = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0 // Evita los decimales si no los necesitas
        });
        return formato.format(precio);
    }

    // Función para mostrar productos
    function mostrarProductos() {
        // Limpiamos el contenedor
        const contenedor = document.querySelector('.cards-container');
        
        // Verificamos si el contenedor existe
        if (contenedor) {
            contenedor.innerHTML = '';

            // Seleccionamos los productos a mostrar basados en el índice
            productosVisible = productos.slice(indiceProducto, indiceProducto + productosPorPagina);

            // Si el número de productos restantes es menor que el límite de productos por página, agregamos los primeros productos del array para completar
            if (productosVisible.length < productosPorPagina) {
                productosVisible = productosVisible.concat(productos.slice(0, productosPorPagina - productosVisible.length));
            }

            // Mostramos los productos seleccionados
            productosVisible.forEach(producto => {
                const div = document.createElement('div');
                div.classList.add('card');
                
                div.innerHTML = `
                    <img src="${producto.avatar2}" alt="${producto.nombre}" class="imagenproducto">
                    <h3 class="nombre">${producto.nombre}</h3>
                    <p class="Precio">${formatoPrecio(producto.Precio)}</p>
                    <p class="clase">${producto.habilidades}</p>
                    <button class="boton_carrito">Añadir al carrito</button>
                `;
                
                contenedor.appendChild(div);
            });
        } else {
            console.error('Contenedor con id "muestras" no encontrado.');
        }
    }

    // Event listeners para las flechas
    document.getElementById('flecha-izquierda').addEventListener('click', () => {
        alternarProductos("izquierda");
    });

    document.getElementById('flecha-derecha').addEventListener('click', () => {
        alternarProductos("derecha");
    });

    // Función para alternar los productos cuando se hace clic en las flechas
    function alternarProductos(direccion) {
        if (direccion === "izquierda") {
            // Desplazar el índice hacia atrás y mostrar los productos anteriores
            indiceProducto = (indiceProducto - productosPorPagina + productos.length) % productos.length;
        } else if (direccion === "derecha") {
            // Desplazar el índice hacia adelante y mostrar los siguientes productos
            indiceProducto = (indiceProducto + productosPorPagina) % productos.length;
        }

        // Mostrar los nuevos productos
        mostrarProductos();
    }
});