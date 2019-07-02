const database = require('../services/database');

async function crear(data){
    console.log(data);
    let query = `BEGIN \ninsertar_carrera_ciencia(:codigo_carrera, :codigo_ciencia); \nEND;`;
    const binds = Object.assign({}, data);
    return await database.ejecutarQuery(query, binds);
}

async function eliminar(data){
    console.log(data);
    let query = `BEGIN \neliminar_carrera_ciencia(:codigo_carrera, :codigo_ciencia); \nEND;`;
    const binds = Object.assign({}, data);
    return await database.ejecutarQuery(query, binds);
}

module.exports.crear = crear;
module.exports.eliminar = eliminar;

