const database = require('../../services/database');

async function buscar(data){
    let query = `SELECT * FROM info_conversaciones WHERE registro_emisor = :registro OR registro_receptor = :registro`;
    const result = await database.ejecutarQuery(query, data);
    return result.rows;
}

async function crear(data){
    let query = `BEGIN \ncrear_conversacion(:emisor, :receptor); \nEND;`
    await database.ejecutarQuery(query, data);
    query = `SELECT MAX(codigo_conversacion) "codigo_conversacion" FROM conversacion WHERE registro_emisor = :emisor AND registro_receptor = :receptor`
    return await await database.ejecutarQuery(query, data);
}

async function eliminar(data){
    let query = `BEGIN \neliminar_conversacion(:codigo); \nEND;`
    return await database.ejecutarQuery(query, data);
}

module.exports.buscar = buscar;
module.exports.crear = crear;
module.exports.eliminar = eliminar;