const usuario = require('../../db_apis/usuario/usuario');

async function get(request, response, next){
    try {
        const params = { registro: parseInt(request.params.registro, 10) }
        const rows = await usuario.buscar(params);
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
        let data = capturarUsuarioRequest(request);
        const result = await usuario.crear(data);
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
        let data = Object.assign({ fotografia: request.body.fotografia }, capturarUsuarioRequest(request));
        const result = await usuario.actualizar(data);
        if(!result.error)
            response.status(201).end();
        else
            response.status(404).end();
    } catch (error) {
        next(error);
    }
}

async function del(request, response, next){
    try {
        const params = { registro: parseInt(request.params.registro, 10) }
        const result = await usuario.eliminar(params);
        if(!result.error)
            response.status(202).end();
        else
            response.status(400).end();
    } catch (error) {
        next(error);
    }
}

function capturarUsuarioRequest(request){
    return {
        registro: parseInt(request.body.registro, 10),
        nombre: request.body.nombre,
        contrasenia: request.body.contrasenia,
        correo: request.body.correo,
        telefono: parseInt(request.body.telefono, 10)
    }
}

function convertirResultSet(rows){
    let usuarios = [], encontrado = false, i;
    rows.forEach(element => {
        for (i = 0; i < usuarios.length; i++) {
            if(usuarios[i].registro == element.REGISTRO){
                encontrado = true;
                break;
            }
        }
        if(encontrado){
            if(element.CODIGO_ROL != null){
                let rol = { codigor: element.CODIGO_ROL, rol: element.rol }
                if(!usuarios[i].roles.some( ({ codigor }) => codigor === rol.codigor ))
                    usuarios[i].roles.push(rol);
            }   
            if(element.CODIGO_CARRERA != null){
                let carrera = { codigoca: element.CODIGO_CARRERA, carrera: element.carrera, facultad: element.facultad, codigofa: element.CODIGO_FACULTAD }
                if(!usuarios[i].carreras.some( ({ codigoca }) => codigoca === carrera.codigoca ))
                    usuarios[i].carreras.push(carrera);
            }   
            if(element.CODIGO_CIENCIA != null){
                let existe = false;
                let ciencia = { codigoci: element.CODIGO_CIENCIA, ciencia: element.ciencia, carrera: element.carrera }
                for (let index = 0; index < usuarios[i].ciencias.length; index++) {
                    if(usuarios[i].ciencias[index].codigoci == ciencia.codigoci && usuarios[i].ciencias[index].ciencia == ciencia.ciencia){
                        existe = true;
                        break;
                    }
                }
                if(!existe)
                    usuarios[i].ciencias.push(ciencia);                    
            }
            if(element.CODIGO_CIENCIA != null){
                let ciencia_tag = { ciencia: element.ciencia }
                if(!usuarios[i].ciencias_tag.some( ({ ciencia }) => ciencia === ciencia_tag.ciencia ))
                    usuarios[i].ciencias_tag.push(ciencia_tag);
            }
            if(element.CODIGO_FACULTAD != null){
                let facultad = { codigfa: element.CODIGO_FACULTAD, facultad: element.facultad }
                if(!usuarios[i].facultades.some( ({ codigfa }) => codigfa === facultad.codigfa ))
                    usuarios[i].facultades.push(facultad);
            }   
        }else{
            let roles = [], carreras = [], ciencias = [], ciencias_tag = [], facultades = [];
            if(element.CODIGO_ROL != null)
                roles[0] = { codigor: element.CODIGO_ROL, rol: element.rol }
            if(element.CODIGO_CARRERA != null)
                carreras[0] = { codigoca: element.CODIGO_CARRERA, carrera: element.carrera, facultad: element.facultad, codigofa: element.CODIGO_FACULTAD }
            if(element.CODIGO_CIENCIA != null){
                ciencias[0] = { codigoci: element.CODIGO_CIENCIA, ciencia: element.ciencia, carrera: element.carrera}
                ciencias_tag[0] = { ciencia: element.ciencia }
            }
            if(element.CODIGO_FACULTAD != null)
                facultades[0] = { codigfa: element.CODIGO_FACULTAD, facultad: element.facultad }
            usuarios.push({
                constrasenia: element.CONTRASENIA,
                registro: element.REGISTRO,
                nombre: element.NOMBRE,
                correo: element.CORREO,
                telefono: element.TELEFONO,
                fotografia: element.FOTOGRAFIA,
                roles: roles,
                carreras: carreras,
                ciencias: ciencias,
                ciencias_tag: ciencias_tag,
                facultades: facultades
            });
        }
        encontrado = false;
        i = 0;
    });
    return usuarios;
}

module.exports.get = get;
module.exports.post = post;
module.exports.put = put;
module.exports.delete = del;