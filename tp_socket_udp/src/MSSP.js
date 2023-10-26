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

// Crear tres instancias de MSSP con números de secuencia consecutivos
const mssp1 = new MSSP(8, 1, 'Mensaje parte 1');
const mssp2 = new MSSP(8, 2, 'Mensaje parte 2');
const mssp3 = new MSSP(8, 3, 'Mensaje parte 3');

// Mostrar los campos de los tres protocolos MSSP
console.log('MSSP 1 - ID:', mssp1.getID(), 'Secuencia:', mssp1.getSecuencia(), 'Mensaje:', mssp1.getMensaje());
console.log('MSSP 2 - ID:', mssp2.getID(), 'Secuencia:', mssp2.getSecuencia(), 'Mensaje:', mssp2.getMensaje());
console.log('MSSP 3 - ID:', mssp3.getID(), 'Secuencia:', mssp3.getSecuencia(), 'Mensaje:', mssp3.getMensaje());
