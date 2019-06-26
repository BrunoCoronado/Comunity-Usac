const oracledb = require('oracledb');
const dbConfig = require('../config/database');

async function initialize(){
    const pool = await oracledb.createPool(dbConfig.comunity_usac_pool);
}

async function close(){
    await oracledb.getPool().close();
}

function ejecutarQuery(query, binds = [], opts = {}){
    return new Promise(async (resolve, reject) => {
        let conn;
        opts.outFormat = oracledb.OBJECT;
        opts.autoCommit = true;
        try {
            conn = await oracledb.getConnection();
            const result = await conn.execute(query, binds, opts);
            resolve(result);
        } catch (error) {
            reject(error);
        }finally{
            if(conn){
                try {
                    await conn.close();    
                } catch (error) {
                    console.log(error);
                }
            }
        }
    });
}

module.exports.initialize = initialize;
module.exports.close = close;
module.exports.ejecutarQuery = ejecutarQuery;