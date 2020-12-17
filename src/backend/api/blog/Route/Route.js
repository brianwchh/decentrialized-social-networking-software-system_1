'user strict';
// const Joi = require('@hapi/joi')

const {BlogHandler} = require('../Handler/BlogHandler');


Route = [

    {
        path: '/api/blog',
        method: 'POST', 
        handler : BlogHandler.createBlogHandler
    },

]

module.exports = Route  ;