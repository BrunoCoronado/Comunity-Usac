const database = require('../../services/database');

async function buscar(data){
    let query = `SELECT * FROM listado_usuario_ciencia WHERE registro = :registro`;
    const result = await database.ejecutarQuery(query, data);
    return result.rows;
}

async function crear(data){
    let query = `BEGIN \ninsertar_usuario_ciencia(:registro, :codigo); \nEND;`;
    const binds = Object.assign({}, data);
    return await database.ejecutarQuery(query, binds);
}

async function eliminar(data){
    let query = `BEGIN \eliminar_usuario_ciencia(:registro, :codigo); \nEND;`;
    const binds = Object.assign({}, data);
    return await database.ejecutarQuery(query, binds);
}

module.exports.buscar = buscar;
module.exports.crear = crear;
module.exports.eliminar = eliminar;