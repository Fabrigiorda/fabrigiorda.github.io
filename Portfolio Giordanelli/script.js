const ventanasAbiertas = {};

document.querySelectorAll('.icono').forEach((btn, index) => {
  btn.addEventListener('click', () => {
    const idVentana = ['ventana-sobremi', 'ventana-proyectos', 'ventana-habilidades', 'ventana-experiencia'][index];
    if (!ventanasAbiertas[idVentana]) {
      const ventana = document.getElementById(idVentana);
      ventana.style.display = 'flex';
      ventana.classList.remove('abriendo');
      void ventana.offsetWidth; 
      ventana.classList.add('abriendo');
      ventanasAbiertas[idVentana] = true;
    }
  });
});

function cerrarVentana(id) {
  const ventana = document.getElementById(id);
  ventana.classList.remove('abriendo');
  ventana.classList.add('cerrando');
  
  setTimeout(() => {
    ventana.style.display = 'none';
    ventana.classList.remove('cerrando');
    ventanasAbiertas[id] = false;
  }, 300);
}

const pista = document.querySelector('.carrusel-pista');
const flechaIzq = document.querySelector('.flecha-izq');
const flechaDer = document.querySelector('.flecha-der');

if (pista && flechaIzq && flechaDer) {
    const cuadrados = pista.querySelectorAll('.cuadrados');
    const totalCuadrados = cuadrados.length;
    const anchoCuadrado = 260;
    const gap = 30;
    const cuadradosPorVista = 3;

    let indiceActual = 0;

    function actualizarCarrusel() {
        // Limita el índice para que nunca deje un espacio vacío a la derecha
        if (indiceActual > totalCuadrados - cuadradosPorVista) {
            indiceActual = 0;
        }
        if (indiceActual < 0) {
            indiceActual = totalCuadrados - cuadradosPorVista;
        }
        const desplazamiento = -(indiceActual * (anchoCuadrado + gap));
        pista.style.transform = `translateX(${desplazamiento}px)`;
    }

    function moverDerecha() {
        indiceActual += cuadradosPorVista;
        if (indiceActual > totalCuadrados - cuadradosPorVista) {
            indiceActual = 0;
        }
        actualizarCarrusel();
    }

    function moverIzquierda() {
        indiceActual -= cuadradosPorVista;
        if (indiceActual < 0) {
            indiceActual = totalCuadrados - cuadradosPorVista;
        }
        actualizarCarrusel();
    }

    flechaDer.addEventListener('click', moverDerecha);
    flechaIzq.addEventListener('click', moverIzquierda);

    actualizarCarrusel();

    document.addEventListener('keydown', (e) => {
        if (document.getElementById('ventana-proyectos').style.display === 'flex') {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                moverDerecha();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                moverIzquierda();
            }
        }
    });
}

// Agregar contenido a los cuadrados (ejemplo)
function agregarContenidoProyectos() {
    const cuadrados = document.querySelectorAll('.cuadrados');
    const proyectos = [
        { titulo: "Proyecto 1", descripcion: "Descripción del proyecto 1" },
        { titulo: "Proyecto 2", descripcion: "Descripción del proyecto 2" },
        { titulo: "Proyecto 3", descripcion: "Descripción del proyecto 3" },
        { titulo: "Proyecto 4", descripcion: "Descripción del proyecto 4" },
        { titulo: "Proyecto 5", descripcion: "Descripción del proyecto 5" },
        { titulo: "Proyecto 6", descripcion: "Descripción del proyecto 6" }
    ];

    cuadrados.forEach((cuadrado, index) => {
        if (index < proyectos.length) {
            const proyecto = proyectos[index];
            cuadrado.innerHTML = `
                <div>
                    <div class="proyecto-titulo">${proyecto.titulo}</div>
                    <div class="proyecto-descripcion">${proyecto.descripcion}</div>
                </div>
            `;
        }
    });
}