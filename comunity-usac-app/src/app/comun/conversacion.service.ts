import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

export class ConversacionService {
    private url = 'http://localhost:3000';
    private socket;    

    constructor() {
        this.socket = io(this.url);
    }

    public enviarMensaje(mensaje){
        this.socket.emit('nuevo-mensaje', mensaje);
    }

    public obtenerMensajes = () => {
        return Observable.create((observer) => {
            this.socket.on('nuevo-mensaje', (message) => {
                observer.next(message);
            });
        });
    }

    public conectar(data){
        this.socket.emit('conectar', data);
    }

    public desconectar(registro){
        this.socket.emit('desconectar', { registro: registro });
    }

    public solicitadConectados(){
        this.socket.emit('solicitadConectados');
    }

    public obtenerConectados = () => {
        return Observable.create((observer) => {
            this.socket.on('conectar', (conectados) => {
                observer.next(conectados);
            });
            this.socket.on('desconectar', (conectados) => {
                observer.next(conectados);
            });
        });
    }
}