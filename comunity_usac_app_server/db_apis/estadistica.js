const database = require('../services/database');

async function topUsuariosRespuestas(data){
    let query, binds = { };
    if(data.codigo_ciencia){
        binds.codigo_ciencia = data.codigo_ciencia;
        if(data.rol == 2)
            query = `SELECT * FROM top_resp_ciencia_usuarios WHERE codigo_rol = 2 AND codigo_ciencia = :codigo_ciencia AND ROWNUM < 11`;
        else
            query = `SELECT * FROM top_resp_ciencia_usuarios WHERE codigo_rol = 3 AND codigo_ciencia = :codigo_ciencia AND ROWNUM < 4`;
    }else{
        if(data.rol == 2)
            query = `SELECT * FROM top_respuestas_usuarios WHERE codigo_rol = 2 AND ROWNUM < 11`;
        else
            query = `SELECT * FROM top_respuestas_usuarios WHERE codigo_rol = 3 AND ROWNUM < 4`;
    }
    const result = await database.ejecutarQuery(query, binds);
    return result.rows;
}

async function topCienciasRespuestas(){
    let query = `SELECT * FROM respuestas_ciencia WHERE ROWNUM < 4`;
    const result = await database.ejecutarQuery(query, {});
    return result.rows;
}

async function topUsuariosTemas(data){
    let query, binds = { rol: data.rol };
    if(data.codigo_ciencia){
        binds.codigo_ciencia = data.codigo_ciencia;
        query = `SELECT * FROM temas_usuario_ciencia WHERE codigo_rol = :rol AND codigo_ciencia = :codigo_ciencia AND ROWNUM < 6`;
    }else
        query = `SELECT * FROM temas_por_usuario WHERE codigo_rol = :rol AND ROWNUM < 6`;
    const result = await database.ejecutarQuery(query, binds);
    return result.rows;
}

module.exports.topUsuariosRespuestas = topUsuariosRespuestas;
module.exports.topCienciasRespuestas = topCienciasRespuestas;
module.exports.topUsuariosTemas = topUsuariosTemas;