'user strict';
const Joi = require('@hapi/joi')
const {Group_Handler} = require('../Handler/Group_Handler')


Group_Route = [

    /**
     * *******************       Request        ***************************
     */

    {
        path: '/api/contact/group',
        method: 'GET', 
        handler : Group_Handler.getListView
    },

    {
        path: '/api/contact/group',
        method: 'POST', 
        options: {

        },
        handler : Group_Handler.postListView
    },

]

module.exports = Group_Route  ;