
    fetch('../db/products.json')  // Asegúrate de que la ruta sea correcta
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById('productos-container');

        data.forEach(productoData => {
          const producto = productoData.producto;
          const card = document.createElement('div');
          card.classList.add('card');

          // Asignar la clase correcta según el tipo de producto
          let productoClase = '';
          if (producto.habilidades.includes("Bandejas")) {
            productoClase = 'Bandeja';
          } else if (producto.habilidades.includes("Charcutería")) {
            productoClase = 'Charcutería';
          } else if (producto.habilidades.includes("Tabla")) {
            productoClase = 'Tabla';
          }

          card.innerHTML = `
            <div class="clase">${productoClase}</div>
            <div class="imagen-container">
              <div class="titulo">${producto.nombre}</div>
              <img class="imagenproducto" src="${producto.avatar}" alt="${producto.nombre}">
              <div class="info-inferior">
                <div><strong>Ideal para:</strong> ${producto.descripcion}</div>
                <div><strong>Precio:</strong> $${producto.Precio}</div>
                <button class="boton">Añadir al carrito</button>
              </div>
            </div>
            <div class="contenido">
              <h3 class="subtitulo">Detalles</h3>
              <div class="fila">
                <div class="columna">
                  <h4>Carnes</h4>
                  <ul>
                    ${producto.carnes.map(carne => `<li>${carne}</li>`).join('')}
                  </ul>
                </div>
                <div class="columna">
                  <h4>Quesos</h4>
                  <ul>
                    ${producto.quesos.map(queso => `<li>${queso}</li>`).join('')}
                  </ul>
                </div>
              </div>

              <!-- Aquí añadimos las frutas y complementos -->
              <div class="fila">
                <div class="columna">
                  <h4>Frutas</h4>
                  <ul>
                    ${producto.frutas.map(fruta => `<li>${fruta}</li>`).join('')}
                  </ul>
                </div>
                <div class="columna">
                  <h4>Complementos</h4>
                  <ul>
                    ${producto.complementos.map(complemento => `<li>${complemento}</li>`).join('')}
                  </ul>
                </div>
              </div>
            </div>
          `;

          container.appendChild(card);
        });
      })
      .catch(error => {
        console.error('Error cargando el JSON:', error);
      });
 