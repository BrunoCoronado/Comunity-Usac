const database = require('../../services/database');

async function buscar(data){
    let query = `SELECT * FROM info_examen WHERE registro = :registro`;
    const binds = { registro: data.registro };
    if(data.codigo){
        binds.codigo = data.codigo;
        query += ` AND codigo_examen = :codigo`
    }
    const result = await database.ejecutarQuery(query, binds);
    return result.rows;
}

async function crear(data){
    let query = `BEGIN \ncrear_examen(:titulo, :tema, :codigo); \nEND;`
    await database.ejecutarQuery(query, data);
    query = `SELECT max(codigo_examen) "codigo_examen" FROM examen WHERE codigo_usuario_ciencia = :codigo`;
    return await database.ejecutarQuery(query, { codigo: data.codigo });
}

async function actualizar(data){
    let query = `BEGIN \nactualizar_examen(:codigo, :titulo, :tema, :codigo_u); \nEND;`
    return await database.ejecutarQuery(query, data);;
}

async function eliminar(data){
    let query = `BEGIN \neliminar_examen(:codigo); \nEND;`
    return await database.ejecutarQuery(query, data);;
}

module.exports.buscar = buscar;
module.exports.crear = crear;
module.exports.actualizar = actualizar;
module.exports.eliminar = eliminar;