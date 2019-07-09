const database = require('../../../services/database');

async function buscar(data){
    let query = `SELECT * FROM mensajes_grupo WHERE codigo_grupo = :codigo`;
    const result = await database.ejecutarQuery(query, data);
    return result.rows;
}

async function crear(data){
    let query = `BEGIN \nagregar_mensaje_grupo(:emisor, :grupo, :contenido); \nEND;`
    return await database.ejecutarQuery(query, data);    
}

module.exports.buscar = buscar;
module.exports.crear = crear;