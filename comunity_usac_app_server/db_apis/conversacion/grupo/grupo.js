const database = require('../../../services/database');

async function buscar(data){
    let query = `SELECT * FROM grupo_conversacion WHERE estado = 0 AND codigo_catedratico = :registro`
    const result = await database.ejecutarQuery(query, data);
    return result.rows;
}

async function crear(data){
    let query = `BEGIN \ncrear_grupo(:catedratico, :nombre); \nEND;`
    await database.ejecutarQuery(query, data);
    query = `SELECT MAX(codigo_grupo) "codigo_grupo" FROM grupo_conversacion WHERE codigo_catedratico = :catedratico`
    return await await database.ejecutarQuery(query, { catedratico: data.catedratico });
}

async function eliminar(data){
    let query = `BEGIN \neliminar_grupo(:codigo); \nEND;`
    return await database.ejecutarQuery(query, data);
}

module.exports.buscar = buscar;
module.exports.crear = crear;
module.exports.eliminar = eliminar;