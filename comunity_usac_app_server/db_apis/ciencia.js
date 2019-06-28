const database = require('../services/database');

async function buscar(cien){
    let query = `SELECT codigo_ciencia "codigo", nombre "nombre", descripcion "descripcion" FROM ciencia WHERE estado = 0 `;
    const ciencia = {};
    if(cien.codigo_ciencia){
        ciencia.codigo_ciencia = cien.codigo_ciencia;
        query += ` AND codigo_ciencia = :codigo_ciencia`;
    }
    const result = await database.ejecutarQuery(query, ciencia);
    return result.rows;
}

async function crear(cien){
    let query = `BEGIN \ninsertar_ciencia(:codigo_ciencia, :nombre, :descripcion); \nEND;`;
    const ciencia = Object.assign({}, cien);
    return await database.ejecutarQuery(query, ciencia);
}

async function actualizar(cien){
    let query = `BEGIN \actualizar_ciencia(:codigo_ciencia, :nombre, :descripcion); \nEND;`;
    const ciencia = Object.assign({}, cien);
    return await database.ejecutarQuery(query, ciencia);
}

async function eliminar(cien){
    let query = `BEGIN \neliminar_ciencia(:codigo_ciencia); \nEND;`;
    const ciencia = Object.assign({}, cien);
    if(ciencia.codigo_ciencia)
        return await database.ejecutarQuery(query, ciencia);
    return {
        error: 'Sin codigo'
    }
}

module.exports.buscar = buscar;
module.exports.crear = crear;
module.exports.actualizar = actualizar;
module.exports.eliminar = eliminar;