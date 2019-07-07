const multimedia = require('../db_apis/multimedia');

async function get(request, response, next){
    try {
        const data = { codigo: parseInt(request.params.codigo, 10) }
        const rows = await multimedia.buscar(data);
        response.status(200).json(rows);
    } catch (error) {
        newx(error);
    }
}

async function post(request, response, next){
    try {
        let data = capturarDataRequest(request);
        const result = await multimedia.crear(data);
        if(!result.error)
            response.status(201).end();
        else
            response.status(404).end();
    } catch (error) {
        next(error);
    }
}

async function del(request, response, next){
    try {
        const data = { codigo_multimedia: parseInt(request.params.codigo, 10) }
        const result = await multimedia.eliminar(data);
        if(!result.error)
            response.status(202).end();
        else
            response.status(404).end();
    } catch (error) {
        next(error);
    }
}

function capturarDataRequest(request){
    return {
        codigo_tema: request.body.codigo_tema,
        codigo_respuesta: request.body.codigo_respuesta,
        contenido: request.body.contenido
    }
}

module.exports.get = get;
module.exports.post = post;
module.exports.delete = del;