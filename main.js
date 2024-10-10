// Inicialización de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 60;
let timerInicial = 60;
let tiempoRegresivoId = null;

// Apuntando a elementos del documento HTML
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');
let botonRetornar = document.getElementById('retornar'); // Botón "Retornar"

// Generación de nombres de imágenes
let imagenes = [
    "oso1.jpg", "oso1.jpg",
    "oso2.jpg", "oso2.jpg",
    "oso3.jpg", "oso3.jpg",
    "oso4.jpg", "oso4.jpg",
    "oso5.jpg", "oso5.jpg",
    "oso6.jpg", "oso6.jpg",
    "oso7.jpg", "oso7.jpg",
    "oso8.jpg", "oso8.jpg"
];
imagenes = imagenes.sort(() => { return Math.random() - 0.5; });

// Funciones
function contarTiempo() {
    tiempoRegresivoId = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} Segundos`;
        if (timer == 0) {
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
            detenerAudioDeFondo(); // Detener el audio de fondo si el tiempo se acaba
        }
    }, 1000);
}

function bloquearTarjetas() {
    for (let i = 0; i <= 15; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.disabled = true;
        tarjetaBloqueada.innerHTML = `<img src="imgs/${imagenes[i]}" alt="imagen" style="width:80px; height:100px;">`;
    }
    mostrarBotonRetornar(); // Mostrar botón al bloquear las tarjetas
}

// Función para detener el audio de fondo
function detenerAudioDeFondo() {
    const backgroundSound = document.getElementById('backgroundSound');
    backgroundSound.pause();
    backgroundSound.currentTime = 0; // Reiniciar el audio
}

// Función principal
function destapar(id) {
    if (temporizador == false) {
        contarTiempo();
        temporizador = true;

        // Reproducir sonido de fondo en bucle cuando se destape la primera carta
        const backgroundSound = document.getElementById('backgroundSound');
        backgroundSound.play();
    }

    tarjetasDestapadas++;

    if (tarjetasDestapadas == 1) {
        // Reproducir sonido para la primera carta
        const firstCardSound = document.getElementById('firstCardSound');
        firstCardSound.play();

        // Mostrar primera imagen
        tarjeta1 = document.getElementById(id);
        primerResultado = imagenes[id];
        tarjeta1.innerHTML = `<img src="imgs/${primerResultado}" alt="imagen" style="width:100px; height:100px;">`;
        // Deshabilitar primera tarjeta
        tarjeta1.disabled = true;

    } else if (tarjetasDestapadas == 2) {
        // Mostrar segunda imagen
        tarjeta2 = document.getElementById(id);
        segundoResultado = imagenes[id];
        tarjeta2.innerHTML = `<img src="imgs/${segundoResultado}" alt="imagen" style="width:100px; height:100px;">`;
        // Deshabilitar segunda tarjeta
        tarjeta2.disabled = true;

        // Incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        // Sonido
        const correctSound = document.getElementById('correctSound');
        const incorrectSound = document.getElementById('incorrectSound');

        if (primerResultado == segundoResultado) {
            // Acierto
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
            correctSound.play(); // Reproducir sonido de acierto

            // Verificar si el juego ha terminado
            if (aciertos == 8) {
                clearInterval(tiempoRegresivoId);

                // Detener el sonido de fondo
                detenerAudioDeFondo();

                mostrarAciertos.innerHTML = `¡Aciertos: ${aciertos} 🫨!`;
                mostrarTiempo.innerHTML = `¡FANTÁSTICO! 😲 Demoraste ${timerInicial - timer} segundos`;
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 😎`;
                mostrarBotonRetornar(); // Mostrar el botón al completar el juego
            }

            tarjetasDestapadas = 0; // Reiniciar el contador de tarjetas destapadas

        } else {
            // Si no coinciden, ocultar nuevamente las imágenes
            incorrectSound.play(); // Reproducir sonido de error
            setTimeout(() => {
                tarjeta1.innerHTML = '?'; // Restablecer el signo de interrogación
                tarjeta2.innerHTML = '?'; // Restablecer el signo de interrogación
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            }, 1000);
        }
    }
}

// Función para mostrar el botón "Retornar"
function mostrarBotonRetornar() {
    botonRetornar.style.display = 'block'; // Mostrar el botón
}

// Función para retornar (reiniciar el juego o regresar)
function retornar() {
    location.reload(); // Recargar la página para reiniciar el juego
}
