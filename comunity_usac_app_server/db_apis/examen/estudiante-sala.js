const database = require('../../services/database');

async function crear(data){
    let query = `BEGIN \ninsertar_estudiante_sala(:codigo_sala, :registro, :nota); \nEND;`
    return await database.ejecutarQuery(query, data);
}   

module.exports.crear = crear;