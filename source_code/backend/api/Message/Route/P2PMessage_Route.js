'user strict';
const Joi = require('@hapi/joi')
const {P2PMessage_Handler} = require('../Handler/P2PMessage_Handler')


P2PMessage_Route = [

    /**
     * *******************       Request        ***************************
     */

    {
        path: '/api/message/contact',
        method: 'GET', 
        handler : P2PMessage_Handler.getDetailView
    },


]

module.exports = P2PMessage_Route  ;