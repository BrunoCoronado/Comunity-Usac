const database = require('../../services/database');

async function buscar(data){
    let query = `SELECT * FROM listar_usuarios`;
    const binds = {};
    if(data.registro){
        binds.registro = data.registro;
        query += ` WHERE registro = :registro`
    }
    const result = await database.ejecutarQuery(query, binds);
    return result.rows;
}

async function crear(data){
    let query = `BEGIN \ninsertar_usuario(:registro, :nombre, :contrasenia, :correo, :telefono); \nEND;`;
    const binds = Object.assign({}, data);
    return await database.ejecutarQuery(query, binds);
}

async function actualizar(data){
    let query = `BEGIN \nactualizar_usuario(:registro, :nombre, :contrasenia, :correo, :telefono, :fotografia); \nEND;`;
    const binds = Object.assign({}, data);
    return await database.ejecutarQuery(query, binds);
}

async function eliminar(data){
    let query = `BEGIN \neliminar_usuario(:registro); \nEND;`;
    const binds = Object.assign({}, data);
    return await database.ejecutarQuery(query, binds);
}

module.exports.buscar = buscar;
module.exports.crear = crear;
module.exports.actualizar = actualizar;
module.exports.eliminar = eliminar;