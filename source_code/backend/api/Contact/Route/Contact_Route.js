'user strict';
const Joi = require('@hapi/joi')
const {Contact_Handler} = require('../Handler/Contact_Handler')


Contact_Route = [

    /**
     * *******************       Request        ***************************
     */

    {
        path: '/api/contact',
        method: 'GET', 
        handler : Contact_Handler.getListView
    },

    {
        path: '/api/contact',
        method: 'POST', 
        options: {

        },
        handler : Contact_Handler.postListView
    },

]

module.exports = Contact_Route  ;