const estudiante_sala = require('../../db_apis/examen/estudiante-sala');

async function post(request, response, next){
    try {   
        let data = { codigo_sala: request.body.codigo_sala, registro: request.body.registro, nota: request.body.nota }
        const result = await estudiante_sala.crear(data);
        if(!result.error)
            response.status(201).end();
        else
            response.status(404).end();
    } catch (error) {
        next(error)
    }
}

module.exports.post = post;