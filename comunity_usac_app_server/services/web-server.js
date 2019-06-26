const http = require('http');
const database = require('./database');
const morgan = require('morgan');
const express = require('express');
const webServerConfig = require('../config/web-server');

let httpServer;

function initialize(){
    return new Promise((resolve, reject) =>{
        const app = express();
        httpServer = http.createServer(app);
        app.use(morgan('dev'));

        app.use('/', async (request, response) =>{
            const result = await database.ejecutarQuery('SELECT registro "registro", nombre "nombre", fotografia "fotografia", correo "correo", telefono "telefono", password "password", estado "estado" FROM usuario');
        
            response.status(200).json(result);
        });
        

        httpServer.listen(webServerConfig.port)
            .on('listening', () =>{
                console.log(`Servidor iniciado, escuchando en el puerto ${webServerConfig.port}`);
                resolve();
            })
            .on('error', error => {
                reject(error);
            });
    });
}

function close(){
    return new Promise((resolve, reject) => {
        httpServer.close(err =>{
            if(err)
                return reject(err);
            resolve();
        });
    });
}

module.exports.initialize = initialize;
module.exports.close = close;