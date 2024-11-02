const fondo = document.getElementById("suspense");
fondo.volume = 0.5;
fondo.pause();
//fondo.play(); 

const reloj = new Audio('reloj.mp3');
reloj.volume = 0.2;
reloj.pause();

// Estado inicial del audio
let isMuted = true;

// Evento para manejar el clic en la imagen
const sound_icons = document.getElementsByClassName('sound');
const sound_icon = sound_icons[0]; // Cambia esto para acceder al primer elemento

// Evento para manejar el clic en la imagen
sound_icon.addEventListener('click', () => {
    isMuted = false;

    fondo.play(); // Reproduce el audio
    sound_icon.src = 'sound.png'; // Cambia la imagen a 'muted.png'
    sound_icon.style.opacity = "0"; // Cambia la opacidad a 0 para desvanecer

    let contenedor_contador = document.querySelector(".container_contador");
    contenedor_contador.style.filter = "none"; 
});


const DATE_TARGET = new Date('2024-11-15 00:01:00'); 
//const DATE_TARGET = new Date('2023-11-15 00:01:00'); 

// DOM for render
const DAYS = document.getElementById ('days');
const HOURS = document.getElementById('hours');
const MINUTES = document.getElementById('minutes');
const SECONDS = document.getElementById('seconds');
const CONTINUAR_SECTION = document.querySelector('.continuar'); // Selecciona la sección

// Milliseconds for the calculations
const MILLISECONDS_OF_A_SECOND = 1000;
const MILLISECONDS_OF_A_MINUTE = MILLISECONDS_OF_A_SECOND * 60;
const MILLISECONDS_OF_A_HOUR = MILLISECONDS_OF_A_MINUTE * 60;
const MILLISECONDS_OF_A_DAY = MILLISECONDS_OF_A_HOUR * 24

let DURATION;
/**
 * Method that updates the countdown and the sample
 */
function updateCountdown() {
    // Calcs
    const NOW = new Date()
    DURATION = DATE_TARGET - NOW;

     // Comprobación para ver si el tiempo ha llegado a cero
     if (DURATION <= 0) {
        // Muestra la sección para continuar
        CONTINUAR_SECTION.style.display = 'block'; // Muestra la sección

        // Limpia los contadores
        DAYS.textContent = 0;
        HOURS.textContent = 0;
        MINUTES.textContent = 0;
        SECONDS.textContent = 0;
        clearInterval();
    }

    else{
        if(!isMuted){reloj.play();}
        else{reloj.pause();}

       DAYS.textContent = Math.floor(DURATION / MILLISECONDS_OF_A_DAY);
        HOURS.textContent = Math.floor((DURATION % MILLISECONDS_OF_A_DAY) / MILLISECONDS_OF_A_HOUR);
        MINUTES.textContent = Math.floor((DURATION % MILLISECONDS_OF_A_HOUR) / MILLISECONDS_OF_A_MINUTE);
        SECONDS.textContent = Math.floor((DURATION % MILLISECONDS_OF_A_MINUTE) / MILLISECONDS_OF_A_SECOND);
    }
}

// Inicia el intervalo
intervalId = setInterval(updateCountdown, MILLISECONDS_OF_A_SECOND);
updateCountdown(); // Llama a la función una vez para inicializar los valores







