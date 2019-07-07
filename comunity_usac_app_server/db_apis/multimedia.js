const database = require('../services/database');

async function buscar(data){
    let query = `SELECT contenido FROM multimedia WHERE codigo_tema = :codigo AND estado = 0`;
    const result = await database.ejecutarQuery(query, data);
    return result.rows;
}

async function crear(data){
    let query;
    const binds = { contenido: data.contenido};
    if(data.codigo_tema){
        query = `BEGIN \ncrear_multimedia_tema(:codigo_tema, :contenido); \nEND;`
        binds.codigo_tema = parseInt(data.codigo_tema, 10);
    }else
        query = ``;
    return await database.ejecutarQuery(query, binds);
}

async function eliminar(data){
    let query;
    if(data.codigo_tema)
        query = `BEGIN \neliminar_multimedia_tema(:codigo_tema, :contenido); \nEND;`
    else
        query = ``;
    return await database.ejecutarQuery(query, data);
}

module.exports.buscar = buscar;
module.exports.crear = crear;
module.exports.eliminar = eliminar;