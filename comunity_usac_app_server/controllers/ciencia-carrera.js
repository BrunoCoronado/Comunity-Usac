const ciencia_carrera = require('../db_apis/ciencia-carrera');

async function post(request, response, next){
    try {
        let data = capturarDataRequest(request);
        console.log(data);
        const result = await ciencia_carrera.crear(data);
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
        const data = {
            codigo_ciencia: parseInt(request.params.codigo_ciencia, 10),
            codigo_carrera: parseInt(request.params.codigo_carrera, 10),
        }
        const result = await ciencia_carrera.eliminar(data);
        if(!result.error)
            response.status(202).end();
        else
            response.status(404).end();
    } catch (error) {
        next(error);
    }
}

function capturarDataRequest(request){
    return {
        codigo_carrera: request.body.codigo_carrera,
        codigo_ciencia: request.body.codigo_ciencia
    }
}

module.exports.post = post;
module.exports.delete = del;