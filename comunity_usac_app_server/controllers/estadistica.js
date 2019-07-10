const estadistica = require('../db_apis/estadistica');

async function get(request, response, next){
    try {
        let result, data = {};
        switch(request.params.tipo){
            case '1': 
                data.rol = request.params.rol;
                if(request.params.ciencia)
                    data.codigo_ciencia = request.params.ciencia;
                result = await estadistica.topUsuariosRespuestas(data);
                break;
            case '2': result = await estadistica.topCienciasRespuestas();
                break;
            case '3':
                data.rol = request.params.rol;
                if(request.params.ciencia)
                    data.codigo_ciencia = request.params.ciencia;
                result = await estadistica.topUsuariosTemas(data);
                break;
        }
        response.status(200).json(result)
    } catch (error) {
        next(error);
    }
}
module.exports.get = get;