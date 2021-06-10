'user strict';
// const Joi = require('@hapi/joi')

const {Subscription_Handler} = require('../Handler/Subscription_Handler');


Subscription_Route = [
    {
        path: '/api/subscription',
        method: 'POST', 
        options: {
            payload: {
                parse: true,
                allow: 'application/json',
            },
        },
        handler : Subscription_Handler.postListView
    },

    {
        path: '/api/subscription',
        method: 'GET', 
        options: {

        },
        handler : Subscription_Handler.getListView
    }

]

module.exports = Subscription_Route  ;