const database = require('../../services/database');

async function crear(data){
    let query = `BEGIN \ninsertar_respuesta_estudiante(:codigo_pregunta, :codigo_sala, :registro, :valor); \nEND;`
    return await database.ejecutarQuery(query, data);
}

module.exports.crear = crear;