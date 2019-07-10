const database = require('../../services/database');

async function buscar(data){
    let query = `SELECT codigo_examen, codigo_sala, tiempo FROM sala WHERE estado = 0 AND nombre = :nombre`;
    const result = await database.ejecutarQuery(query, data);
    return result;
}

async function crear(data){
    let query = `BEGIN \ncrear_sala(:codigo, :nombre, :tiempo); \nEND;`
    return await database.ejecutarQuery(query, data);
}

async function eliminar(data){
    let query = `BEGIN \neliminar_sala(:codigo); \nEND;`
    return await database.ejecutarQuery(query, data);
}

module.exports.buscar = buscar;
module.exports.crear = crear;
module.exports.eliminar = eliminar;