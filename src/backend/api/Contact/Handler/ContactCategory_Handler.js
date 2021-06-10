'use strict' 

const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi')
const {rootname} = require('../../../config')
const {ContactCategory_Model} = require('../Model/ContactCategory_Model');
const {v4:uuid4} = require('uuid');
const { httpStatus } = require('../../../httpStatus');
const {isRequestFormDataNull} = require('../../../utility/isRequestFormDataNull')
const {isLogin} = require('../../../auth_validates/isLogin')

const ContactCategory_Handler = {}


const fileName = "ContactCategory_Handler.js"

/**
 * get ContactCategory item list , anyone can get it
 * @param {*} req 
 * @param {*} h 
 */
ContactCategory_Handler.getListView = async (req, h)=> { 

    const data = {
        querySet : [],
        error : ['method not allowed'],
        statusCode: httpStatus.MethodNotAllowed,
        message : [],
        atributes: {},
    }

    // 1 . query ContactCategory item list 

    const sqlResult = await req.app.db.query(ContactCategory_Model.queryItemList());

    if (sqlResult.errorArray != 0){
        console.log('@ContactCategory_Handler.js : getListView', sqlResult.errorArray)
        data.message = '@ContactCategory_Handler.js getListView: ' + sqlResult.errorArray[0]
        data.statusCode = httpStatus.BadRequest
        data.error = ['Bad request']
        return h.response(data).code(data.statusCode)
    }

    // 5. return ContactCategory id to frontend 
    // rearrange the querySet to be as 
    /**
     *   [
     *      {id :  
     *       name : 
     *       contactArray : [empty initially, to avoid the nastive nulllllllllllnimade wenti]
     *       }
     *    ]
     */
    for (let i=0; i<sqlResult.querySet.length; i++){
        sqlResult.querySet[i]['contactArray'] = []
    }

    data.message = '@ContactCategory_Handler.js : getListView , get ContactCategory item list ok' ;
    data.querySet = sqlResult.querySet ;
    data.statusCode = httpStatus.OK ;
    data.error = [] ;

    return h.response(data).code(data.statusCode)
}

/**
 *  insert one row in ContactCategory_Model table
 */
ContactCategory_Handler.postListView = async (req, h)=> { 

    const functionName = "postListView"
    let sqlResult
    

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

    if (isLoginValid == false){
        data.message = '@ContactCategory_Handler.js -> postListView, token expire or null, validate before submit in frontend'
        data.statusCode = httpStatus.BadRequest
        data.error = ['Bad request']
        return h.response(data).code(data.statusCode)
    }

    const checkList = [
                        "name"
                    ]
    
    const formErrorArray = isRequestFormDataNull(checkList,req.payload)

    if (formErrorArray.length != 0){
        data.message = '@ContactCategory_Handler.js -> ContactCategory_Handler.postListView:  ' + formErrorArray[0]
        data.statusCode = httpStatus.BadRequest
        data.error = ['Bad request']
        return h.response(data).code(data.statusCode)
    }
    
    // 1. get token from req.query.token
    const token = req.query.token 
    // console.log('@ContactCategory_Handler.postListView token = ', token)

    // 2. get user ID via searching token in redis 
    const redisRes = await req.app.redis.get(token);

    if (redisRes.errorArray != 0){
        console.log('@ContactCategory_Handler.js : postListView ', redisRes.errorArray)
        // query redis error 
        data.message = redisRes.errorArray[0]
        data.statusCode = httpStatus.BadRequest
        data.error = ['Bad request']
        return h.response(data).code(data.statusCode)

    } else if (redisRes.dataArray[0] == null){
        console.log("@ContactCategory_Handler.js postListView , token expored,please login")
        // query redis error 
        data.message = "@ContactCategory_Handler.js postListView , token expored,please login"
        data.statusCode = httpStatus.BadRequest
        data.error = ['Bad request']
        return h.response(data).code(data.statusCode)
    }
    
    const user_id = redisRes.dataArray[0] 
    
    // 4. insert one row in table ContactCategory_Model 
    const {name} = req.payload ;  // need to careful,need return error if not exist

    sqlResult = await req.app.db.query(ContactCategory_Model.insertOneRow(  name,
                                                                    user_id
                                                                ));
    
    if (sqlResult.errorArray != 0){
        console.log('ContactCategory_Handler.js : postListView ', sqlResult.errorArray)
        data.message = '@ContactCategory_Handler.js postListView: ' + sqlResult.errorArray[0]
        data.statusCode = httpStatus.BadRequest
        data.error = ['Bad request']
        return h.response(data).code(data.statusCode)
    }

    // 5. return ContactCategory id to frontend 
    data.message = 'one row has been succesfully inserted to table ContactCategory_Mode' ;
    data.querySet = sqlResult.querySet ;
    data.statusCode = httpStatus.Created ;
    data.error = [] ;

    return h.response(data).code(data.statusCode)

}



exports.ContactCategory_Handler = ContactCategory_Handler ;