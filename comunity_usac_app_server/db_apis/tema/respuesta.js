const database = require('../../services/database');

async function buscar(data){
    let query = `SELECT * FROM comentarios_tema WHERE codigo_tema = :codigo`;
    const result = await database.ejecutarQuery(query, data);
    return result.rows;
}

async function crear(data){
    let query = `BEGIN \ncrear_respuesta_tema(:registro, :codigo_tema, :contenido); \nEND;`
    return await database.ejecutarQuery(query, data);
}

module.exports.buscar = buscar;
module.exports.crear = crear;