const database = require('../../services/database');

async function buscar(data){
    let query = `SELECT * FROM preguntas_respuestas  WHERE codigo_examen = :codigo`;
    const result = await database.ejecutarQuery(query, data);
    return result.rows;
}

async function crear(data){
    let query = `BEGIN \ncrear_pregunta(:tipo, :contenido); \nEND;`
    await database.ejecutarQuery(query, data);
    query = `SELECT max(codigo_pregunta) "codigo_pregunta" FROM pregunta WHERE tipo = :tipo`;
    return await database.ejecutarQuery(query, { tipo: data.tipo });
}

async function agregarExamen(data){
    let query = `BEGIN \nagregar_pregunta_examen(:codigo_p, :codigo_e); \nEND;`;
    return await database.ejecutarQuery(query, data);
}

async function eliminar(data){  
    let query = `BEGIN \neliminar_pregunta(:codigo); \nEND;`;
    return await database.ejecutarQuery(query, data);
}

module.exports.buscar = buscar;
module.exports.crear = crear;
module.exports.agregarExamen = agregarExamen;
module.exports.eliminar = eliminar;