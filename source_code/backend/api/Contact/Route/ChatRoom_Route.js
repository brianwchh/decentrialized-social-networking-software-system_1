'user strict';
const Joi = require('@hapi/joi')
const {ChatRoom_Handler} = require('../Handler/ChatRoom_Handler')


ChatRoom_Route = [

    /**
     * *******************       Request        ***************************
     */

    {
        path: '/api/chatroom',
        method: 'GET', 
        handler : ChatRoom_Handler.getListView
    },

    {
        path: '/api/chatroom',
        method: 'POST', 
        options: {

        },
        handler : ChatRoom_Handler.postListView
    },

]

module.exports = ChatRoom_Route  ;