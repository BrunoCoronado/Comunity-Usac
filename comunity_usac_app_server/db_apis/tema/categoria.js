const database = require('../../services/database');

async function crear(data){
    let query = `BEGIN \n`;
    const binds = { codigo_tema: data.codigo_tema };
    if(data.codigo_facultad){
        query += `crear_categoria_facultad(:codigo_tema, :codigo_facultad); \nEND;`;
        binds.codigo_facultad = data.codigo_facultad;    
    }else if(data.codigo_carrera){
        query += `crear_categoria_carrera(:codigo_tema, :codigo_carrera); \nEND;`;
        binds.codigo_carrera = data.codigo_carrera;
    }else{
        query += `crear_categoria_ciencia(:codigo_tema, :codigo_ciencia); \nEND;`;
        binds.codigo_ciencia = data.codigo_ciencia;
    }
    return await database.ejecutarQuery(query, binds);
}

async function eliminar(data){
    let query = `BEGIN \neliminar_categoria(:codigo_categoria) \nEND;`;
    return await database.ejecutarQuery(query, data);
}

module.exports.crear = crear;
module.exports.eliminar = eliminar;