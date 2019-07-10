const usuario_imagen = require('../../db_apis/usuario/usuario-imagen');

async function get(request, response, next){
    try {
        const data = { registro: request.params.registro };
        const result = await usuario_imagen.buscar(data);
        response.sendFile(`/home/trext/Dropbox/Archivos/Vacaciones J2019/Proyecto2/comunity_usac_app_server/${result.rows[0].FOTOGRAFIA}`);
    } catch (error) {
        next(error);
    }
}

module.exports.get = get;