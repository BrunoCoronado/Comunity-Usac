const usuario_carrera = require('../../db_apis/usuario/usuario-carrera');

async function post(request, response, next){
    try {
        let data = { registro: request.body.registro, codigo: request.body.codigo };
        const result = await usuario_carrera.crear(data);
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
        const data = { registro: parseInt(request.params.registro, 10), codigo: parseInt(request.params.codigo, 10) }
        const result = await usuario_carrera.eliminar(data);
        if(!result.error)
            response.status(202).end();
        else
            response.status(404).end();
    } catch (error) {
        next(er);
    }
}

module.exports.post = post;
module.exports.delete = del;