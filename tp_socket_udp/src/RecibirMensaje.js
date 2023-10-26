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

const server = dgram.createSocket('udp4');

const port = 80;

server.on('message', (message, rinfo) => {
  // Crear una instancia de MSSP a partir de los datos recibidos
  const msspReceived = new MSSP(message);

  console.log(`Mensaje recibido desde ${rinfo.address}:${rinfo.port}:`);
  console.log('ID:', msspReceived.getID());
  console.log('Secuencia:', msspReceived.getSecuencia());
  console.log('Mensaje:', msspReceived.getMensaje());
});

server.bind(port);
