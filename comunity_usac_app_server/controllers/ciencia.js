const ciencia = require('../db_apis/ciencia');

async function get(request, response, next){
    try {
        const cien = {
            codigo_ciencia: parseInt(request.params.codigo, 10)
        }
        const rows = await ciencia.buscar(cien);
        if(request.body.codigo){
            if(rows.length === 1){
                response.status(200).json(rows[0])
            }else{
                response.status(404).end('No encontrado.');
            }
        }else{
            response.status(200).json(rows);
        }
    } catch (error) {
        next(error);
    }
}

async function post(request, response, next){
    try {
        let cien = capturarCienciaRequest(request);
        const result = await ciencia.crear(cien);
        if(!result.error)
            response.status(201).end(`Ciencia ${cien.nombre} creada.`);
        else
            response.status(404).end();
    } catch (error) {
        next(error);
    }
}

async function put(request, response, next){
    try {
        let cien = capturarCienciaRequest(request);
        const result = await ciencia.actualizar(cien);
        if(!result.error)
            response.status(202).end(`Ciencia ${cien.nombre} modificada.`);
        else
            response.status(404).end();
    } catch (error) {
        next(error);
    }
}

async function del(request, response, next){
    try {
        const cien = {
            codigo_ciencia: parseInt(request.params.codigo, 10)
        }
        const result = await ciencia.eliminar(cien);
        if(!result.error)
            response.status(202).end(`Ciencia eliminada.`);
        else
            response.status(400).end();
    } catch (error) {
        next(error);
    }
}

function capturarCienciaRequest(request){
    return {
        codigo_ciencia: request.body.codigo_ciencia,
        nombre: request.body.nombre,
        descripcion: request.body.descripcion
    }
}

module.exports.get = get;
module.exports.post = post;
module.exports.put = put;
module.exports.delete = del;