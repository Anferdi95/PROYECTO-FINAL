// Formato de precios
const formatoPrecio = precio => new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
}).format(precio) + ' Pesos';

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function actualizarCarritoStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarCarrito() {
  const lista = document.getElementById("carritoItems");
  const totalTexto = document.getElementById("carritoTotal");
  lista.innerHTML = "";

  let total = 0;
  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${item.img}" alt="${item.producto}" style="width: 40px; height: 40px;">
      <div>
        <strong>${item.producto}</strong> - ${item.cantidad} unidad(es)<br>
        <button class="btn-sumar" data-index="${index}">+</button>
        <button class="btn-restar" data-index="${index}">-</button>
      </div>
    `;
    lista.appendChild(li);
    total += item.cantidad * item.precio;
  });

  totalTexto.textContent = `Total: ${formatoPrecio(total)}`;

  document.querySelectorAll(".btn-sumar").forEach(btn => {
    btn.addEventListener("click", e => {
      const index = parseInt(e.target.dataset.index);
      carrito[index].cantidad += 1;
      actualizarCarritoStorage();
      mostrarCarrito();
    });
  });

  document.querySelectorAll(".btn-restar").forEach(btn => {
    btn.addEventListener("click", e => {
      const index = parseInt(e.target.dataset.index);
      carrito[index].cantidad -= 1;
      if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
      }
      actualizarCarritoStorage();
      mostrarCarrito();
    });
  });
}

function buscarEnCarrito(nombre) {
  return carrito.find(item => item.producto === nombre);
}

// Mostrar sección y cargar productos según categoría
function mostrarInfo(servicio) {
  document.querySelectorAll('.info').forEach(section => {
    section.classList.remove('active');
  });

  const seccion = document.getElementById(servicio);
  seccion.classList.add('active');

  if (servicio === 'bandejas') {
    cargarProductos('bandejas', 'galeria');
  } else if (servicio === 'charcuteria') {
    cargarProductos('charcuteria', 'galeriachar');
  } else if (servicio === 'tablas') {
    cargarProductos('tablas', 'galeriatab');
  }
}

// Función para mostrar mensaje de éxito
function mostrarMensajeAgregado() {
  const mensaje = document.getElementById("mensajeAgregado");
  mensaje.style.display = "block";
  mensaje.style.opacity = "1";

  setTimeout(() => {
    mensaje.style.opacity = "0";
    setTimeout(() => mensaje.style.display = "none", 300);
  }, 1500);
}

// Cargar productos y añadir lógica a cada tarjeta
function cargarProductos(categoria, contenedorId) {
  fetch('../db/datos.json')
    .then(res => res.json())
    .then(data => {
      const contenedor = document.getElementById(contenedorId);
      contenedor.innerHTML = '';

      const productosFiltrados = data.filter(item =>
        item.habilidades.map(h => h.toLowerCase()).includes(categoria.toLowerCase())
      );

      if (productosFiltrados.length === 0) {
        contenedor.innerHTML = '<p>No hay productos disponibles para esta categoría.</p>';
        return;
      }

      productosFiltrados.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <h2 class="nombre">${item.nombre}</h2>
          <img class="imagenproducto" src="./${item.avatar.trim()}" alt="${item.nombre}" data-nombre="${item.nombre}">
          <p class="Precio">${formatoPrecio(item.Precio)}</p>
          <div class="clase">${item.habilidades.join(', ')}</div>
          <button class="boton_carrito">Añadir al carrito</button>
          <div class="botones-cantidad">
            <button class="btn btn-restar">-1</button>
            <span class="cantidad">0</span>
            <button class="btn btn-agregar">+1</button>
          </div>
        `;

        let cantidad = 0;
        const cantidadEl = card.querySelector('.cantidad');
        const btnAgregar = card.querySelector('.btn-agregar');
        const btnRestar = card.querySelector('.btn-restar');
        const btnCarrito = card.querySelector('.boton_carrito');

        btnAgregar.addEventListener("click", () => {
          cantidad++;
          cantidadEl.textContent = cantidad;
        });

        btnRestar.addEventListener("click", () => {
          if (cantidad > 0) {
            cantidad--;
            cantidadEl.textContent = cantidad;
          }
        });

        btnCarrito.addEventListener("click", () => {
          if (cantidad === 0) {
            alert("Selecciona una cantidad antes de añadir al carrito.");
            return;
          }

          const existente = buscarEnCarrito(item.nombre);
          if (existente) {
            existente.cantidad += cantidad;
          } else {
            carrito.push({
              producto: item.nombre,
              cantidad,
              precio: item.Precio,
              img: `./${item.avatar.trim()}`
            });
          }

          cantidad = 0;
          cantidadEl.textContent = cantidad;
          actualizarCarritoStorage();
          mostrarCarrito();
          mostrarMensajeAgregado(); // ← Aquí se muestra el mensaje
        });

        contenedor.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error al cargar el catálogo:', error);
      const contenedor = document.getElementById(contenedorId);
      contenedor.innerHTML = "<p>No se pudo cargar el catálogo.</p>";
    });
}

// Eventos iniciales
document.addEventListener('DOMContentLoaded', () => {
  mostrarInfo('bandejas'); // Cargar bandejas 
  mostrarCarrito();
});

document.getElementById("vaciar").addEventListener("click", () => {
  carrito.length = 0;
  actualizarCarritoStorage();
  mostrarCarrito();
});

document.getElementById("toggleCarrito").addEventListener("click", () => {
  const carritoDiv = document.getElementById("carritoDiv");
  carritoDiv.classList.toggle("activo");
});


localStorage.setItem("carrito", JSON.stringify(carrito));
const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];

