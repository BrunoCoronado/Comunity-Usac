const database = require('../services/database');

async function autenticar(data){
    let query = `SELECT u.registro "registro" , ur.codigo_rol "rol" FROM usuario u, usuario_rol ur WHERE ur.registro = u.registro AND ur.registro = :registro AND ur.codigo_rol = :codigo_rol AND ur.estado = 0 AND  u.contrasenia = :contrasenia`;
    const binds = Object.assign({}, data);
    const result = await database.ejecutarQuery(query, binds);
    return result.rows;
}

module.exports.autenticar = autenticar;
