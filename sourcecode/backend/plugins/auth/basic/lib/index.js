'use strict';

const Boom = require('@hapi/boom');
const Hoek = require('@hapi/hoek');

exports.plugin = {
    name: 'basic',
    version: '1.0.0',
    register : async function(server, options) {
        
        server.auth.scheme('basic', (server,options)=>{
            Hoek.assert(options, 'Missing basic auth strategy options');
            Hoek.assert(typeof options.validate === 'function', 'options.validate must be a valid function in basic scheme');

            return {
                authenticate: async (request,h) => {
                    
                    const u_name = request.headers['u_name'];
                    const password = request.headers['password'];

                    const { isValid, credentials, response } = await options.validate(u_name,password);

                    if (response !== undefined) {
                        return h.response(response).takeover();
                    }
        
                    if (!isValid) {
                        return h.unauthenticated(Boom.unauthorized('Bad username or password', 'Basic', options.unauthorizedAttributes), credentials ? { credentials } : null);
                    }
        
                    if (!credentials ||
                        typeof credentials !== 'object') {
        
                        throw Boom.badImplementation('Bad credentials object received for Basic auth validation');
                    }

                    return h.authenticated({credentials}) ;
                }
            }
        })
    }
}

