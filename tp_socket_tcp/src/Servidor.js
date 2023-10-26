const net = require('net');

// Obtén el puerto desde la línea de comandos o utiliza el puerto 7000 por defecto
const port = process.argv[2] || 7000;

const server = net.createServer((socket) => {
  console.log(`Cliente conectado desde: ${socket.remoteAddress}:${socket.remotePort}`);

  // Crea un stream de escritura para enviar un mensaje al cliente
  const writeStream = socket;
  writeStream.write('Se ha conectado al servidor\n');

  // Manejo de datos recibidos del cliente
  socket.on('data', (data) => {
    console.log(`Mensaje del cliente: ${data.toString()}`);
  });

  // Manejo de cierre de la conexión
  socket.on('end', () => {
    console.log('Cliente desconectado');
  });
});

// Manejo de errores del servidor
server.on('error', (err) => {
  console.error(`Error del servidor: ${err.message}`);
});

// Inicia el servidor en el puerto especificado
server.listen(port, () => {
  console.log(`Servidor atendiendo en el puerto ${port}`);
});
