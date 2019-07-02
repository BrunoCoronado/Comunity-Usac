const ciencia = require('../db_apis/ciencia');

async function get(request, response, next){
    try {
        const cien = {
            codigo_ciencia: parseInt(request.params.codigo, 10)
        }
        const rows = await ciencia.buscar(cien);
        const data = convertirResultSet(rows);
        response.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

async function post(request, response, next){
    try {
        let cien = capturarCienciaRequest(request);
        const result = await ciencia.crear(cien);
        if(!result.error)
            response.status(201).end();
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
            response.status(202).end();
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
            response.status(202).end();
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

function convertirResultSet(rows){
    let ciencias = [], carreras = [], encontrado = false, i;
    rows.forEach( element => {
        for (i = 0; i < ciencias.length; i++) {
            if(ciencias[i].nombre == element.NOMBRE){
                encontrado = true;
                break;
            }
        }
        if(encontrado){
            if(element.carrera != null){
                ciencias[i].carreras.push({
                    carrera: element.carrera,
                    codigoc: element.codigoc,
                    facultad: element.facultad
                });
            }
        }else{
            if(element.carrera != null){
                carreras[0] = {
                    carrera: element.carrera,
                    codigoc: element.codigoc,
                    facultad: element.facultad
                };
            }
            ciencias.push({
                codigo: element.CODIGO_CIENCIA,
                nombre: element.NOMBRE,
                descripcion: element.DESCRIPCION,
                carreras: carreras
            });
        }
        carreras = [];
        encontrado = false;
        i = 0;
    });
    return ciencias;
}

module.exports.get = get;
module.exports.post = post;
module.exports.put = put;
module.exports.delete = del;