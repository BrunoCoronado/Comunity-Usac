const usuario_ciencia = require('../../db_apis/usuario/usuario-ciencia');

async function get(request, response, next){
    try {
        const data = { registro: parseInt(request.params.registro, 10) }
        const rows = await usuario_ciencia.buscar(data);
        response.status(200).json(rows);
    } catch (error) {
        next(error);
    }
}

async function post(request, response, next){
    try {
        let data = { registro: request.body.registro, codigo: request.body.codigo };
        const result = await usuario_ciencia.crear(data);
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
        const result = await usuario_ciencia.eliminar(data);
        if(!result.error)
            response.status(202).end();
        else
            response.status(404).end();
    } catch (error) {
        next(er);
    }
}

module.exports.get = get;
module.exports.post = post;
module.exports.delete = del;