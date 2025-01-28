const socket = io();

const codeInput = document.getElementById('codeInput');
const joinRoomBtn = document.getElementById('joinRoomBtn');
const controls = document.getElementById('controls');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');

let code = null;
let lastClickTime = 0;
const clickDelay = 100; // Reducido a 100 ms para mayor rapidez

// Unirse a una sala con el código proporcionado
joinRoomBtn.addEventListener('click', () => {
    code = codeInput.value;
    if (code) {
    console.log(`Enviando solicitud para unirse a la sala: ${code}`);
    socket.emit('join-room', code);
    controls.style.display = 'block'; // Mostrar los controles
    }
});

// Enviar los movimientos dentro de la sala a la que te has unido
leftBtn.addEventListener('click', () => {
    const now = Date.now();
    if (now - lastClickTime > clickDelay) {
    lastClickTime = now;
    console.log('Enviando movimiento: izquierda');
    socket.emit('move', { code, direction: 'left' });
    }
});

rightBtn.addEventListener('click', () => {
    const now = Date.now();
    if (now - lastClickTime > clickDelay) {
    lastClickTime = now;
    console.log('Enviando movimiento: derecha');
    socket.emit('move', { code, direction: 'right' });
    }
});

// Mensaje cuando se conecte correctamente al servidor
socket.on('connect', () => {
    console.log('Conectado al servidor Socket.IO');
});