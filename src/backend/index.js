'use strict'
const Hapi = require('@hapi/hapi') 
const ipport = require('./ipport')
const fs = require('fs')

const url = require('url');

const init = async () => {

    // const tls = {
    //     key : fs.readFileSync('/etc/nginx/'),
    //     cert: fs.readFileSync('')
    // }

    let server = Hapi.server({
        port: ipport.port,
        host: ipport.host,
        routes: {
            cors: {
                origin: ['*'], // an array of origins or 'ignore'    
                // credentials: true // boolean - 'Access-Control-Allow-Credentials'
                // headers: ['*'], // Access-Control-Allow-Headers 
                headers: ["Accept", "Authorization", "Content-Type", "If-None-Match", "Accept-language"] ,
                additionalHeaders: [
                    'Access-Control-Allow-Origin',
                    'Access-Control-Request-Method',
                    'Allow-Origin',
                    'Origin',
                ],
            }
        }
    });

    try {

        await server.register({
            plugin: require('./plugins/insert')
        })

        await server.register({
            plugin: require('./plugins/mydb'),
            options: {
                connectionLimit: 1000,
                host: 'localhost' ,
                user: 'brian',
                password: '1983wchh',
                database: 'chatapp',
            }
        })

        await server.register({
            plugin: require('./plugins/fileop'),
        });

        await server.register({
            plugin: require('hapi-router'),
            options: {
                routes: '**/**/**/*_Route.js'
            }
        });

        await server.register({
            plugin: require('./plugins/staticFileServer')
        })

        await server.register({
            plugin : require('./plugins/chat'),
        });

        server.ext('onRequest', async (req,h) => {

            let path = req.path ;
            console.log(path)
            const len = path.length ;
            if (path[len-1] === '/'){
                req.path = path.slice(0,-1);
            }

            // if ('application/csp-report' === req.headers['content-type']) {
            //     req.headers['content-type'] = 'application/json';
            //     req.headers['x-content-type'] = 'application/csp-report';
            //   }

            return h.continue ;

        }); 

    } catch (err) {
        throw err ;
    }


    server.start();

    console.log('Server running on %s', server.info.uri)

};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();


