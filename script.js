const ventanasAbiertas = {};
const infosAbiertas = {};

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
    infosAbiertas = false;
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





document.querySelectorAll('.boton-repo.info').forEach((btn, index) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation(); 
    const IdInfo = ['ventanaInfo-portfolio', 'ventanaInfo-calculadora', 'ventanaInfo-preguntados', 'ventanaInfo-space', 'ventanaInfo-photoshop'][index];
    if (!infosAbiertas[IdInfo]) {
      const ventana_info = document.getElementById(IdInfo);
      ventana_info.style.display = 'block';
      ventana_info.classList.remove('abriendo');
      void ventana_info.offsetWidth; 
      ventana_info.classList.add('abriendo');
      infosAbiertas[IdInfo] = true;
    }
  });
});

function cerrarVentanaInfo(id) {
  const ventana_info = document.getElementById(id);
  ventana_info.classList.remove('abriendo');
  setTimeout(() => {
    ventana_info.style.display = 'none';
    infosAbiertas[id] = false;
  }, 300);
}


document.addEventListener('click', (e) => {
  const ventanasInfo = document.querySelectorAll('[id^="ventanaInfo-"]');
  ventanasInfo.forEach(ventana => {
    if (ventana.style.display === 'block') {
      if (!ventana.contains(e.target) && !e.target.classList.contains('info')) {
        e.stopPropagation();
        cerrarVentanaInfo(ventana.id);
      }
    }
  });
});


