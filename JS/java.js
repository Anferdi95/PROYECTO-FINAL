document.addEventListener('DOMContentLoaded', function() {
    // Array para almacenar los productos
    let productos = [];
    let productosAleatorios = [];

    // Función para cargar el JSON
    fetch('./db/datos.json')
        .then(response => response.json())
        .then(data => {
            productos = data; // Guardamos los productos
            productosAleatorios = mezclarArray([...productos]); // Mezclamos todos los productos al inicio
            mostrarProductos(); // Mostramos todos los productos aleatorios al inicio
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

    // Función para mezclar productos aleatorios
    function mezclarArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Intercambiar elementos
        }
        return array;
    }

    // Función para mostrar productos
    function mostrarProductos() {
        // Limpiamos el contenedor
        const contenedor = document.querySelector('.cards-container');
        
        // Verificamos si el contenedor existe
        if (contenedor) {
            contenedor.innerHTML = '';

            // Mostramos los productos seleccionados
            productosAleatorios.forEach(producto => {
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
            // Rotar los productos hacia la izquierda
            productosAleatorios.push(productosAleatorios.shift());
        } else if (direccion === "derecha") {
            // Rotar los productos hacia la derecha
            productosAleatorios.unshift(productosAleatorios.pop());
        }

        // Mostrar los nuevos productos
        mostrarProductos();
    }

    // Mostrar los productos aleatorios al cargar
    mostrarProductos();

    // Menú de navegación móvil
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
      
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
});
