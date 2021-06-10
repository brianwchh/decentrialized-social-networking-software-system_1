'user strict';
const Joi = require('@hapi/joi')

const {User_Handler} = require('../Handler/User_Handler')


User_Route = [

    /**
     *    user list view 
     */
    {
        path: '/api/user',
        method: 'GET', 
        options: {
 
        },
        handler : User_Handler.getListView
    },

    {
        path: '/api/user',
        method: 'POST', 
        options: {
            
        },
        handler : User_Handler.postListView
    },

    {
        path: '/api/user',
        method: 'PUT', 
        options: {

        },
        handler : User_Handler.putListView
    },

    {
        path: '/api/user',
        method: 'DELETE', 
        options: {

        },
        handler : User_Handler.deleteListView
    },


    /**
     *    user detail view 
     */

    {
        path: '/api/user/{id}',
        method: 'GET', 
        options: {
            validate: {
                params: Joi.object({
                    id: Joi.number()    // need validate id, otherwise api/user/xo is also valid, which is not what we want
                })
            },

        },
        handler : User_Handler.getDetailView
    },

    {
        path: '/api/user/{id}',
        method: 'POST', 
        options: {
            validate: {
                params: Joi.object({
                    id: Joi.number()    // need validate id, otherwise api/user/xo is also valid, which is not what we want
                })
            },

        },
        handler : User_Handler.postDetailView
    },

    {
        path: '/api/user/{id}',
        method: 'PUT', 
        options: {
            validate: {
                params: Joi.object({
                    id: Joi.number()    // need validate id, otherwise api/user/xo is also valid, which is not what we want
                })
            },

        },
        handler : User_Handler.putDetailView
    },

    {
        path: '/api/user/{id}',
        method: 'DELETE', 
        options: {
            validate: {
                params: Joi.object({
                    id: Joi.number()    // need validate id, otherwise api/user/xo is also valid, which is not what we want
                })
            },

        },
        handler : User_Handler.deleteDetailView
    },

]

module.exports = User_Route  ;