const categoria = require('../../db_apis/tema/categoria');

async function post(request, response, next){
    try {
        let data = capturarDataRequest(request);
        const result = await categoria.crear(data);
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
        const data = { codigo_tema: parseInt(request.params.codigo, 10) }
        const result = await categoria.eliminar(data);
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
        codigo_facultad: request.body.codigo_facultad,
        codigo_carrera: request.body.codigo_carrera,
        codigo_ciencia: request.body.codigo_ciencia,
        codigo_tema: request.body.codigo_tema
    }
}

module.exports.post = post;
module.exports.delete = del;