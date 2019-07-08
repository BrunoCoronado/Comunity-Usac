const pregunta = require('../../db_apis/examen/pregunta')

async function post(request, response, next){
    try {
        const data = capturarPreguntaBody(request);
        const result = await pregunta.crear(data);
        if(!result.error)
            response.status(201).json(result.rows[0]);
        else
            response.status(404).end();
    } catch (error) {
        next(error);
    }
}

async function del(request, response, next){
    try {
        const data = { codigo: parseInt(request.params.codigo, 10) };
        const result = await pregunta.eliminar(data)
        if(!result.error)
            response.status(202).end();
        else
            response.status(400).end();
    } catch (error) {
        next(error);
    }
}

function capturarPreguntaBody(request){
    return {
        tipo: request.body.tipo, 
        contenido: request.body.contenido
    }
}

module.exports.post = post;
module.exports.delete = del;