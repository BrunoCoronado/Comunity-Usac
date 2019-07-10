const database = require('../../services/database');

async function buscar(data){
    let query = `SELECT fotografia FROM usuario WHERE registro = :registro`;
    return await database.ejecutarQuery(query, data);
}

module.exports.buscar = buscar;