const database = require('../../services/database')

async function crear(data){
    let query = `BEGIN \ncrear_respuesta(:contenido, :codigo, :valor); \nEND;`
    return await database.ejecutarQuery(query, data);
}

module.exports.crear = crear;