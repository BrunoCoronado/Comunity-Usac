const database = require('../services/database');

async function buscar(r){
    let query = `SELECT nombre "nombre", descripcion "descripcion" FROM rol WHERE estado = 0`;
    const rol = {};
    if(r.codigo_rol){
        rol.codigo_rol = r.codigo_rol;
        query += ` AND codigo_rol = :codigo_rol`
    }
    const result = await database.ejecutarQuery(query, rol);
    return result.rows;
}

async function crear(r){
    let query = `BEGIN \ninsertar_rol(:nombre, :descripcion); \nEND;`
    const rol = Object.assign({}, r);
    const result = await database.ejecutarQuery(query, rol);
    return result;
}

async function actualizar(r){
    let query = `BEGIN \nactualizar_rol(:codigo_rol, :nombre, :descripcion); \nEND;`
    const rol = Object.assign({}, r);
    const result = await database.ejecutarQuery(query, rol);
    return result;
}

async function eliminar(r){
    let query = `BEGIN \neliminar_rol(:codigo_rol); \nEND;`
    const rol = Object.assign({}, r);
    if(rol.codigo_rol)
        return await database.ejecutarQuery(query, rol);
    return {
        error: "Sin codigo"
    }
}

module.exports.buscar = buscar;
module.exports.crear = crear;
module.exports.actualizar = actualizar;
module.exports.eliminar = eliminar;