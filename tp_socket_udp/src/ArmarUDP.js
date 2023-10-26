const dgram = require('dgram');

if (process.argv.length !== 5) {
  console.log('Uso: node ArmarUDP.js HOST PUERTO DATOS');
  process.exit(1);
}

const host = process.argv[2];
const port = parseInt(process.argv[3]);
const datos = process.argv[4];

const client = dgram.createSocket('udp4');

const buffer = Buffer.from(datos);

const paqueteUDP = {
  address: host,
  port: port,
  buffer: buffer,
};

// Mostrar los datos del paquete
console.log('Paquete UDP:');
console.log('Direccion Internet: ' + paqueteUDP.address);
console.log('Datos como Buffer: ' + paqueteUDP.buffer.toString());
console.log('Longitud: ' + paqueteUDP.buffer.length);
console.log('Puerto: ' + paqueteUDP.port);

client.send(buffer, 0, buffer.length, port, host, (err) => {
  if (err) {
    console.error('Error al enviar el datagrama:', err);
  } else {
    console.log('Datagrama enviado con éxito.');
  }
  client.close();
});
