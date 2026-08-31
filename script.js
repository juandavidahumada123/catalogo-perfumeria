// 1. Año dinámico en el footer con querySelector
const spanAnio = document.querySelector('#span-anio');
if (spanAnio) {
    spanAnio.textContent = new Date().getFullYear();
}

// 2. Modelo de datos en memoria (Arreglo de objetos)
let perfumes = [
    { id: 1, nombre: "Bois Imperial (Nota Inicial)", precio: 180000, familia: "Amaderada", contacto: "ventas@esencias.com" }
];

// Selección de elementos del DOM
const formPerfume = document.querySelector('#form-perfume');
const inputNombre = document.querySelector('#input-nombre');
const inputPrecio = document.querySelector('#input-precio');
const selectFamilia = document.querySelector('#select-familia');
const inputContacto = document.querySelector('#input-contacto');
const contenedorPerfumes = document.querySelector('#contenedor-perfumes');

// Renderizar el elemento inicial de ejemplo al cargar la página
renderizarCatalogo();

// 3. Manejo de eventos: submit con preventDefault y validación básica
formPerfume.addEventListener('submit', function(evento) {
    evento.preventDefault(); // Evita que la página se recargue

    const nombreVal = inputNombre.value.trim();
    const precioVal = inputPrecio.value.trim();
    const familiaVal = selectFamilia.value;
    const contactoVal = inputContacto.value.trim();

    // Validación básica de campos vacíos
    if (nombreVal === "" || precioVal === "" || contactoVal === "") {
        alert("Por favor, completa todos los campos del formulario.");
        return;
    }

    // Crear el nuevo objeto perfume
    const nuevoPerfume = {
        id: Date.now(),
        nombre: nombreVal,
        precio: Number(precioVal),
        familia: familiaVal,
        contacto: contactoVal
    };

    // Agregar al modelo de datos en memoria
    perfumes.push(nuevoPerfume);

    // Limpiar formulario y enfocar el primer input
    formPerfume.reset();
    inputNombre.focus();

    // Actualizar la interfaz
    renderizarCatalogo();
});

// 4. Función que recorre el arreglo y genera elementos con createElement + appendChild
function renderizarCatalogo() {
    contenedorPerfumes.innerHTML = "";

    if (perfumes.length === 0) {
        contenedorPerfumes.innerHTML = "<p>No hay perfumes registrados en el catálogo.</p>";
        return;
    }

    perfumes.forEach(function(perfume) {
        // Crear elementos del DOM
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta-perfume');

        const infoDiv = document.createElement('div');

        const h3 = document.createElement('h3');
        h3.textContent = perfume.nombre;

        const pDetalles = document.createElement('p');
        pDetalles.textContent = `Familia: ${perfume.familia} | Precio: $${perfume.precio}`;
        pDetalles.style.fontSize = "0.9rem";

        const pContacto = document.createElement('p');
        pContacto.textContent = `Contacto: ${perfume.contacto}`;
        pContacto.style.fontSize = "0.8rem";
        pContacto.style.color = "#64748b";

        // Ensamblar la información usando appendChild
        infoDiv.appendChild(h3);
        infoDiv.appendChild(pDetalles);
        infoDiv.appendChild(pContacto);

        // Botón de eliminar
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = "Eliminar";

        // Evento click para eliminar del arreglo y actualizar la vista
        btnEliminar.addEventListener('click', function() {
            eliminarPerfume(perfume.id);
        });

        // Ensamblar tarjeta final
        tarjeta.appendChild(infoDiv);
        tarjeta.appendChild(btnEliminar);

        // Agregar al contenedor principal
        contenedorPerfumes.appendChild(tarjeta);
    });
}

// Función para eliminar perfume del arreglo
function eliminarPerfume(id) {
    perfumes = perfumes.filter(function(perfume) {
        return perfume.id !== id;
    });
    renderizarCatalogo();
}