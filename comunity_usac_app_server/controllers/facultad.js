const facultad = require('../db_apis/facultad');

async function get(request, response, next){
    try {
        const context = {};
        context.codigo_facultad = parseInt(request.params.codigo, 10);
        const rows = await facultad.buscar(context);
        if(request.params.codigo){
            if(rows.length === 1){
                response.status(200).json(rows[0]);
            }else{
                response.status(404).end();
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
        let fac = capturarFacultadRequest(request);    
        const result = await facultad.crear(fac);
        if(!result.error)
            response.status(201).end();
        else
            response.status(400).end();
    } catch (error) {
        next(error);
    }
    
}

async function put(request, response, next){
    try {
        let fac = capturarFacultadRequest(request);
        const result = await facultad.actualizar(fac);
        if(!result.error)
            response.status(202).end();
        else
            response.status(400).end();
    } catch (error) {
        next(error);
    }
}

async function del(request, response, next){
    try {
        const fac = {
            codigo_facultad: parseInt(request.params.codigo, 10)
        }
        const result = await facultad.eliminar(fac);
        if(!result.error){
            response.status(202).end();
        }else
            response.status(400).end();
    } catch (error) {
        next(error);
    }
}

function capturarFacultadRequest(request){
    return {
        codigo_facultad: request.body.codigo_facultad,
        nombre: request.body.nombre,
        descripcion: request.body.descripcion,
    };
}

module.exports.get = get;
module.exports.post = post;
module.exports.put = put;
module.exports.delete = del;