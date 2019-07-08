const database = require('../../services/database');

async function buscar(data){
    let query = `SELECT * FROM mensajes_conversacion WHERE codigo_conversacion = :codigo`;
    const result = await database.ejecutarQuery(query, data);
    return result.rows;
}

async function crear(data){
    let query = `BEGIN \ncrear_mensaje(:emisor, :receptor, :conversacion, :contenido); \nEND;`;
    return await database.ejecutarQuery(query, data);
}

module.exports.buscar = buscar
module.exports.crear = crear;