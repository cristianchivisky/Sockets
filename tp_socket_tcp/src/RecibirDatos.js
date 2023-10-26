const net = require('net');

const host = ''; // Reemplaza con la dirección IP de tu máquina 
const port = 13; // Puerto 13 se usa para el protocolo "daytime"

const client = new net.Socket();

client.connect(port, host, () => {
  console.log(`Conectado a: ${host}`);
});

client.on('data', (data) => {
  const timeData = data.toString();
  console.log(`Respuesta del servidor: ${timeData}`);
  client.end(); // Cierra la conexión después de recibir la respuesta
});

client.on('close', () => {
  console.log('Conexión cerrada');
});

client.on('error', (err) => {
  console.error(`Error de conexión: ${err.message}`);
});
