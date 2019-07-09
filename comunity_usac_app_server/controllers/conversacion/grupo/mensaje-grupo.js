const mensaje_grupo = require('../../../db_apis/conversacion/grupo/mensaje-grupo');

async function get(request, response, next){
    try {
        const params = { codigo: parseInt(request.params.codigo, 10) }
        const rows = await mensaje_grupo.buscar(params);
        if(rows){
            const data = convertirResultSet(rows);
            response.status(200).json(data);
        }else
            response.status(404).end();
    } catch (error) {
        next(error);
    }
}

async function post(request, response, next){
    try {
        let data = { 
            emisor: request.body.emisor, 
            grupo: request.body.grupo, 
            contenido: request.body.contenido
         }
        const result = await mensaje_grupo.crear(data);
        if(!result.error)
            response.status(201).end();
        else
            response.status(404).end();        
    } catch (error) {
        next(error);
    }
}

function convertirResultSet(rows){
    let conversacion = {
        codigo_grupo: rows[0].CODIGO_GRUPO,
        nombre_grupo: rows[0].NOMBRE,
        mensajes: []
    };
    rows.forEach(element => {
        if(element.CONTENIDO != null){
            conversacion.mensajes.push({
                registro_emisor: element.REGISTRO_EMISOR,
                contenido: element.CONTENIDO,
                codigo_grupo: rows[0].CODIGO_GRUPO,
            });
        }
    });
    return conversacion;
}

module.exports.get = get;
module.exports.post = post;