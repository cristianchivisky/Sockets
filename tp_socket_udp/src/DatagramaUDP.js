const dgram = require('dgram');

const host = 'www.google.com';
const port = 80;
const message = 'estos son los datos del datagrama';

const client = dgram.createSocket('udp4');

const buffer = Buffer.from(message, 'utf8');

client.send(buffer, 0, buffer.length, port, host, (err) => {
  if (err) {
    console.error('Error al enviar el datagrama:', err);
  } else {
    console.log('Datagrama enviado con éxito.');
  }
  client.close();
});
