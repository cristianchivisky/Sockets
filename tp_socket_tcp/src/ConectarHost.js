const net = require('net');

const host = ''; // Reemplaza con el host al que deseas conectarte
const port = 80; // Puerto por defecto, puedes cambiarlo

const client = new net.Socket();

client.connect(port, host, () => {
  console.log(`Conectado a: ${client.remoteAddress}`);
  console.log(`Puerto: ${client.remotePort}`);
  // Realiza otras operaciones de envío y recepción de datos aquí si es necesario
  client.destroy(); // Cierra la conexión
});

client.on('error', (err) => {
  console.log(`Error de conexión: ${err.message}`);
});
