// Escoger el mensaje de la estrella
function mensajeEstrella(id) {
    switch (id) {
        case 1: return "Tu sonrisa, siempre brillante como una estrella";
        case 2: return "Tu risa de tetera, única y contagiosa";
        case 3: return "Tus ojos color café que me miran con ternura (a veces con odio)";
        case 4: return "Tu forma de vestir que tanto me gusta";
        case 5: return "El cuidado que me dás cuando estoy enfermo";
        case 6: return "Las series que vemos juntos, compartiendo nuestras emociones y opiniones";
        case 7: return "La pasión que pones al apoyar mis hobbies";
        case 8: return "Tu capacidad de levantarme el ánimo";
        case 9: return "La media neurona que a veces compartimos y nos hace únicos";
        case 10: return "El tiempo que pasamos juntos, que hace brillar cada dia";
        case 11: return "Tu apoyo, que me ha convertido en quien soy";
        case 12: return "El ser mi mejor compañera de vida y viaje";
        case 13: return "Tu lealtad incondicional, siempre a mi lado";
        case 14: return "Tus abrazos que me envuelven y me dan paz";
        case 15: return "Tu sensibilidad, que ilumina mi vida y toca mi corazón";
        case 16: return "La emoción en tus ojos cuando hablas de algo que amas";
        case 17: return "Tu amor y cuidado por los animales, siempre tan compasivo";
        case 18: return "El permitirme ser yo mismo contigo (aunque a veces te ponga de los nervios)";
        case 19: return "La manera en que me haces sentir que todo es posible";
        case 20: return "La manera en que haces que hasta el silencio se sienta como hogar";
        default: return `ID ${id} no válido`;
    }
}


// Decrementar poco a poco el audio
function decrementarAudio(audio) {
    if (audio.volume > 0.0) {
        audio.volume = Math.max(0, audio.volume - 0.01); 
        if (audio.volume > 0) {
            setTimeout(() => decrementarAudio(audio), 150); // Llama recursivamente
        } 
        else {
            audio.pause();
            audio.currentTime = 0;
        }
    }
}

// Incrementar audio poco a poco
function incrementarAudio(audio, max_volume) {
    if (audio.volume < max_volume) {
        audio.volume += 0.04; 
        if (audio.volume < max_volume) {
            setTimeout(() => incrementarAudio(audio, max_volume), 350); // Llama recursivamente
        } 
    }
}

// Controlar el click de estrellas y activación del faro
document.addEventListener('DOMContentLoaded', function() {
    const mensaje = document.querySelector(".mensaje");
    const mensaje_span = mensaje.querySelector("span"); 
    const mensaje_p = mensaje.querySelector("p"); 

    const contadorElement = document.querySelector(".contador");
    const faro = document.querySelector(".faro")
    let contador = 0;

    // Marea y sonido de fondo
    const marea = document.getElementById("marea");
    marea.volume = 0.05; 
    marea.play();

    // Música de fondo
    const audio_fondo = document.getElementById("background-audio");
    audio_fondo.volume = 0.3; 
    audio_fondo.play();
    
    // Sonido al pulsar estrella
    const audio_estrella = new Audio('sounds/click_estrella2.mp3');

    
    document.querySelectorAll('.estrella').forEach(function(estrella) {
        estrella.addEventListener('click', function() {
            audio_estrella.currentTime = 0; // Reinicia el audio al inicio
            audio_estrella.play();

          
            // Actualiza el contador y controlar el mensaje
            if(this.classList.toggle('clicked')){
                contador++;

                // Borrar el mensaje si ya hay uno en pantalla
                if (mensaje.classList.contains("activado")) 
                    mensaje.classList.remove("activado");
                
                if (mensaje.classList.contains("complete")) 
                    mensaje.classList.remove("complete");
                        
                // Activar mensaje y cuando acabe su animación añadir el texto
                mensaje_span.textContent =  mensajeEstrella(parseInt(estrella.id));
                mensaje_p.textContent = parseInt(estrella.id);
                mensaje.classList.add("activado");
                
                mensaje.addEventListener('animationend', function() {
                    mensaje.classList.add('complete');
                });
            } 

            else {
                contador--;
                mensaje.classList.remove("activado");
                mensaje.classList.remove("complete");
            }

            // Actualiza el texto del contador en el HTML
            contadorElement.textContent = `${contador} / 21`;


            if (contador === 20) {
                // Borrar último mensaje
                setTimeout(function() {
                    mensaje.classList.remove("activado");
                    mensaje.classList.remove("complete");
                },8500 );


                //Decrementar progresivamente audio de fondo
                decrementarAudio(audio_fondo);

                audio_faro = document.getElementById("faro_audio");
                audio_faro.volume = 0;

                // Activa el sonido fin, faro y canción                
                setTimeout(function() {
                    audio_faro.volume = 0.03;
                    audio_faro.play();
                    incrementarAudio(audio_faro, 0.25);
                }, 5500 );

                setTimeout(function() { faro.classList.add('activado');}, 7500 );                                       
            }
        });
    });
});



