'user strict';
// const Joi = require('@hapi/joi')

const {Blog_Handler} = require('../Handler/Blog_Handler');


Blog_Route = [
    {
        path: '/api/blog',
        method: 'POST', 
        options: {
            payload: {
                parse: true,
                allow: 'application/json',
            },
        },
        handler : Blog_Handler.postListView
    },

    {
        path: '/api/blog',
        method: 'GET', 
        options: {

        },
        handler : Blog_Handler.getListView
    }

    // {
    //     path: '/api/blog',
    //     method: 'POST', 
    //     options: {
    //         payload: {
    //             parse: true,
    //             allow: 'application/json',
    //         },
    //         // auth: 'isSuperUser',
    //     },
    //     handler : BlogHandler.createBlogHandler
    // },

    // {
    //     path: '/api/blog/{id}',
    //     method: 'PUT', 
    //     options: {
    //         payload: {
    //             parse: true,
    //             allow: 'application/json',
    //         },
    //         // auth: 'isSuperUser',
    //     },
    //     handler : BlogHandler.updateBlog
    // },

    // {
    //     path: '/api/blog',
    //     method: 'GET', 
    //     handler : BlogHandler.getBlogList
    // },

    // {
    //     path: '/api/blog/{id}',
    //     method: 'GET', 
    //     handler : BlogHandler.getBlogDetail
    // },

    // {
    //     path: '/api/blog/{id}',
    //     method: 'DELETE', 
    //     options: {
    //         payload: {
    //             parse: true,
    //             allow: 'application/json',
    //         },
    //         auth: 'isSuperUser',
    //     },
    //     handler : BlogHandler.deleteBlog
    // },

]

module.exports = Blog_Route  ;