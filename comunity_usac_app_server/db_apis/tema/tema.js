const database = require('../../services/database');

async function buscar(data){
    const binds = {};
    if(data.codigo)
        binds.codigo = data.codigo;
    const result = {};
    let query = (data.codigo)?`SELECT * FROM info_tema WHERE codigo_tema = :codigo`:`SELECT * FROM info_tema`;
    result.temas = (await database.ejecutarQuery(query, binds)).rows;
    query = (data.codigo)?`SELECT * FROM cat_facultad WHERE "ct_cod_tema" = :codigo`:`SELECT * FROM cat_facultad`;
    result.facultades = (await database.ejecutarQuery(query, binds)).rows;
    query = (data.codigo)?`SELECT * FROM cat_carrera WHERE "ca_cod_tema" = :codigo`:`SELECT * FROM cat_carrera`;
    result.carreras = (await database.ejecutarQuery(query, binds)).rows;
    query = (data.codigo)?`SELECT * FROM cat_ciencia WHERE "ci_cod_tema" = :codigo`:`SELECT * FROM cat_ciencia`;
    result.ciencias = (await database.ejecutarQuery(query, binds)).rows;
    return result;
}

async function crear(data){
    let query = `BEGIN \ncrear_tema(:titulo, :descripcion, :registro); \nEND;`
    await database.ejecutarQuery(query, data);
    query = `SELECT max(codigo_tema) "codigo_tema" FROM tema WHERE registro_usuario_creacion = :registro`;
    return await database.ejecutarQuery(query, { registro: data.registro });
}

async function solucionar(data){
    let query = `BEGIN \nsolucionar_tema(:cod_tema, :registro); \nEND;`;
    return await database.ejecutarQuery(query, data);
}

async function clausurar(data){
    let query = `BEGIN \nclausura_tema(:cod_tema, :registro, :razon); \nEND;`;
    return await database.ejecutarQuery(query, data);
}

module.exports.buscar = buscar;
module.exports.crear = crear;
module.exports.solucionar = solucionar;
module.exports.clausurar =  clausurar;