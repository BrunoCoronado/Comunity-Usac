const http = require('http');
const express = require('express');
const webServerConfig = require('../config/web-server');

let httpServer;

function initialize(){
    return new Promise((resolve, reject) =>{
        const app = express();
        httpServer = http.createServer(app);

        app.use('/', (request, response) =>{
            response.end('Hola Mundo');
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

module.exports.initialize = initialize;