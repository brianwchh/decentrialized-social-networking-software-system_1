'use strict'

const Joi = require('@hapi/joi')

const {Blog} = require('../Model/Blog')

const BlogHandler = {

}

BlogHandler.createBlogHandler = async (req, h)=> {


    let res ;
    let errMsg ;
    let connection ;

    // check if Blog table exist in the database, if not create one 
    res = await req.app.db.query(connection, Blog.checkBlogTable );

    if (res.length == 0) {
        res = await req.app.db.query(connection, Blog.createBlogTable );
        if (req.app.db.getErr().length != 0){
            return {
                data: res ,
                err : req.app.db.getErr(),
            }
        }
    }

    // create new blog
    const payload = req.payload ;

    console.log(payload)

    const title = payload.title ;
    const content = payload.content ;
    res = await req.app.db.query(connection, Blog.createNewBlog(title,content) );

    return {
        data: res ,
        err : req.app.db.getErr(),
    }

}


exports.BlogHandler = BlogHandler 