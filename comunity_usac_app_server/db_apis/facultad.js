const database = require('../services/database');

async function buscar(fac){
    let query = `SELECT codigo_facultad "codigo", nombre "nombre", descripcion "descripcion" FROM facultad WHERE estado = 0`;
    const binds = {};
    if(fac.codigo_facultad){
        binds.codigo_facultad = fac.codigo_facultad;
        query += ` AND codigo_facultad = :codigo_facultad`
    }    
    const result = await database.ejecutarQuery(query, binds);
    return result.rows;
}

async function crear(fac){
    let query = `BEGIN  \ninsertar_facultad(:codigo_facultad, :nombre, :descripcion); \nEND;`
    const facultad = Object.assign({}, fac);
    const result = await database.ejecutarQuery(query, facultad);
    return result;
}

async function actualizar(fac){
    let query = `BEGIN \nactualizar_facultad(:codigo_facultad, :nombre, :descripcion); \nEND;`
    const facultad = Object.assign({}, fac);
    const result = await database.ejecutarQuery(query, facultad);
    return result;
}

async function eliminar(fac){
    let query = `BEGIN \neliminar_facultad(:codigo_facultad); \nEND;`
    const facultad = Object.assign({}, fac);
    if(facultad.codigo_facultad)
        return await database.ejecutarQuery(query, facultad);
    return {
        error: "Sin codigo"
    }
}

module.exports.buscar = buscar;
module.exports.crear = crear;
module.exports.actualizar = actualizar;
module.exports.eliminar = eliminar;
