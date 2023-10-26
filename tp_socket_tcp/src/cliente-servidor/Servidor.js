const net = require('net');

// Almacenar las conexiones de los clientes
const clients = [];

// Crear un servidor
const server = net.createServer((socket) => {
  console.log(`Cliente conectado: ${socket.remoteAddress}:${socket.remotePort}`);

  // Agregar el cliente a la lista
  clients.push(socket);

  // Escuchar los datos del cliente
  socket.on('data', (data) => {
    const message = data.toString();
    console.log(`Mensaje recibido: ${message}`);

    // Reenviar el mensaje a todos los clientes conectados
    clients.forEach((client) => {
      if (client !== socket) {
        client.write(`Cliente ${socket.remoteAddress}:${socket.remotePort}: ${message}`);
      }
    });
  });

  // Manejar el cierre de la conexión
  socket.on('end', () => {
    console.log(`Cliente desconectado: ${socket.remoteAddress}:${socket.remotePort}`);
    // Eliminar el cliente de la lista
    const index = clients.indexOf(socket);
    if (index !== -1) {
      clients.splice(index, 1);
    }
  });
});

// Escuchar en un puerto específico
const port = 3000; // Puedes cambiar el puerto
server.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
