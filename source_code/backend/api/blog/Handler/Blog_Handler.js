'use strict'

const Joi = require('@hapi/joi')
const {Blog_Model} = require('../Model/Blog_Model')
const { httpStatus } = require('../../../httpStatus');
const {isLogin} = require('../../../auth_validates/isLogin');
const {frontEndUrl} = require ('../../../ipport')

const {getSafeProperty} = require('../../../utility/getSafeProperty')

const Blog_Handler = {

}

const fileName = "Blog_Handler.js"

Blog_Handler.postListView = async (req, h)=> {

    console.log("in Blog_Handler.js")

    const functionName = "postListView"
    // validate token
    const data = {
        querySet : [],
        error : ['method not allowed'],
        statusCode: httpStatus.MethodNotAllowed,
        message : [],
        atributes: {},
        isSuccess: false 
    }

    const validateRes = await isLogin.validate(req.app.redis, req.query.token)

    const isLoginValid = (validateRes.errorArray != 0)? false : true ;

    if (isLoginValid == false){
        data.message = `@${fileName} -> ${functionName}, token expire or null, validate before submit in frontend`
        data.statusCode = httpStatus.BadRequest
        data.error = ['Bad request']
        return h.response(data).code(data.statusCode)
    }

    // 2. get user_id from token 
    const token = req.query.token 
    // console.log('@Contact_Handler.getListView token = ', token)

    const redisRes = await req.app.redis.get(token);

    if (redisRes.errorArray != 0){
        console.log(`@${fileName} -> ${functionName}:`, redisRes.errorArray)
        // query redis error 
        data.message = redisRes.errorArray[0]
        data.statusCode = httpStatus.BadRequest
        data.error = ['Bad request']
        return h.response(data).code(data.statusCode)

    } else if (redisRes.dataArray[0] == null){
        console.log(`@${fileName} -> ${functionName}, token expored,please login`)
        // query redis error 
        data.message = `@${fileName} -> ${functionName}, token expored,please login`
        data.statusCode = httpStatus.BadRequest
        data.error = ['Bad request']
        return h.response(data).code(data.statusCode)
    }
    
    const user_id = redisRes.dataArray[0] 

    const payload = req.payload ;
    const title = payload.title ;
    const content = payload.content ;


    let sqlResult = await req.app.db.query(Blog_Model.createNewBlog(title,content,user_id));
    if (sqlResult.errorArray != 0){
        console.log(`@${fileName} -> ${functionName}`, sqlResult.errorArray)
        data.message = `@${fileName} -> ${functionName}` + sqlResult.errorArray[0]
        data.statusCode = httpStatus.BadRequest
        data.error = ['Bad request']
        return h.response(data).code(data.statusCode)
    }

    data.message = `@${fileName} -> ${functionName}, get Contact item list ok` ;
    data.querySet = sqlResult.querySet ;
    data.statusCode = httpStatus.OK ;
    data.error = [] ;
    data.isSuccess = true 

    return h.response(data).code(data.statusCode)

}


Blog_Handler.getListView = async (req, h)=> {

    const action = req.query.action

    const functionName = "getListView"
    // validate token
    let data = {
        error : ['method not allowed'],
        statusCode: httpStatus.MethodNotAllowed,
        message : [],
        atributes: {},
        isSuccess : false 
    }

    if (!action){
        console.log(`@${fileName} -> ${functionName}`)
        data.message = `@${fileName} -> ${functionName}` 
        data.statusCode = httpStatus.BadRequest
        data.error = ['action not provided']
        return h.response(data).code(data.statusCode) 
    }

    switch (action) {
        case 'getList' : {
            data = await getList(req,h)

            break;
        }

        case 'thumbNailOfLatest' : {
            data = await getThumbNailofLatestBlog(req,h)
            break;
        }

        case 'getLatestBlog' : {
            data = await getLatestBlog(req,h)
            break;
        }

        default : {
            data = await getList(req,h)
            break ;
        }
    }

    return h.response(data).code(data.statusCode)

}


const getList = async (req, h) => {

    const functionName = "getList"
    // validate token
    let data = {
        querySet : [],
        error : ['method not allowed'],
        statusCode: httpStatus.MethodNotAllowed,
        message : [],
        atributes: {},
    }

    let sqlResult = await req.app.db.query(Blog_Model.getBlogList());
    if (sqlResult.errorArray != 0){
        console.log(`@${fileName} -> ${functionName}`, sqlResult.errorArray)
        data.message = `@${fileName} -> ${functionName}` + sqlResult.errorArray[0]
        data.statusCode = httpStatus.BadRequest
        data.error = ['Bad request']
        return data
    }

    data.message = `get blog list ok` ;
    data.querySet = sqlResult.querySet ;
    data.statusCode = httpStatus.OK ;
    data.error = [] ;  
    data.isSuccess = true 

    return data  

}


const getThumbNailofLatestBlog = async (req, h) => {

    const functionName = "getThumbNailofLatestBlog"
    // validate token
    let data = {
        error : ['method not allowed'],
        statusCode: httpStatus.MethodNotAllowed,
        message : [],
        atributes: {},
    }

    let sqlResult = await req.app.db.query(Blog_Model.getLastBlog());
    if (sqlResult.errorArray != 0){
        console.log(`@${fileName} -> ${functionName}`, sqlResult.errorArray)
        data.message = `@${fileName} -> ${functionName}` + sqlResult.errorArray[0]
        data.statusCode = httpStatus.BadRequest
        data.error = ['Bad request']
        return data
    }

    const content = getSafeProperty(()=> sqlResult.querySet[0].content, undefined )

    if (content === undefined){
        data.message = `no blog available` ;
        data.page_url = ``
        data.image_list = []
        data.text = '' 
        data.statusCode = httpStatus.OK ;
        data.error = [] ;  
        data.isSuccess = false 

        return data  
    }

    data.message = `get latest blog thumbnail ok` ;
    data.page_url = `${frontEndUrl}/blog`
    data.image_list = []
    data.text = content.slice(0,200) + '...' 
    data.statusCode = httpStatus.OK ;
    data.error = [] ;  
    data.isSuccess = true 

    return data  

}


const getLatestBlog = async (req, h) => {

    const functionName = "getLatestBlog"
    // validate token
    let data = {
        error : ['method not allowed'],
        statusCode: httpStatus.MethodNotAllowed,
        message : [],
        atributes: {},
    }

    let sqlResult = await req.app.db.query(Blog_Model.getLastBlog());
    if (sqlResult.errorArray != 0){
        console.log(`@${fileName} -> ${functionName}`, sqlResult.errorArray)
        data.message = `@${fileName} -> ${functionName}` + sqlResult.errorArray[0]
        data.statusCode = httpStatus.BadRequest
        data.error = ['Bad request']
        return data
    }

    data.message = `get latest blog ok` ;
    data.querySet = sqlResult.querySet ;
    data.statusCode = httpStatus.OK ;
    data.error = [] ;  
    data.isSuccess = true 

    return data  

}


// Blog_Handler.getBlogList = async (req, h)=> { 

//     let sqlResult = await req.app.db.query(Blog_Model.getBlogList());
//     if (sqlResult.errorArray != 0){
//         console.log(`@${fileName} -> ${functionName}`, sqlResult.errorArray)
//         data.message = `@${fileName} -> ${functionName}` + sqlResult.errorArray[0]
//         data.statusCode = httpStatus.BadRequest
//         data.error = ['Bad request']
//         return h.response(data).code(data.statusCode)
//     }

//     data.message = `@${fileName} -> ${functionName}, get Contact item list ok` ;
//     data.querySet = sqlResult.querySet ;
//     data.statusCode = httpStatus.OK ;
//     data.error = [] ;

//     return h.response(data).code(data.statusCode)


// }


// Blog_Handler.getBlogDetail = async (req, h)=> { 

//     let sqlResult = await req.app.db.query(Blog_Model.getBlogDetail(id));
//     if (sqlResult.errorArray != 0){
//         console.log(`@${fileName} -> ${functionName}`, sqlResult.errorArray)
//         data.message = `@${fileName} -> ${functionName}` + sqlResult.errorArray[0]
//         data.statusCode = httpStatus.BadRequest
//         data.error = ['Bad request']
//         return h.response(data).code(data.statusCode)
//     }

//     data.message = `@${fileName} -> ${functionName}, get blog detail ok` ;
//     data.querySet = sqlResult.querySet ;
//     data.statusCode = httpStatus.OK ;
//     data.error = [] ;

//     return h.response(data).code(data.statusCode)

// }



// Blog_Handler.updateBlog = async (req, h)=> { 

//     console.log("In update /.....")

//     const id = req.params.id ; 

//     const payload = req.payload ;
//     const title = payload.title ;
//     const content = payload.content ;


//     // update blog 
//     let sqlResult = await req.app.db.query(Blog_Model.updateBlog(id,title,content) );
//     if (sqlResult.errorArray != 0){
//         console.log(`@${fileName} -> ${functionName}`, sqlResult.errorArray)
//         data.message = `@${fileName} -> ${functionName}` + sqlResult.errorArray[0]
//         data.statusCode = httpStatus.BadRequest
//         data.error = ['Bad request']
//         return h.response(data).code(data.statusCode)
//     }

//     // get blog detail and send to frontend
//     sqlResult = await req.app.db.query(Blog_Model.getBlogDetail(id) );
//     if (sqlResult.errorArray != 0){
//         console.log(`@${fileName} -> ${functionName}`, sqlResult.errorArray)
//         data.message = `@${fileName} -> ${functionName}` + sqlResult.errorArray[0]
//         data.statusCode = httpStatus.BadRequest
//         data.error = ['Bad request']
//         return h.response(data).code(data.statusCode)
//     }

//     data.message = `@${fileName} -> ${functionName}, get blog detail` ;
//     data.querySet = sqlResult.querySet ;
//     data.statusCode = httpStatus.OK ;
//     data.error = [] ;

//     return h.response(data).code(data.statusCode)

// }


// Blog_Handler.deleteBlog = async (req, h)=> { 

//     let res ;
//     let errMsg ;
//     let connection ;

//     const id = req.params.id ; ;

//     res = await req.app.db.query(connection, Blog_Model.deleteBlog(id) );

//     return {
//         data: res ,
//         err : req.app.db.getErr(),
//     }


//     let sqlResult = await req.app.db.query(Blog_Model.updateBlog(id,title,content) );
//     if (sqlResult.errorArray != 0){
//         console.log(`@${fileName} -> ${functionName}`, sqlResult.errorArray)
//         data.message = `@${fileName} -> ${functionName}` + sqlResult.errorArray[0]
//         data.statusCode = httpStatus.BadRequest
//         data.error = ['Bad request']
//         return h.response(data).code(data.statusCode)
//     }
//     data.message = `@${fileName} -> ${functionName}, get blog detail` ;
//     data.querySet = sqlResult.querySet ;
//     data.statusCode = httpStatus.OK ;
//     data.error = [] ;

//     return h.response(data).code(data.statusCode)

// }




exports.Blog_Handler = Blog_Handler 