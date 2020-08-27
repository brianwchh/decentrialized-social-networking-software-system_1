'use strict';

const Boom = require('@hapi/boom');
const Hoek = require('@hapi/hoek');

const internal = {} ;

internal.scheme_callback = (server,options) => {

    Hoek.assert(options, 'Missing basic auth strategy options');
    Hoek.assert(typeof options.validate === 'function', 'options.validate must be a valid function in token scheme');

    return {
        authenticate: async (request,h) => {

            const { isValid, credentials} = await options.validate(request);

            if (!isValid) {
                return h.unauthenticated(Boom.unauthorized(`${credentials.err}`, 'token', options.unauthorizedAttributes));
            }

            if (!credentials ||
                typeof credentials !== 'object') {

                throw Boom.badImplementation('Bad credentials object received for token auth validation');
            }

            return h.authenticated({credentials}) ;
        }
    }    

}

exports.plugin = {
    name: 'token',
    version: '1.0.0',
    register : async function(server, options) {
        
        server.auth.scheme('token', internal.scheme_callback)
    }
}

