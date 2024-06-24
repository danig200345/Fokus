// Seleccionar el elemento HTML y almacenarlo en la variable 'html'
const html = document.querySelector('html');

// Seleccionar todos los botones con la clase CSS '.app__card-button' y almacenarlos en una lista
const botones = document.querySelectorAll('.app__card-button');

// Asignar cada botón a una variable para facilitar su manipulación posterior
const botonEnfoque = botones[0];
const botonCorto = botones[1];
const botonLargo = botones[2];

// Seleccionar diferentes elementos del HTML para manipulación posterior
const banner = document.querySelector('.app__image');
const title = document.querySelector('.app__title');
const botonComenzar = document.querySelector('#start-pause');
const inputEnfoqueMusica = document.querySelector('#alternar-musica');
const textoIniciarPausar = document.querySelector('#start-puase span');
const iconoIniciarPausar = document.querySelector(".app__card-primary-butto-icon");
const tiempoEnPantalla = document.querySelector('#timer');

// Crear instancias de Audio para reproducir diferentes sonidos en la aplicación
const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
const audioPlay = new Audio('./sonidos/play.wav');
const audioPausa = new Audio('./sonidos/pause.mp3');
const audioTiempoFinalizado = new Audio('./sonidos/beep.mp3');

// Variables para controlar el tiempo y el estado del cronómetro
let tiempoTranscurridoEnSegundos = 1500;
let idIntervalo = null;
let cronometroIniciado = false;

// Configurar la música para reproducirse en bucle
musica.loop = true;

// Agregar un event listener para alternar la reproducción de música cuando se cambie el estado del input
inputEnfoqueMusica.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
});

// Agregar event listeners a los botones de enfoque, descanso corto y descanso largo
botonEnfoque.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 1500;
    cambiarContexto('enfoque');
    cambiarEstadoDelBoton(botonEnfoque);
    reiniciar();
});

botonCorto.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 300;
    cambiarContexto('descanso-corto');
    cambiarEstadoDelBoton(botonCorto);
    reiniciar();
});

botonLargo.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 900;
    cambiarContexto('descanso-largo');
    cambiarEstadoDelBoton(botonLargo);
    reiniciar();
});

// Función para cambiar el contexto de la aplicación y actualizar elementos HTML correspondientes
function cambiarContexto(contexto) {
    mostrarTiempo();
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagenes/${contexto}.png`);
    switch (contexto) {
        case "enfoque":
            title.innerHTML = 
            `<h1 class="app__title">
            Optimiza tu productividad,<br>
            <strong class="app__title-strong">sumérgete en lo que importa.</strong>
            </h1>`;
            break;
        case "descanso-corto":
            title.innerHTML = 
            `<h1 class="app__title">
            ¿Qué tal tomar un respiro?, <br>
            <strong class="app__title-strong">¡Haz una pausa corta!</strong>
            </h1>`;
            break;
        case "descanso-largo":
            title.innerHTML = 
            `<h1 class="app__title">
            Hora de volver a la superficie <br>
            <strong class="app__title-strong">Haz una pausa larga.</strong>
            </h1>`;
            break;
        default:
            break;
    }
}

// Función para cambiar el estado visual del botón activo
function cambiarEstadoDelBoton(botonActivo) {
    botones.forEach(boton => {
        boton.classList.remove('active');
    });
    botonActivo.classList.add('active');
}

// Función para manejar la cuenta regresiva del cronómetro
const cuentaRegresiva = () => {
    if(tiempoTranscurridoEnSegundos <= 0){
        audioTiempoFinalizado.play();
        alert('¡Tiempo finalizado!');
        reiniciar();
        return;
    }
    tiempoTranscurridoEnSegundos -= 1;
    mostrarTiempo();
};

// Event listener para el botón de iniciar/pausar
botonComenzar.addEventListener('click',iniciarOpausar);

// Función para iniciar o pausar el cronómetro
function iniciarOpausar() {
    if(idIntervalo){
        audioPausa.play();
        reiniciar();
        return;
    }
    audioPlay.play();
    idIntervalo = setInterval(cuentaRegresiva, 1000);
    textoIniciarPausar.textContent = "Pausar";
    iconoIniciarPausar.setAttribute('src', `/imagenes/pause.png`);
}

// Función para reiniciar el cronómetro
function reiniciar() {
    clearInterval(idIntervalo); 
    idIntervalo = null;
    textoIniciarPausar.textContent = "Comenzar";
    iconoIniciarPausar.setAttribute('src', `/imagenes/play_arrow.png`);
}

// Función para mostrar el tiempo restante en la pantalla
function mostrarTiempo() {
    const tiempo = new Date(tiempoTranscurridoEnSegundos * 1000);
    const tiempoFormateado = tiempo.toLocaleTimeString('es-ES', {minute: '2-digit', second: '2-digit'});
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`;
}

// Llamar a la función para mostrar el tiempo al inicio de la aplicación
mostrarTiempo();
