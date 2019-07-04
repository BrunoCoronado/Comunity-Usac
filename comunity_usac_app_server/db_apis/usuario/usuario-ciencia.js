const database = require('../../services/database');

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

module.exports.crear = crear;
module.exports.eliminar = eliminar;