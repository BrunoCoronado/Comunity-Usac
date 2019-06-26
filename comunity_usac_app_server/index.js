const webServer = require('./services/web-server');

async function iniciar(){
    try {
        await webServer.initialize();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

iniciar();