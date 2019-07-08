const conversacion = require('../../db_apis/conversacion/conversacion');

async function get(request, response, next){
    try {
        const params = { registro: parseInt( request.params.codigo, 10) }
        const rows = await conversacion.buscar(params);
        if(rows){
            response.status(200).json(rows);
        }else
            response.status(404).end();
    } catch (error) {
        next(error);
    }
}

async function post(request, response, next){
    try {
        let data = { emisor: request.body.emisor,  receptor: request.body.receptor }
        const result = await conversacion.crear(data);
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
        let data = { codigo: request.params.codigo }
        const result = await conversacion.eliminar(data);
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