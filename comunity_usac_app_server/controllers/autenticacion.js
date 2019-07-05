const autenticacion = require('../db_apis/autenticacion');

async function post(request, response, next){
    try {
        const data = { registro: request.body.registro, contrasenia: request.body.contrasenia, codigo_rol: request.body.codigo_rol };
        const rows = await autenticacion.autenticar(data);
        response.status(202).json(rows);
    } catch (error) {
        next(error);
    }
}

module.exports.post = post;