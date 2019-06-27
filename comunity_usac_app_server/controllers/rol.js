const rol = require('../db_apis/rol');

async function get(request, response, next){
    try {
        const r = {
            codigo_rol: parseInt(request.codigo_rol, 10)
        }
        const rows = await rol.buscar(r);
        if(request.params.codigo_rol){
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
        let r = capturarRolRequest(request);
        const result = await rol.crear(r);
        if(!result.error)
            response.status(201).end(`Rol ${r.nombre} creado.`);
        else
            response.status(404).end();
    } catch (error) {
        next(error);
    }
}

async function put(request, response, next){
    try {
        let r = capturarRolRequest(request);
        r.codigo_rol = request.body.codigo_rol;
        const result = await rol.actualizar(r);
        if(!result.error)
            response.status(202).end(`Rol ${r.nombre} modificado.`)
        else
            response.status(400).end();
    } catch (error) {
        next(error);
    }
}

async function del(request, response, next){
    try {
        const r = {
            codigo_rol: parseInt(request.params.codigo, 10)
        }
        const result = await rol.eliminar(r);
        if(!result.error)
            response.status(202).end('Rol eliminado');
        else
            response.status(400).end();
    } catch (error) {
        next(error);
    }
}

function capturarRolRequest(request){
    return {
        nombre: request.body.nombre,
        descripcion: request.body.descripcion
    }
}

module.exports.get = get;
module.exports.post = post;
module.exports.put = put;
module.exports.delete = del;