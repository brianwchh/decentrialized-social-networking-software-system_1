const {httpStatus} = require('../../../httpStatus')
const {getSafeProperty} = require('../../../utility/getSafeProperty')
const {isRequestFormDataNull} = require('../../../utility/isRequestFormDataNull')
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const { User_Model } = require('../Model/User_Model');
const {v4:uuid4} = require('uuid');
const {isLogin} = require('../../../auth_validates/isLogin')

const ListViewActions = {

}

ListViewActions.registration = async (req,h) => {

    const {payload} = req 

    // 1. validate form data parameter

    const checkList = ['username','password','repeat_password','email']
    let errorArray = isRequestFormDataNull(checkList,req.payload)

    let data = {
        querySet : [],
        error : [],
        statusCode : '',
        message : [],
        isSuccess : false
    }
    
    if (errorArray.length != 0){

        data.querySet = [] ;
        data.message = errorArray ;
        data.error = ['Bad Request']
        data.statusCode = httpStatus.BadRequest
        

        return data
    }

    const {username,password,repeat_password,email,isSuper} = payload

    const schema = Joi.object({

        username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

        password: Joi.string(),
        // .pattern(new RegExp('^[a-zA-Z0-9]')),

        repeat_password: Joi.ref('password'), 

        email: Joi.string(),


    }).with('password','repeat_password') ;

    try {
        await schema.validateAsync({
            username: username,
            password: password,
            repeat_password: repeat_password,
            email: payload.email,
        })
    } catch (err) {

        data.querySet = [] ;
        data.message = [err.details[0].message] ;
        data.error = ['Bad Request']
        data.statusCode = httpStatus.BadRequest
        

        return data
    }

    // 2. hash password

    let hashPW ;
    try {
        hashPW = await bcrypt.hash(password,10) ;
    } catch (err) {

        data.querySet = [] ;
        data.message = [err,'check hash'] ;
        data.error = ['Bad Request']
        data.statusCode = httpStatus.BadRequest
        

        return data
    }

    
    // 3. save user in database 
    const sqlResult = await req.app.db.query(User_Model.insertUser2Table(username,hashPW,email,isSuper));

    if (sqlResult.errorArray.length != 0){

        data.querySet = sqlResult.querySet ;
        data.message = [sqlResult.errorArray] ;
        data.error = ['Bad Request']
        data.statusCode = httpStatus.BadRequest
        

        return data
    } else {

        data.querySet = sqlResult.querySet ;
        data.message = ['user registration successful'] ;
        data.error = []
        data.statusCode = httpStatus.Created
        data.isSuccess = true ;

        return data
    }

}

ListViewActions.login = async (req,h) => { 

    // 1. validate form data parameter

    const checkList = ['username','password']

    let errorArray = isRequestFormDataNull(checkList,req.payload)

    let data = {
        querySet : [],
        error : [],
        statusCode : '',
        message : [],
        isSuccess: false
    }
    
    if (errorArray.length != 0){

        data.querySet = [] ;
        data.message = errorArray ;
        data.error = ['Bad Request']
        data.statusCode = httpStatus.BadRequest
        

        return data
    }

    const {username,password} = req.payload ;

    // 2 . check if username is email or not ?
    const isEmail = username.includes('@')
    let sqlResult = {}
    if (isEmail == true){
        // query password by email
        sqlResult = await req.app.db.query(User_Model.queryPasswordByEmail(username));

    } else {
        // query password by user name
        sqlResult = await req.app.db.query(User_Model.queryPasswordByUserName(username));

    }

    // check if Error happen in query 
    if (sqlResult.errorArray.length != 0 ){
        data.querySet = sqlResult.querySet ;
        data.message = [sqlResult.errorArray] ;
        data.error = ['Bad Request']
        data.statusCode = httpStatus.BadRequest

        return data
    }

    if (sqlResult.querySet.length === 0 ){
        data.querySet = sqlResult.querySet ;
        data.message = [sqlResult.errorArray] ;
        data.error = ['not exist']
        data.statusCode = httpStatus.BadRequest

        return data
    }


    const hashedPWinDb = sqlResult.querySet[0]['password'] ;
    const userID = sqlResult.querySet[0]['id'] ;
    const name = sqlResult.querySet[0]['name']
    let image = sqlResult.querySet[0]['image']
    if (!image) {
        image = "/meihua.png"
    }

    let isPassWordValid = false  ;
    try {
        isPassWordValid = await bcrypt.compare(password, hashedPWinDb);
    } catch (error) {

        data.querySet = [] ;
        data.message = [error] ;
        data.error = ['Bad Request']
        data.statusCode = httpStatus.BadRequest
        

        return data
    }

    if (isPassWordValid === true) {
        const token = uuid4();

        const timeDulration = 3600*24 ;
        const redisRes = await req.app.redis.save(token,timeDulration,userID);

        data.querySet = [
            {username : name,
             userID   : userID,
             userImage : image
            }
        ] ;
        data.message = ['login successful'] ;
        data.error = []
        data.statusCode = httpStatus.OK

        data.isSuccess = true
        data.token = token 

        return data

    } else {

        data.querySet = [] ;
        data.message = ['wrong password or username'] ;
        data.error = ['Wrong password']
        data.statusCode = httpStatus.BadRequest

        data.isSuccess = false

        return data
    }

}


/**
 * 
 * @param {*} req 
 * @param {*} h 
 * 
 * @param (*) return data 
 */
ListViewActions.validate = async (req,h) => { 

    const validateRes = await isLogin.validate(req.app.redis, req.query.token)

    let data = {};

    data.querySet = '' ;
    data.isValid = (validateRes.errorArray != 0)? false : true ;

    if (data.isValid == true){

        const user_id = validateRes.data

        const sqlResult = await req.app.db.query(User_Model.getUserViaId(user_id));

        // check if Error happen in query 
        if (sqlResult.errorArray.length != 0 ){
            data.querySet = sqlResult.querySet ;
            data.message = [sqlResult.errorArray] ;
            data.error = ['Bad Request']
            data.statusCode = httpStatus.BadRequest
            

            return data
        }

        const name =  sqlResult.querySet[0]['name']
        let image = sqlResult.querySet[0]['image']
        if (!image) {
            image = "/meihua.png"
        }

        data.querySet = [
            {
                username: name,
                userID : user_id,
                userImage : image
            }
        ] ;
        data.message = ['already log in'] ;
        data.error = []
        data.statusCode = httpStatus.OK
        
    } else {
        data.message = ['@ListViewAction.js -> validate -> '+validateRes.errorArray[0]] ;
        data.error = ['not log in']
        data.statusCode = httpStatus.BadRequest
        
    }

    return data
}


ListViewActions.logout = async (req,h) => { 

    const validateRes = await isLogin.validate(req.app.redis, req.query.token)

    const isValid =  (validateRes.errorArray.length != 0)? false : true ;

    let data ={}

    const token = req.query.token
    
    data.querySet = [] ;
    data.isValid = isValid ;

    if (isValid == false ){
        data.message = ['token invalid'] ;
        data.error = ['token invalid']
        data.statusCode = httpStatus.BadRequest
        

        return data 
    } 

    const redisRes = await req.app.redis.delete(token);

    data.querySet = ['logout successfully'] ;
    data.message = ['logout successfully'] ;
    data.error = []
    data.statusCode = httpStatus.OK
    

    return data 
    
}

exports.ListViewActions = ListViewActions 



