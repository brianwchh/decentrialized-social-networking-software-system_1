'use strict' 

const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi')
const {rootname} = require('../../../config')
const {User} = require('../Model/User');
const {v4:uuid4} = require('uuid');

const UserView = {}

UserView.createsuperuser =  async (req,h) => {

    const schema = Joi.object({

        username: Joi.string()
        .alphanum()
        .min(3)
        .max(64)
        .required(),

        password: Joi.string().required(),
        // .pattern(new RegExp('^[a-zA-Z0-9]')),

        repeat_password: Joi.ref('password'),
        
        email: Joi.string().min(3).max(64).required()


    }).with('password','repeat_password') ;

    try {
        await schema.validateAsync({
            username: req.headers.username,
            password: req.headers.password,
            repeat_password: req.headers.repeat_password,
            email: req.headers.email,
        })
    } catch (err) {
        console.log(err);
        return {
            msg : err.details
        }
    }

    if (req.headers.username !== rootname) {
        return {
            msg: 'user name not allowed !' ,
        }
    }
    const username = req.headers.username ;
    const email = req.headers.email ;
    const password = req.headers.password ;
    const isSuper = true ;

    // connect to mysql 
    const connection = await req.app.db.getConnection() ;
    let res ;
    let errMsg ;
    // create User table if not exist 
    try {
        res = await req.app.db.query(connection,User.createUserTable);
    } catch (err) {
        console.log(err.sqlMessage) ;
        errMsg = err.sqlMessage ;
    }

    let hashPW ;
    try {
        hashPW = await bcrypt.hash(password,10) ;
    } catch (err) {
        console.log(err);
        return {
            err: err 
        }
    }

    const insertRoot = User.insertSuper2Table(username,hashPW,email) ;

    try {
        res = await req.app.db.query(connection,insertRoot);
    } catch (err) {
        console.log(err.sqlMessage) ;
        errMsg = err.sqlMessage ;
    }

    // release the coonnection back to pool 
    connection.release();

    return {
        res:  res ,
        err: errMsg  
    }
}


UserView.register = async (req,h) => {

    const {payload} = req ;

    // console.log(payload)

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
            username: payload.username,
            password: payload.password,
            repeat_password: payload.repeat_password,
            email: payload.email,
        })
    } catch (err) {
        console.log(err);
        return {
            err : err.details
        }
    }

    const username = payload.username ;
    const password = payload.password ;
    const email    = payload.email ;
    
    let connection ; 
    
    try {
        connection = await req.app.db.getConnection() ; //connect to mysql
    } catch (err){
        console.log(err);
        return {
            err: err 
        }
    }

    let hashPW ;
    try {
        hashPW = await bcrypt.hash(password,10) ;
    } catch (err) {
        console.log(err);
        return {
            err: err 
        }
    }

    let res ;
    let errMsg ;
    // create User table if not exist 
    try {
        res = await req.app.db.query(connection,User.insertUser2Table(username,hashPW,email));
    } catch (err) {
        console.log(err.sqlMessage) ;
        errMsg = err.sqlMessage ;
    }

    connection.release();

    return {
        res: res,
        err: errMsg
    }
};

UserView.login = async (req,h) => {

    const schema = Joi.object({

        username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

        password: Joi.string(),
        // .pattern(new RegExp('^[a-zA-Z0-9]')),
 
    });

    try {
        await schema.validateAsync({
            username: req.payload.username,
            password: req.payload.password,
        })
    } catch (err) {
        console.log(err);
        return {
            msg : err.details
        }
    }

    const {username,password} = req.payload ;
    
    let connection ; 
    
    try {
        connection = await req.app.db.getConnection() ; //connect to mysql
    } catch (err){
        console.log(err);
        return {
            err: err 
        }
    }

    let hashPW ;
    let errMsg ;
    
    try {
        hashPW = await req.app.db.query(connection,User.queryPassword(username));
        hashPW = hashPW[0]['password'] ;
    } catch (err) {
        console.log(err.sqlMessage) ;
        errMsg = err.sqlMessage ;
    }

    let isValid ;
    try {
        isValid = await bcrypt.compare(password, hashPW);
    } catch (err) {
        console.log(err);
        connection.release();
        return {
            err: err ,
            msg: 'login failed'
        }
    }

    // get user ID 
    let userID ;
    try {
        userID = await req.app.db.query(connection,User.queryUserID(username));
        userID = userID[0]['id'] ;
    } catch (err) {
        console.log(err.sqlMessage) ;
        errMsg = err.sqlMessage ;
    }

    connection.release();

    if (isValid === true) {
        const token = uuid4();
        // console.log(token);
        await req.app.redis.save(token,3600,userID);
        // test ....... 
        // let res;
        // try {
        //     res = await req.app.redis.get(token);
        // } catch (err) {
        //     console.log(err);
        //     return {
        //         err: err
        //     }
        // }
        // console.log(res);

        return {
            isPasswordValid: isValid ,
            err: errMsg,
            token: token 
        }
    } else {
        return {
            isPasswordValid: isValid ,
            err: 'login failed, please check password'
        }
    }

    
};


UserView.logout = async (req,h) => {

    console.log('UserView logout payload : ', req.payload)

    const {token} = req.payload ;
    
    await req.app.redis.delete(token);

    try {
        const token_new = await req.app.redis.get(token);
        if(!token_new){
            console.log('token deleted');
        }
    } catch (err) {
        console.log(err);
    }

    return {
        msg: 'logout successfully'
    }

};

UserView.validatetoken = async(req,h) => {
    return {
        isLogin: true
    }
}

UserView.userList = async(req, h) => {

    const connection = await req.app.db.getConnection() ;

    let res ;
    let errMsg ;
    try {
        res = await req.app.db.query(connection,User.getUserList);
    } catch (err) {
        console.log(err.sqlMessage) ;
        errMsg = err.sqlMessage ;
    }
     
    connection.release();

    return {
        res: res,
        err: errMsg
    }
        
}

UserView.getUser = async (req,h) => {

    const userID = req.params.id ;

    const connection = await req.app.db.getConnection() ;

    let res ;
    let errMsg ;
    try {
        res = await req.app.db.query(connection,User.getUser(userID));
        res = res[0];
    } catch (err) {
        console.log(err.sqlMessage) ;
        errMsg = err.sqlMessage ;
    }
     
    connection.release();

    if (!res) {
        return {err: 'user not exist'};
    }

    return {
        user: res,
        err: errMsg
    }

};

UserView.putUser = async (req,h) => {

    // update a row in database
    /**
     * UPDATE table 
     * SET      name = 'brian12',
     *          email = 'brianwchh@gmail.com,
     *          password = 'xxxxxxxjjjj',
     * WHERE    id = userID 
     */

    const userID = req.params.id ;

    const connection = await req.app.db.getConnection() ;

    let res ;
    let errMsg ;
    try {
        res = await req.app.db.query(connection,User.getUser(userID));
        res = res[0];
    } catch (err) {
        console.log(err.sqlMessage) ;
        errMsg = err.sqlMessage ;
    }
     
    connection.release();

    if (!res) {
        return {err: 'user not exist'};
    }

    return {
        user: res,
        err: errMsg
    }

};

UserView.deleteUser = async (req,h) => {

    const userID = req.params.id ;

    const connection = await req.app.db.getConnection() ;

    let res ;
    let errMsg ;
    try {
        res = await req.app.db.query(connection,User.deleteUser(userID));
    } catch (err) {
        console.log(err.sqlMessage) ;
        errMsg = err.sqlMessage ;
    }
     
    connection.release();

    return {
        msg : `delete user${userID}`,
        err: errMsg
    }
};

exports.UserView = UserView ;