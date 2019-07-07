const respuesta = require('../../db_apis/tema/respuesta');

async function get(request, response, next){
    try {
        const data = { codigo: parseInt(request.params.codigo, 10) }
        const rows = await respuesta.buscar(data);
        response.status(200).json(rows);
    } catch (error) {
        next(error);
    }
}

async function post(request, response, next){
    try {
        let data = {
            registro: request.body.registro,
            codigo_tema: request.body.codigo_tema,
            contenido: request.body.contenido
        }
        const result = await respuesta.crear(data);
        if(!result.error)
            response.status(201).end();
        else
            response.status(404).end();
    } catch (error) {
        next(error);
    }
}

module.exports.get = get;
module.exports.post = post;