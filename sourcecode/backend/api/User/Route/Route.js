
const Joi = require('@hapi/joi')


Route = [
    {
        path: '/api/user',
        method: 'POST', 
        options: {
            validate : {
                query : Joi.object({
                    limit: Joi.number()
                    .integer()
                    .min(1)
                    .max(100)
                    .required(),

                    username: Joi.string()
                    .alphanum()
                    .min(3)
                    .max(30)
                    .required(),

                }).options({stripUnknown: true})
            }
        },
        handler : async (req,h) => {

            console.log(req.params)
            console.log(req.query)

            // const schema = Joi.object({

            //     username: Joi.string()
            //     .alphanum()
            //     .min(3)
            //     .max(30)
            //     .required(),

            //     password: Joi.string()
            //     .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

            //     repeat_password: Joi.ref('password'), 


            // }).with('password','repeat_password') ;

            // try {
            //     const {error, value} = await schema.validateAsync({
            //         username: req.query.username
            //     })
            //     console.log(`error = ${error}, value = ${value}`)
            // } catch (err) {
            //     console.log(err);
            //     return {
            //         msg : err.details
            //     }
            // }


            return {
                msg: "get all users ? "
            }
        }
    },
    {
        path: '/api/user',
        method: 'GET', 
        handler : async (req,h) => {

            // let server = h.request.server;
            // let pool = server.app.pool;
            // const connection = await server.methods.get_db_conn_from_pool(pool);
            // // console.log(h.request.server.app)
            // connection.release;
            // console.log('onnection released ....')

            return {
                msg: `get users  `
            }
        }
    }
]

module.exports = Route  ;