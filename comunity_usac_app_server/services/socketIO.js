const socketIO = require('socket.io');

let io;

let usuariosConectados = [];

function inicializar(httpServer){
    io = socketIO(httpServer);
    io.on('connection', socket => manejador(socket) );
}

function manejador(socket){
    
    socket.on('conectar', (data) => {
        usuariosConectados.push( { registro: data[0].registro, nombre: data[0].nombre, fotografia: data[0].fotografia } );
        io.emit('conectar', usuariosConectados);
    });

    socket.on('desconectar', (data) => {
        let tmp = usuariosConectados, index;
        for (index = 0; index < tmp.length; index++) {
            if(tmp[index].registro == data.registro)
                break;
        }
        usuariosConectados.splice(index, 1);
        io.emit('desconectar', usuariosConectados);
    });

    socket.on('solicitadConectados', () => io.emit('conectar', usuariosConectados) );    
    
    socket.on('nuevo-mensaje', (mensaje) => {
        io.emit('nuevo-mensaje', mensaje);
    });
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
}

module.exports.inicializar = inicializar;