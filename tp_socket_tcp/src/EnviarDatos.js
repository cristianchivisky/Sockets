const net = require('net');
const readline = require('readline');

const host = 'ip_de_la_maquina_linux'; // Reemplaza con la dirección IP de tu máquina Linux
const port = 7; // Puerto 7 se utiliza para el protocolo "echo"

const client = new net.Socket();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

client.connect(port, host, () => {
  console.log(`Conectado a: ${host}`);
  console.log('Escribe tu mensaje (para salir, escribe "."):');
});

client.on('data', (data) => {
  console.log('Respuesta del servidor:');
  console.log(data.toString());
});

client.on('close', () => {
  console.log('Conexión cerrada');
  rl.close(); // Cierra la interfaz de lectura
});

client.on('error', (err) => {
  console.error(`Error de conexión: ${err.message}`);
  rl.close(); // Cierra la interfaz de lectura en caso de error
});

rl.on('line', (line) => {
  if (line === '.') {
    client.end(); // Cierra la conexión si se ingresa "."
  } else {
    client.write(line + '\n'); // Envía la línea al servidor
  }
});
