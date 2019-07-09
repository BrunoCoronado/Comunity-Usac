const grupo = require('../../../db_apis/conversacion/grupo/grupo');

async function get(request, response, next){
    try {
        const data = { registro: parseInt(request.params.codigo, 10) }
        const rows = await grupo.buscar(data);
        response.status(200).json(rows);
    } catch (error) {
        next(error)
    }
}

async function post(request, response, next){
    try {
        let data = { catedratico: request.body.catedratico, nombre: request.body.nombre }
        const result = await grupo.crear(data);
        if(!result.error)
            response.status(201).json(result.rows[0]);
        else
            response.status(404).end();   
    } catch (error) {
        next(error)
    }
}

async function del(request, response, next){
    try {
        let data = { codigo: request.params.codigo }
        const result = await grupo.eliminar(data);
        if(!result.error)
            response.status(201).end();
        else
            response.status(404).end();
    } catch (error) {
        next(error)
    }
}

module.exports.get = get;
module.exports.post = post;
module.exports.delete = del;