const database = require('../../../services/database');

async function buscar(data){
    let query = `SELECT * FROM grupos_usuario WHERE registro_estudiante = :registro`
    const result = await database.ejecutarQuery(query, data);
    return result.rows;
}

async function crear(data){
    let query = `BEGIN \nagregar_miembro_grupo(:registro, :grupo); \nEND;`
    return await database.ejecutarQuery(query, data);
}

async function eliminar(data){
    let query = `BEGIN \neliminar_miembro_grupo(:codigo); \nEND;`
    return await database.ejecutarQuery(query, data);
}

module.exports.buscar = buscar;
module.exports.crear = crear;
module.exports.eliminar = eliminar;