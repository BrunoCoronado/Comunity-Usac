const tema = require('../../db_apis/tema/tema');

async function get(request, response, next){
    try {
        const data = { codigo: parseInt(request.params.codigo, 10) }
        const result = await tema.buscar(data);
        response.status(200).json(convertirResultSet(result))
    } catch (error) {
        next(error);
    }
}

async function post(request, response, next){
    try {
        const data = capturarTemaBody(request);
        const result = await tema.crear(data);
        if(!result.error)
            response.status(201).json(result.rows[0]);
        else
            response.status(404).end();
    } catch (error) {
        next(error);
    }
}

async function put(request, response, next){// :razon
    try {
        let result;
        const data = { cod_tema: request.body.cod_tema, registro: request.body.registro }
        if(request.body.razon){
            data.razon = request.body.razon;
            result = await tema.clausurar(data);
        }else
            result = await tema.solucionar(data);
        if(!result.error)
            response.status(201).end();
        else
            response.status(404).end();
    } catch (error) {
        next(error);
    }
}

function capturarTemaBody(request){
    return {
        titulo: request.body.titulo,
        descripcion: request.body.descripcion,
        registro: parseInt(request.body.registro, 10)
    }
}

function convertirResultSet(result){
    let temas = [];
    result.temas.forEach( tema => {
        let facultades = [], carreras = [], ciencias = [];
        result.facultades.forEach( facultad => {
            if(facultad.ct_cod_tema == tema.CODIGO_TEMA)
                facultades.push(facultad);
        });
        result.carreras.forEach( carrera => {
            if(carrera.ca_cod_tema == tema.CODIGO_TEMA)
                carreras.push(carrera);
        });
        result.ciencias.forEach( ciencia => {
            if(ciencia.ci_cod_tema == tema.CODIGO_TEMA)
                ciencias.push(ciencia);
        });
        temas.push(Object.assign({ facultades: facultades, carreras: carreras, ciencias: ciencias }, tema));
    });
    return temas;
}

module.exports.get = get;
module.exports.post = post;
module.exports.put = put;