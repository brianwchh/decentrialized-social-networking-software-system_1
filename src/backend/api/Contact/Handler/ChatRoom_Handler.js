'use strict' 

const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi')
const {rootname} = require('../../../config')
const {ChatRoom_Model} = require('../Model/ChatRoom_Model');
const {User_Model} = require('../../User/Model/User_Model')
const {v4:uuid4} = require('uuid');
const { httpStatus } = require('../../../httpStatus');
const {isRequestFormDataNull} = require('../../../utility/isRequestFormDataNull')
const {isLogin} = require('../../../auth_validates/isLogin');
const { getSafeProperty } = require('../../../utility/getSafeProperty');
const {my_wsuri} = require('../../../ipport')

const ChatRoom_Handler = {}


/**
 * get Contact item list based on token
 * @param {*} req 
 * @param {*} h 
 */
ChatRoom_Handler.getListView = async (req, h)=> { 
    // validate token
    const data = {
        querySet : [],
        error : ['method not allowed'],
        statusCode: httpStatus.MethodNotAllowed,
        message : [],
        atributes: {},
    }

    const validateRes = await isLogin.validate(req.app.redis, req.query.token)

    const isLoginValid = (validateRes.errorArray != 0)? false : true ;

    if (isLoginValid == false){
        data.message = '@ChatRoom_Handler.js -> getListView, token expire or null, validate before submit in frontend'
        data.statusCode = httpStatus.BadRequest
        data.error = ['Bad request']
        return h.response(data).code(data.statusCode)
    }

    // 2. get user_id from token 
    const token = req.query.token 
    // console.log('@ChatRoom_Handler.getListView token = ', token)

    const redisRes = await req.app.redis.get(token);

    if (redisRes.errorArray != 0){
        console.log('@ChatRoom_Handler.js getListView : ', redisRes.errorArray)
        // query redis error 
        data.message = redisRes.errorArray[0]
        data.statusCode = httpStatus.BadRequest
        data.error = ['Bad request']
        return h.response(data).code(data.statusCode)

    } else if (redisRes.dataArray[0] == null){
        console.log("@ChatRoom_Handler.js getListView , token expored,please login")
        // query redis error 
        data.message = "@ChatRoom_Handler.js getListView, token expored,please login"
        data.statusCode = httpStatus.BadRequest
        data.error = ['Bad request']
        return h.response(data).code(data.statusCode)
    }
    
    const user_id = redisRes.dataArray[0] 

    // 3. get ChatRoom items by user_id

    const sqlResult = await req.app.db.query(ChatRoom_Model.getItemListByUserId(user_id));

    if (sqlResult.errorArray != 0){
        console.log('@ChatRoom_Handler.js : getListView', sqlResult.errorArray)
        data.message = '@ChatRoom_Handler.js getListView: ' + sqlResult.errorArray[0]
        data.statusCode = httpStatus.BadRequest
        data.error = ['Bad request']
        return h.response(data).code(data.statusCode)
    }

    // 5. return Contact id to frontend 
    data.message = '@ChatRoom_Handler.js : getListView , get ChatRoo item list by user_id ok' ;
    data.querySet = sqlResult.querySet ;
    data.statusCode = httpStatus.OK ;
    data.error = [] ;

    return h.response(data).code(data.statusCode)
}

/**
 *  insert one row in ChatRoom_Model table
 */
ChatRoom_Handler.postListView = async (req, h)=> { 

    // validate token
    const validateRes = await isLogin.validate(req.app.redis, req.query.token)

    const isLoginValid = (validateRes.errorArray != 0)? false : true ;

    const data = {
        querySet : [],
        error : ['method not allowed'],
        statusCode: httpStatus.MethodNotAllowed,
        message : [],
        atributes: {},
    }
    let sqlResult = []

    if (isLoginValid == false){
        data.message = '@ChatRoom_Handler.js -> postListView, token expire or null, validate before submit in frontend'
        data.statusCode = httpStatus.BadRequest
        data.error = ['Bad request']
        return h.response(data).code(data.statusCode)
    }

    const checkList = [
                        "roomName",
                        "image",
                    ]
    
    const formErrorArray = isRequestFormDataNull(checkList,req.payload)

    if (formErrorArray.length != 0){
        data.message = '@ChatRoom_Handler.js -> ChatRoom_Handler.postListView:  ' + formErrorArray[0]
        data.statusCode = httpStatus.BadRequest
        data.error = ['Bad request']
        return h.response(data).code(data.statusCode)
    }
    
    // 1. get token from req.query.token
    const token = req.query.token 
    // console.log('@ChatRoom_Handler.postListView token = ', token)

    // 2. get user ID via searching token in redis 
    const redisRes = await req.app.redis.get(token);

    if (redisRes.errorArray != 0){
        console.log('@ChatRoom_Handler.js : postListView ', redisRes.errorArray)
        // query redis error 
        data.message = redisRes.errorArray[0]
        data.statusCode = httpStatus.BadRequest
        data.error = ['Bad request']
        return h.response(data).code(data.statusCode)

    } else if (redisRes.dataArray[0] == null){
        console.log("@ChatRoom_Handler.js postListView , token expored,please login")
        // query redis error 
        data.message = "@ChatRoom_Handler.js postListView , token expored,please login"
        data.statusCode = httpStatus.BadRequest
        data.error = ['Bad request']
        return h.response(data).code(data.statusCode)
    }
    
    const user_id = redisRes.dataArray[0] 
    
    // 4. insert one row in table ChatRoom_Model 
    const {roomName,image} = req.payload ;

    sqlResult = await req.app.db.query(ChatRoom_Model.insertOneRow(  roomName,
                                                                    image,
                                                                    user_id
                                                                ));
    
    if (sqlResult.errorArray != 0){
        console.log('ChatRoom_Handler.js : postListView ', sqlResult.errorArray)
        data.message = '@ChatRoom_Handler.js postListView: ' + sqlResult.errorArray[0]
        data.statusCode = httpStatus.BadRequest
        data.error = ['Bad request']
        return h.response(data).code(data.statusCode)
    }

    // 5. return Contact id to frontend 
    data.message = 'one row has been succesfully inserted to table Contact_Mode' ;
    data.querySet = sqlResult.querySet ;
    data.statusCode = httpStatus.Created ;
    data.error = [] ;

    return h.response(data).code(data.statusCode)

}

ChatRoom_Handler.putListView = async (req, h)=> { 

    const data = {
        querySet : [],
        error : ['method not allowed'],
        statusCode: httpStatus.MethodNotAllowed,
        message : [],
        atributes: {},
    }

    return h.response(data).code(httpStatus.MethodNotAllowed)
}

ChatRoom_Handler.deleteListView = async (req, h)=> { 

    const data = {
        querySet : [],
        error : ['method not allowed'],
        statusCode: httpStatus.MethodNotAllowed,
        message : [],
        atributes: {},
    }

    return h.response(data).code(httpStatus.MethodNotAllowed)
}


exports.ChatRoom_Handler = ChatRoom_Handler ;