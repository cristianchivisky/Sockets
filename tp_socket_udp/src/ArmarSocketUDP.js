const dgram = require('dgram');

const portLocal = 8080;
const remoteAddress = '127.0.0.1';
const remotePort = 8081;

const socket = dgram.createSocket('udp4');

// Configurar el tamaño del buffer de envío y recepción
const sendBufferSize = 800;
const receiveBufferSize = 800;
socket.setSendBufferSize(sendBufferSize);
socket.setReceiveBufferSize(receiveBufferSize);

// Activar el TimeOUT del socket a 1000 milisegundos
const timeout = 1000;
socket.setTimeout(timeout);

// Mostrar el estado del socket
console.log('Socket UDP creado y configurado:');
console.log('Puerto local:', portLocal);
console.log('Tamaño del buffer de envío:', socket.getSendBufferSize(), 'bytes');
console.log('Tamaño del buffer de recepción:', socket.getReceiveBufferSize(), 'bytes');
console.log('Timeout:', socket.getTimeout(), 'milisegundos');

// Cerrar el socket después de un tiempo para evitar que el programa se quede ejecutando indefinidamente
setTimeout(() => {
  socket.close(() => {
    console.log('Socket cerrado.');
  });
}, 5000); // Cerrar el socket después de 5 segundos
