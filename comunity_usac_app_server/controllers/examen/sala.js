const sala = require('../../db_apis/examen/sala');

async function get(request, response, next){    
    try {
        const data = { nombre: request.params.codigo }
        const result = await sala.buscar(data);
        if(!result.error)
            response.status(201).json(result.rows);
        else
            response.status(404).end();
    } catch (error) {
        next(error);
    }
}

async function post(request, response, next){
    try {
        const data = { codigo: request.body.codigo, nombre: request.body.nombre,  tiempo: request.body.tiempo };
        const result = await sala.crear(data);
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
        const data = { codigo: parseInt(request.params.codigo, 10) };
        const result = await sala.eliminar(data);
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
module.exports.delete = del;