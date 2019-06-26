const oracledb = require('oracledb');
const database = require('../services/database');

async function find(context){
    let query = `SELECT codigo_facultad "codigo", nombre "nombre", descripcion "descripcion" FROM facultad`;
    const binds = {};
    if(context.codigo_facultad){
        binds.codigo_facultad = context.codigo_facultad;
        query += `\nWHERE codigo_facultad = :codigo_facultad`
    }    const result = await database.ejecutarQuery(query, binds);
    return result.rows;
}

async function create(){

}

async function update(){

}

async function del(){

}

module.exports.find = find;
module.exports.create = create;
module.exports.update = update;
module.exports.delete = del;
