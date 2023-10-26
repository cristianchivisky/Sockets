const net = require('net');

if (process.argv.length !== 4) {
  console.log('Uso: node Cliente_msg.js <nombre_host_servidor> <puerto_servidor>');
  process.exit(1);
}

const host = process.argv[2];
const port = parseInt(process.argv[3]);

const client = new net.Socket();

client.connect(port, host, () => {
  console.log(`Conectado al servidor en ${host}:${port}`);
});

client.on('data', (data) => {
  console.log(`Datos recibidos del servidor:\n${data.toString()}`);
  client.end(); // Cierra la conexión después de recibir la respuesta
});

client.on('close', () => {
  console.log('Conexión cerrada');
});

client.on('error', (err) => {
  console.error(`Error de conexión: ${err.message}`);
});

client.on('end', () => {
  console.log('Conexión finalizada por el cliente');
});
