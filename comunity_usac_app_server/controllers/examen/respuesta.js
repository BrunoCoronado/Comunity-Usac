const respuesta = require('../../db_apis/examen/respuesta');

async function post(request, response, next){
    try {
        let data = {
            contenido: request.body.contenido, 
            codigo: request.body.codigo, 
            valor: request.body.valor
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

module.exports.post = post;