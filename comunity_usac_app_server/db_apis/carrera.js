const database = require('../services/database');

async function buscar(car){
    let query = `SELECT c.codigo_carrera "codigo", c.nombre "nombre", c.descripcion "descripcion", f.nombre "facultad" FROM carrera c INNER JOIN facultad f ON c.codigo_facultad = f.codigo_facultad  AND c.estado = 0 `;
    const carrera = {};
    if(car.codigo_carrera){
        carrera.codigo_carrera = car.codigo_carrera;
        query += ` AND c.codigo_carrera = :codigo_carrera`;
    }
    const result = await database.ejecutarQuery(query, carrera);
    return result.rows;
}

async function crear(car){ 
    let query = `BEGIN \ninsertar_carrera(:codigo_carrera, :codigo_facultad, :nombre, :descripcion); \nEND;`;
    const carrera = Object.assign({}, car);
    const result = await database.ejecutarQuery(query, carrera);
    return result;
}

async function actualizar(car){
    let query = `BEGIN \nactualizar_carrera(:codigo_carrera, :codigo_facultad, :nombre, :descripcion); \nEND;`;
    const carrera = Object.assign({}, car);
    const result = await database.ejecutarQuery(query, carrera);
    return result;
}

async function eliminar(car){
    let query = `BEGIN \neliminar_carrera(:codigo_carrera); \nEND;`;
    const carrera = Object.assign({}, car);
    if(carrera.codigo_carrera)
        return await database.ejecutarQuery(query, carrera);
    return {
        error: "sin codigo"
    }
}

module.exports.buscar = buscar;
module.exports.crear = crear;
module.exports.actualizar = actualizar;
module.exports.eliminar = eliminar;