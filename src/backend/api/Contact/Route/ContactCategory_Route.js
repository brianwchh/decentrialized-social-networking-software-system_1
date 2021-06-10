'user strict';
const Joi = require('@hapi/joi')
const {ContactCategory_Handler} = require("../Handler/ContactCategory_Handler")


ContactCategory_Model = [

    /**
     * *******************       Contact Category        ***************************
     */

    {
        path: '/api/contact/category',
        method: 'GET', 
        options: {

        },
        handler : ContactCategory_Handler.getListView
    },

    {
        path: '/api/contact/category',
        method: 'POST', 
        options: {

        },
        handler : ContactCategory_Handler.postListView
    },

]

module.exports = ContactCategory_Model  ;