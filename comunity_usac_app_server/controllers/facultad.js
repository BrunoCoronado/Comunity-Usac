const facultad = require('../db_apis/facultad');

async function get(request, response, next){
    try {
        const context = {};
        context.codigo_facultad = parseInt(request.params.codigo, 10);
        const rows = await facultad.find(context);
        if(request.params.codigo_facultad){
            if(rows.legth === 1){
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

}

async function put(request, response, next){

}

async function del(request, response, next){

}

module.exports.get = get;
module.exports.post = post;
module.exports.put = put;
module.exports.delete = del;