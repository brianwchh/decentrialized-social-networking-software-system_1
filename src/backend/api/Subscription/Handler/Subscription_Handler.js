'use strict'

const Joi = require('@hapi/joi')

const {Subscription_Model} = require('../Model/Subscription_Model')
const { httpStatus } = require('../../../httpStatus');
const {isLogin} = require('../../../auth_validates/isLogin');
const {getSafeProperty} = require("../../../utility/getSafeProperty.js") 

const Subscription_Handler = {

}

const fileName = "Subscription_Handler.js"

Subscription_Handler.postListView = async (req, h)=> {

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
        // query redis error f
        data.message = `@${fileName} -> ${functionName}, token expored,please login`
        data.statusCode = httpStatus.BadRequest
        data.error = ['Bad request']
        return h.response(data).code(data.statusCode)
    }
    
    const user_id = redisRes.dataArray[0] 

    const api_url =  getSafeProperty(()=>req.payload.api_url, undefined )
    if (api_url === undefined) {
        console.log(`@${fileName} -> ${functionName}, api_url not found`)
        // query redis error 
        data.message = `@${fileName} -> ${functionName}, api_url not found`
        data.statusCode = httpStatus.BadRequest
        data.error = ['Bad request']
        return h.response(data).code(data.statusCode)
    }


    let sqlResult = await req.app.db.query(Subscription_Model.createNewSubscription(api_url,user_id));
    if (sqlResult.errorArray != 0){
        console.log(`@${fileName} -> ${functionName}`, sqlResult.errorArray)
        data.message = `@${fileName} -> ${functionName}` + sqlResult.errorArray[0]
        data.statusCode = httpStatus.BadRequest
        data.error = ['Bad request']
        return h.response(data).code(data.statusCode)
    }

    data.message = `@${fileName} -> ${functionName}, create subscription item ok` ;
    data.querySet = sqlResult.querySet ;
    data.statusCode = httpStatus.OK ;
    data.error = [] ;
    data.isSuccess = true 

    return h.response(data).code(data.statusCode)

}


Subscription_Handler.getListView = async (req, h)=> {

    const action = req.query.action

    const functionName = "getListView"
    // validate token
    let data = {
        querySet : [],
        error : ['method not allowed'],
        statusCode: httpStatus.MethodNotAllowed,
        message : [],
        atributes: {},
        isSuccess : false 
    }

    data = await getList(req,h)

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

    let sqlResult = await req.app.db.query(Subscription_Model.getSubscriptionList());
    if (sqlResult.errorArray != 0){
        console.log(`@${fileName} -> ${functionName}`, sqlResult.errorArray)
        data.message = `@${fileName} -> ${functionName}` + sqlResult.errorArray[0]
        data.statusCode = httpStatus.BadRequest
        data.error = ['Bad request']
        return data
    }

    data.message = `get subscription list ok` ;
    data.querySet = sqlResult.querySet ;
    data.statusCode = httpStatus.OK ;
    data.error = [] ;  
    data.isSuccess = true 

    return data  

}


exports.Subscription_Handler = Subscription_Handler 