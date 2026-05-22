import './style.css';

// ==========================================
// 1. VARIABLES DEL ESTADO DEL JUEGO
// ==========================================
let numeroSecreto = Math.floor(Math.random() * 1000) + 1;
let intentosRestantes = 10;
const historialNumeros = [];

// Para desarrollo/pruebas (puedes ver el número en la consola del navegador)
console.log("Número secreto inicial:", numeroSecreto);

// ==========================================
// 2. ELEMENTOS DEL DOM (HTML)
// ==========================================
const inputNumero = document.getElementById('numero');
const botonAdivinar = document.getElementById('adivinar');
const botonReiniciar = document.getElementById('reiniciar');
const mensaje = document.getElementById('mensaje');
const contadorVidas = document.getElementById('vidas');
const contenedorHistorial = document.getElementById('historial');

// ==========================================
// 3. LOGICA PRINCIPAL (EVENTO ADIVINAR)
// ==========================================
botonAdivinar.addEventListener('click', () => {
    const numeroJugador = parseInt(inputNumero.value);

    // Validación de entrada
    if (isNaN(numeroJugador) || numeroJugador < 1 || numeroJugador > 1000) {
        mensaje.textContent = '❌ Por favor, ingresa un número válido entre 1 y 1000.';
        mensaje.style.color = '#ff4d4d'; // Color rojo de advertencia
        return; // Detiene la ejecución si los datos están mal
    }

    // Si la entrada es válida, restamos una vida
    intentosRestantes--;
    contadorVidas.textContent = `Vidas restantes: ${intentosRestantes} ❤️`;

    // Agregar el número probado al historial
    historialNumeros.push(numeroJugador);
    contenedorHistorial.textContent = `Números probados: ${historialNumeros.join(', ')}`;

    // Evaluamos las condiciones del juego
    if (numeroJugador === numeroSecreto) {
        mensaje.textContent = `🏆 ¡Felicidades! ¡Adivinaste el número secreto (${numeroSecreto})!`;
        mensaje.style.color = '#4caf50'; // Verde ganador
        finalizarJuego();
    } 
    else if (intentosRestantes === 0) {
        mensaje.textContent = `💥 ¡Perdiste! Te quedaste sin vidas. El número era el ${numeroSecreto}.`;
        mensaje.style.color = '#ff4d4d';
        finalizarJuego();
    } 
    else if (numeroJugador < numeroSecreto) {
        mensaje.textContent = '🔼 El número secreto es más alto.';
        mensaje.style.color = '#ff9800'; // Naranja descriptivo
    } 
    else {
        mensaje.textContent = '🔽 El número secreto es más bajo.';
        mensaje.style.color = '#ff9800';
    }

    // Limpiamos el input automáticamente para el siguiente tiro
    inputNumero.value = '';
    inputNumero.focus(); // Devuelve el cursor al cuadro de texto
});

// ==========================================
// 4. FUNCIONES DE CONTROL (REINICIAR Y FINALIZAR)
// ==========================================

function finalizarJuego() {
    botonAdivinar.disabled = true;       // Bloquea el botón de adivinar
    inputNumero.disabled = true;         // Bloquea la caja de texto
    botonReiniciar.style.display = 'block'; // Muestra el botón de reiniciar
}

function reiniciarJuego() {
    // Re-calcular un nuevo número aleatorio
    numeroSecreto = Math.floor(Math.random() * 1000) + 1;
    console.log("Nuevo número secreto:", numeroSecreto);

    // Resetear variables de estado
    intentosRestantes = 10;
    historialNumeros.length = 0; // Vacía el arreglo del historial

    // Resetear la interfaz gráfica (HTML)
    mensaje.textContent = '¡Juego reiniciado! Empieza a adivinar.';
    mensaje.style.color = '#ffffff';
    contadorVidas.textContent = `Vidas restantes: ${intentosRestantes} ❤️`;
    contenedorHistorial.textContent = 'Números probados: Ninguno todavía';
    
    inputNumero.value = '';
    botonAdivinar.disabled = false;
    inputNumero.disabled = false;
    botonReiniciar.style.display = 'none'; 
    inputNumero.focus();
}


botonReiniciar.addEventListener('click', reiniciarJuego);