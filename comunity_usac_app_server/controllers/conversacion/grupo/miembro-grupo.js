const miembro_grupo = require('../../../db_apis/conversacion/grupo/miembro-grupo');

async function get(request, response, next){
    try {
        const data = { registro: parseInt(request.params.codigo, 10) }
        const rows = await miembro_grupo.buscar(data);
        response.status(200).json(rows);
    } catch (error) {
        next(error);
    }
}

async function post(request, response, next){
    try {
        let data = { registro: request.body.registro, grupo: request.body.grupo }
        const result = await miembro_grupo.crear(data);
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
        let data = { codigo: request.params.codigo }
        const result = await miembro_grupo.eliminar(data);
    } catch (error) {
        next(error);
    }
}

module.exports.get = get;
module.exports.post = post;
module.exports.delete = del;