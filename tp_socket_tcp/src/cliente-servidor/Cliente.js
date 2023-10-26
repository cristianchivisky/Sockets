const net = require('net');
const readline = require('readline');

// Obtener el nombre del host y el puerto del servidor desde la línea de comandos
const host = process.argv[2] || 'localhost';
const port = parseInt(process.argv[3]) || 3000;

const client = new net.Socket();

// Establecer una interfaz de lectura para el cliente
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Conectar al servidor
client.connect(port, host, () => {
  console.log(`Conectado al servidor en ${host}:${port}`);
  console.log('Escribe tus mensajes (para salir, escribe "exit"):');
});

// Escuchar datos del servidor
client.on('data', (data) => {
  console.log(data.toString());
});

// Escuchar el cierre de la conexión
client.on('end', () => {
  console.log('Conexión cerrada');
  process.exit();
});

// Escuchar errores de conexión
client.on('error', (err) => {
  console.error(`Error de conexión: ${err.message}`);
  process.exit(1);
});

// Leer mensajes desde la línea de comandos y enviarlos al servidor
rl.on('line', (input) => {
  if (input === 'exit') {
    client.end();
  } else {
    client.write(input);
  }
});
