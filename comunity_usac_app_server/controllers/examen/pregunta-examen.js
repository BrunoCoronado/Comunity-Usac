const pregunta = require('../../db_apis/examen/pregunta');

async function get(request, response, next){
    try {
        const data = { codigo: parseInt(request.params.codigo, 10) }
        const rows = await pregunta.buscar(data);
        if(rows){
            const data = convertirResultSet(rows);
            response.status(200).json(data);
        }else
            response.status(404).end();
    } catch (error) {
        next(error);
    }
}

async function post(request, response, next){
    try {
        const data = {
            codigo_p: request.body.codigo_p,
            codigo_e: request.body.codigo_e
        };
        const result = await pregunta.agregarExamen(data);
        if(!result.error)
            response.status(201).end();
        else
            response.status(404).end();
    } catch (error) {
        next(error);
    }
}

function convertirResultSet(rows){
    let preguntas = [], encontrado = false, i;
    rows.forEach(element => {
        for (i = 0; i < preguntas.length; i++) {
            if(preguntas[i].codigo == element.CODIGO_PREGUNTA){
                encontrado = true;
                break;
            }
        }
        if(encontrado){
            preguntas[i].respuestas.push({ respuesta: element.respuesta, valor: element.VALOR });
        }else{
            let respuestas = [];
            respuestas[0] = { respuesta: element.respuesta, valor: element.VALOR }
            preguntas.push({
                codigo: element.CODIGO_PREGUNTA,
                pregunta: element.CONTENIDO,
                tipo: element.TIPO,
                respuestas: respuestas
            });
        }
    });
    return preguntas;
}

module.exports.get = get;
module.exports.post = post;