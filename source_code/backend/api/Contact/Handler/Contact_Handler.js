'use strict' 

/**
 *  1. 像js這種類型不嚴謹的語言，接口最好是統一口徑（像verilog一樣嚴謹地把每個模塊的輸入輸出接口spec寫詳細）：用obj把返回類型定好，不要一會返回查詢值，一會返回錯誤，在函數定義中盡量寫清楚參數的類型，雖然沒有報錯提醒功能，
 *      但方便日後查閱，好記性不如爛筆頭
 *  2. 寫詳細的打印位置和出錯原因，方便前後端調試時定位出問題，磨刀不誤坎柴功，代碼採用基本統一的框架，然後功能擴展就基本上是copy-paste的少量改動，如果可以就用參數化，實現
 * 代碼復用。
 *  3. 一個不檢查語法的語言，鬼都不知道自己寫出來的程序裏面一不小心走神埋下了多少雷，寫代碼一時爽，找雷把腦子都給繞暈了
 *  4. 一會null,一會undefined,一會‘’，undefined還不等於'undefined'
 *  5. "" 字符一定要習慣統一用這個雙引號，而不要用''，碰到xx's你就頭大了。
 */


const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi')
const {rootname} = require('../../../config')
const {Contact_Model} = require('../Model/Contact_Model');
const {User_Model} = require('../../User/Model/User_Model')
const {v4:uuid4} = require('uuid');
const { httpStatus } = require('../../../httpStatus');
const {isRequestFormDataNull} = require('../../../utility/isRequestFormDataNull')
const {isLogin} = require('../../../auth_validates/isLogin');
const { getSafeProperty } = require('../../../utility/getSafeProperty');
const {my_wsuri} = require('../../../ipport')

const Contact_Handler = {}


/**
 * get Contact item list based on token
 * @param {*} req 
 * @param {*} h 
 */
Contact_Handler.getListView = async (req, h)=> { 
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
        data.message = '@Contact_Handler.js -> getListView, token expire or null, validate before submit in frontend'
        data.statusCode = httpStatus.BadRequest
        data.error = ['Bad request']
        return h.response(data).code(data.statusCode)
    }

    // 2. get user_id from token 
    const token = req.query.token 
    // console.log('@Contact_Handler.getListView token = ', token)

    const redisRes = await req.app.redis.get(token);

    if (redisRes.errorArray != 0){
        console.log('@Contact_Handler.js getListView : ', redisRes.errorArray)
        // query redis error 
        data.message = redisRes.errorArray[0]
        data.statusCode = httpStatus.BadRequest
        data.error = ['Bad request']
        return h.response(data).code(data.statusCode)

    } else if (redisRes.dataArray[0] == null){
        console.log("@Contact_Handler.js getListView , token expored,please login")
        // query redis error 
        data.message = "@Contact_Handler.js getListView, token expored,please login"
        data.statusCode = httpStatus.BadRequest
        data.error = ['Bad request']
        return h.response(data).code(data.statusCode)
    }
    
    const user_id = redisRes.dataArray[0] 

    // get category_id from query 
    const category_id = req.query.category_id
    let sqlResult = null ;

    if (!category_id){
        sqlResult = await req.app.db.query(Contact_Model.getItemListByUserId(user_id));
        if (sqlResult.errorArray != 0){
            console.log('@Contact_Handler.js : getListView', sqlResult.errorArray)
            data.message = '@Contact_Handler.js getListView: ' + sqlResult.errorArray[0]
            data.statusCode = httpStatus.BadRequest
            data.error = ['Bad request']
            return h.response(data).code(data.statusCode)
        }

        data.message = '@Contact_Handler.js : getListView , get Contact item list ok' ;
        data.querySet = sqlResult.querySet ;
        data.statusCode = httpStatus.OK ;
        data.error = [] ;

        return h.response(data).code(data.statusCode)
    }

    // 3. query Contact item list by user_id 

    sqlResult = await req.app.db.query(Contact_Model.getItemListByUserIdAndCategoryId(user_id,category_id));

    if (sqlResult.errorArray != 0){
        console.log('@Contact_Handler.js : getListView', sqlResult.errorArray)
        data.message = '@Contact_Handler.js getListView: ' + sqlResult.errorArray[0]
        data.statusCode = httpStatus.BadRequest
        data.error = ['Bad request']
        return h.response(data).code(data.statusCode)
    }

    // 5. return Contact id to frontend 
    data.message = '@Contact_Handler.js : getListView , get Contact item list ok' ;
    data.querySet = sqlResult.querySet ;
    data.statusCode = httpStatus.OK ;
    data.error = [] ;

    return h.response(data).code(data.statusCode)
}

/**
 *  insert one row in Contact_Model table
 */
Contact_Handler.postListView = async (req, h)=> { 

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
        data.message = '@Contact_Handler.js -> postListView, token expire or null, validate before submit in frontend'
        data.statusCode = httpStatus.BadRequest
        data.error = ['Bad request']
        return h.response(data).code(data.statusCode)
    }

    const checkList = [
                        "name",
                        "image",
                        "webSocketUrl",
                        "hisID",
                        "category_id",
                        "token2AccessHim",
                        "tokenAssigned2Him"
                    ]
    
    const formErrorArray = isRequestFormDataNull(checkList,req.payload)

    if (formErrorArray.length != 0){
        data.message = '@Contact_Handler.js -> Contact_Handler.postListView:  ' + formErrorArray[0]
        data.statusCode = httpStatus.BadRequest
        data.error = ['Bad request']
        return h.response(data).code(data.statusCode)
    }
    
    // 1. get token from req.query.token
    const token = req.query.token 
    // console.log('@Contact_Handler.postListView token = ', token)

    // 2. get user ID via searching token in redis 
    const redisRes = await req.app.redis.get(token);

    if (redisRes.errorArray != 0){
        console.log('@Contact_Handler.js : postListView ', redisRes.errorArray)
        // query redis error 
        data.message = redisRes.errorArray[0]
        data.statusCode = httpStatus.BadRequest
        data.error = ['Bad request']
        return h.response(data).code(data.statusCode)

    } else if (redisRes.dataArray[0] == null){
        console.log("@Contact_Handler.js postListView , token expored,please login")
        // query redis error 
        data.message = "@Contact_Handler.js postListView , token expored,please login"
        data.statusCode = httpStatus.BadRequest
        data.error = ['Bad request']
        return h.response(data).code(data.statusCode)
    }
    
    const user_id = redisRes.dataArray[0] 
    // get user_name via user_id 
    sqlResult = await req.app.db.query(User_Model.getUser( user_id ));

    if (sqlResult.errorArray != 0){
        console.log('Contact_Handler.js : postListView ', sqlResult.errorArray)
        data.message = '@Contact_Handler.js postListView: ' + sqlResult.errorArray[0]
        data.statusCode = httpStatus.BadRequest
        data.error = ['Bad request']
        return h.response(data).code(data.statusCode)
    }

    const my_user_name = getSafeProperty(()=>sqlResult.querySet[0].name, undefined)

    if ( my_user_name == undefined) {
        // something is wrong with the database
        console.log('Contact_Handler.js : postListView , can not find user name via user_id, something wrong with database', sqlResult.querySet[0])
        data.message = '@Contact_Handler.js postListView: can not find user name via user_id, something wrong with database ' + sqlResult.querySet[0]
        data.statusCode = httpStatus.InternalServerError
        data.error = ['Bad request']
        return h.response(data).code(data.statusCode)
    }
    
    // 4. insert one row in table Contact_Model 
    const {name,image,webSocketUrl,hisID,category_id,tokenAssigned2Him,token2AccessHim} = req.payload ;
    sqlResult = await req.app.db.query(Contact_Model.insertOneRow(  name,
                                                                    image,
                                                                    webSocketUrl,
                                                                    hisID,
                                                                    category_id,
                                                                    user_id,
                                                                    token2AccessHim,
                                                                    tokenAssigned2Him
                                                                ));
    
    if (sqlResult.errorArray != 0){
        console.log('Contact_Handler.js : postListView ', sqlResult.errorArray)
        data.message = '@Contact_Handler.js postListView: ' + sqlResult.errorArray[0]
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

Contact_Handler.putListView = async (req, h)=> { 

    const data = {
        querySet : [],
        error : ['method not allowed'],
        statusCode: httpStatus.MethodNotAllowed,
        message : [],
        atributes: {},
    }

    return h.response(data).code(httpStatus.MethodNotAllowed)
}

Contact_Handler.deleteListView = async (req, h)=> { 

    const data = {
        querySet : [],
        error : ['method not allowed'],
        statusCode: httpStatus.MethodNotAllowed,
        message : [],
        atributes: {},
    }

    return h.response(data).code(httpStatus.MethodNotAllowed)
}


exports.Contact_Handler = Contact_Handler ;