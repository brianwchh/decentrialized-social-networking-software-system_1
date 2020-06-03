'use strict'
const Hapi = require('@hapi/hapi') 
const ipport = require('./ipport')

// const clientWebSocket = require('ws');
// const client_ws = new clientWebSocket('ws://localhost:8989')

const init = async () => {

    let server = Hapi.server({
        port: ipport.port,
        host: ipport.host,
    });

    try {

        await server.register({
            plugin: require('hapi-router'),
            options: {
                routes: '**/**/**/Route.js'
            }
        });

        await server.register({
            plugin : require('./chat'),
        });

    } catch (err) {
        throw err ;
    }

    server.ext('onRequest', async (req,h) => {
            
        // let path = req.path ;
        // const len = path.length ;
        // if (path[len-1] === '/'){
        //     req.path = path.slice(0,-1);
        // }

        // pass the pool to routes 
        // h.request.server.app = {
        //     connections : connections,
        // }

        // console.log("***************************");
        return h.continue
    })

    // register server methods here 
    // server.method({
    //     name : 'queryDB',
    //     method : queryDB,
    // });


    server.start();

    console.log('Server running on %s', server.info.uri)

};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();


