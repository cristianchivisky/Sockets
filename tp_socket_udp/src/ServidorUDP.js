const dgram = require('dgram');

const port = 80;

const server = dgram.createSocket('udp4');

server.on('message', (message, rinfo) => {
  // Convierte los datos recibidos a una cadena de texto (String)
  const dataString = message.toString('utf8');
  
  console.log(`Datos recibidos desde ${rinfo.address}:${rinfo.port}: ${dataString}`);
});

server.on('listening', () => {
  const address = server.address();
  console.log(`Servidor UDP escuchando en ${address.address}:${address.port}`);
});

server.bind(port);
