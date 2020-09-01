'use strict'
const Hapi = require('@hapi/hapi') 
const ipport = require('./ipport')

const url = require('url');

const {isCurrentOrSuper} = require('./auth_validates/isCurrentOrSuper');
const {isSuperUser} = require('./auth_validates/isSuperUser')

const init = async () => {

    let server = Hapi.server({
        port: ipport.port,
        host: ipport.host,
        routes: {
            cors: {
                origin: ['*'], // an array of origins or 'ignore'    
                // credentials: true // boolean - 'Access-Control-Allow-Credentials'
                // headers: ['*'], // Access-Control-Allow-Headers 
                // additionalHeaders: ['*'],
            }
        }
    });

    try {

        await server.register({
            plugin: require('./plugins/auth/token'),

        })

        server.auth.strategy('isSuperUser', 'token', { validate: isSuperUser.validate });
        server.auth.strategy('isCurrentOrSuper', 'token', { validate: isCurrentOrSuper.validate });

        await server.register({
            plugin : require('./plugins/chat'),
        });

        await server.register({
            plugin: require('./plugins/insert')
        })

        await server.register({
            plugin: require('./plugins/mydb'),
            options: {
                connectionLimit: 1000,
                host: 'localhost' ,
                user: 'root',
                password: '1983wchh',
                database: 'chatapp'
            }
        })

        await server.register({
            plugin: require('./plugins/fileop'),
        });

        await server.register({
            plugin: require('hapi-router'),
            options: {
                routes: '**/**/**/Route.js'
            }
        });

        await server.register({
            plugin: require('./plugins/staticFileServer')
        })

        server.ext('onRequest', async (req,h) => {

            let path = req.path ;
            console.log(path)
            const len = path.length ;
            if (path[len-1] === '/'){
                req.path = path.slice(0,-1);
            }

            // console.log(req.headers['content-type']);

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


