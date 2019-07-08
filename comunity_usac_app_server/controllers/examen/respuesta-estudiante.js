const respuesta_estudiante = require('../../db_apis/examen/respuesta-estudiante');

async function post(request, response, next){
    try {
        let data = { codigo_pregunta: request.body.codigo_pregunta, codigo_sala: request.body.codigo_sala, registro: request.body.registro, valor: request.body.valor }
        const result = await respuesta_estudiante.crear(data);
        if(!result.error)
            response.status(201).end();
        else
            response.status(404).end()
    } catch (error) {
        next(error);
    }
}

module.exports.post = post;