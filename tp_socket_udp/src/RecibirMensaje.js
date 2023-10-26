const dgram = require('dgram');
const MSSP = require('./MSSP'); // Asume que has definido la clase MSSP en un archivo MSSP.js

const server = dgram.createSocket('udp4');

const port = 80;

server.on('message', (message, rinfo) => {
  // Crear una instancia de MSSP a partir de los datos recibidos
  const msspReceived = new MSSP(message);

  console.log(`Mensaje recibido desde ${rinfo.address}:${rinfo.port}:`);
  console.log('ID:', msspReceived.getID());
  console.log('Secuencia:', msspReceived.getSecuencia());
  console.log('Mensaje:', msspReceived.getMensaje());
});

server.bind(port);
