const mensaje_conversacion = require('../../db_apis/conversacion/mensaje-conversacion');

async function get(request, response, next){
    try {
        const params = { codigo: parseInt(request.params.codigo, 10) }
        const rows = await mensaje_conversacion.buscar(params);
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
            receptor: request.body.receptor,  
            conversacion: request.body.conversacion,
            contenido: request.body.contenido
        }
        const result = await mensaje_conversacion.crear(data);
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
        codigo_conversacion: rows[0].CODIGO_CONVERSACION,
        registro_emisor: rows[0].REGISTRO_EMISOR,
        nombre_emisor: rows[0].emisor,
        registro_receptor: rows[0].REGISTRO_RECEPTOR,
        nombre_receptor: rows[0].receptor,
        mensajes: []
    };
    rows.forEach(element => {
        if(element.CONTENIDO != null){
            conversacion.mensajes.push({
                registro_emisor: element.remisor,
                registro_receptor: element.rreceptor,
                contenido: element.CONTENIDO
            });
        }
    });
    return conversacion;
}

module.exports.get = get;
module.exports.post = post;