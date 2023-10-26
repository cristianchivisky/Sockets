const dgram = require('dgram');
//Agregué aca la clase MSSP porque no me la importaba

class MSSP {
  constructor(id_mensaje, secuencia, mensaje) {
      this.id_msn = id_mensaje;
      this.sec_msn = secuencia;
      this.msn = mensaje;
  }

  // Métodos get y set para el ID
  getID() {
      return this.id_msn;
  }

  setID(id) {
      this.id_msn = id;
  }

  // Métodos get y set para el número de secuencia
  getSecuencia() {
      return this.sec_msn;
  }

  setSecuencia(secuencia) {
      this.sec_msn = secuencia;
  }

  // Métodos get y set para el mensaje
  getMensaje() {
      return this.msn;
  }

  setMensaje(mensaje) {
      this.msn = mensaje;
  }

  // Método para obtener el MSSP como un array de bytes
  getArrayBytes() {
      const msn_by = Buffer.from(this.msn, 'utf8');
      const proto = Buffer.alloc(52);
      proto.writeUInt8(this.id_msn, 0);
      proto.writeUInt8(this.sec_msn, 1);
      msn_by.copy(proto, 2);
      return proto;
  }
}
const client = dgram.createSocket('udp4');

const host = 'LocalHost'; // Cambia esto por la dirección del host de destino
const port = 80; // Cambia esto por el puerto de destino

// Crear una instancia de MSSP con ID 8, secuencia 1 y un mensaje
const mssp5 = new MSSP(8, 4, 'Mensaje parte 10');

// Obtener el paquete MSSP como un array de bytes
const buffer = mssp5.getArrayBytes();

client.send(buffer, 0, buffer.length, port, host, (err) => {
  if (err) {
    console.error('Error al enviar el datagrama:', err);
  } else {
    console.log('Datagrama enviado con éxito.');
  }
  client.close();
});

