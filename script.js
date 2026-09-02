const perfumes = [
    {
        id: 1,
        nombre: "Afnan 9PM",
        precio: 120000,
        imagen: "9pm.jpeg"
    },
    {
        id: 2,
        nombre: "Lattafa Khamrah",
        precio: 120000,
        imagen: "khamrah.jpeg"
    },
    {
        id: 3,
        nombre: "JPG Le Male Le Parfum",
        precio: 120000,
        imagen: "jeanpaul.jpeg"
    },
    {
        id: 4,
        nombre: "Dior Sauvage",
        precio: 120000,
        imagen: "sauvage.jpeg"
    },
    {
        id: 5,
        nombre: "Lattafa Asad",
        precio: 120000,
        imagen: "asad.jpeg"
    }
];

let carrito = [];

const contenedorTarjetas = document.getElementById('contenedor-tarjetas');
const contadorCarrito = document.getElementById('contador-carrito');
const carritoIcono = document.getElementById('carrito-icono');
const modalCarrito = document.getElementById('modal-carrito');
const cerrarCarrito = document.getElementById('cerrar-carrito');
const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total-carrito');
const formContacto = document.getElementById('form-contacto');

function cargarCatalogo() {
    contenedorTarjetas.innerHTML = "";
    
    perfumes.forEach(perfume => {
        const card = document.createElement('div');
        card.classList.add('card');

        const img = document.createElement('img');
        img.src = perfume.imagen;
        img.alt = perfume.nombre;

        const h3 = document.createElement('h3');
        h3.textContent = perfume.nombre;

        const p = document.createElement('p');
        p.textContent = `$${perfume.precio.toLocaleString('es-CO')}`;

        const btn = document.createElement('button');
        btn.classList.add('btn-agregar');
        btn.textContent = "Agregar al Carrito";
        
        btn.addEventListener('click', () => {
            agregarAlCarrito(perfume);
        });

        card.appendChild(img);
        card.appendChild(h3);
        card.appendChild(p);
        card.appendChild(btn);

        contenedorTarjetas.appendChild(card);
    });
}

function agregarAlCarrito(perfume) {
    carrito.push(perfume);
    actualizarCarrito();
}

function actualizarCarrito() {
    contadorCarrito.textContent = carrito.length;
    
    listaCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = `${item.nombre} -$${item.precio.toLocaleString('es-CO')}`;
        listaCarrito.appendChild(li);
        total += item.precio;
    });

    totalCarrito.textContent = `Total: $${total.toLocaleString('es-CO')}`;
}

carritoIcono.addEventListener('click', () => {
    modalCarrito.classList.remove('oculto');
});

cerrarCarrito.addEventListener('click', () => {
    modalCarrito.classList.add('oculto');
});

// Validación del formulario con preventDefault
if (formContacto) {
    formContacto.addEventListener('submit', (evento) => {
        evento.preventDefault();
        
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        
        if (nombre === "" || email === "") {
            alert("Por favor completa los campos obligatorios.");
            return;
        }

        alert(`¡Gracias por tu mensaje, ${nombre}! Nos pondremos en contacto pronto.`);
        formContacto.reset();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    cargarCatalogo();
});