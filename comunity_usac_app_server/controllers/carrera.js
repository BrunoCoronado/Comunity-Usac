const carrera = require('../db_apis/carrera');

async function get(request, response, next){
    try {
        const car = {
            codigo_carrera: parseInt(request.params.codigo, 10)
        };
        const rows = await carrera.buscar(car);
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
        let car = capturarCarreraRequest(request);
        const result = await carrera.crear(car);
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
        let car = capturarCarreraRequest(request);
        const result = await carrera.actualizar(car);
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
        const car = {
            codigo_carrera: parseInt(request.params.codigo, 10)
        }
        const result = await carrera.eliminar(car);
        if(!result.error)
            response.status(202).end();
        else
            response.status(400).end();
    } catch (error) {
        next(error);
    }
}

function capturarCarreraRequest(request){
    return {
        codigo_carrera: request.body.codigo_carrera,
        codigo_facultad: request.body.codigo_facultad,
        nombre: request.body.nombre,
        descripcion: request.body.descripcion
    };
}

module.exports.get = get;
module.exports.post = post;
module.exports.put = put;
module.exports.delete = del;
