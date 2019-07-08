const examen = require('../../db_apis/examen/examen');

async function get(request, response, next){
    try {
        const params = { registro: parseInt(request.params.registro, 10), codigo: parseInt(request.params.codigo, 10) }
        const rows = await examen.buscar(params);
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
        const data = capturarExamenBody(request);
        const result = await examen.crear(data);
        if(!result.error)
            response.status(201).json(result.rows[0]);
        else
            response.status(404).end();
    } catch (error) {
        next(error)
    }
}

async function put(request, response, next){
    try {
        let data = {
            codigo: request.body.request,
            titulo: request.body.titulo,
            tema: request.body.tema,
            codigo_u: request.body.codigo_u
        };
        const result = await examen.actualizar(data);
        if(!result.error)
            response.status(202).end()
        else
            response.status(400).end();
    } catch (error) {
        next(error)
    }
}

async function del(request, response, next){
    try {
        const result = await examen.eliminar({ codigo: parseInt( request.params.codigo, 10) });
        if(!result.error)
            response.status(202).end()
        else
            response.status(400).end();
    } catch (error) {
        next(error)
    }
}

function capturarExamenBody(request){
    return {
        titulo: request.body.titulo,
        tema: request.body.tema,
        codigo: request.body.codigo
    }
}

module.exports.get = get;
module.exports.post = post;
module.exports.put = put;
module.exports.delete = del;