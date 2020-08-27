'use strict';

const MySQL = require('mysql');
const Hoek = require('@hapi/hoek');
const redis = require('redis');

// 基本流程： 
// 1. 在register plugin時，初始化mysql

// 2. 在lifecycle中的onPreAuth中，把mysql的method加入到request的method中，所以在各個用戶的
// request在route的函數中就能通過調用這額這些方法訪問mysql數據庫。

const db = {
    pool: null
};

const redis_cache = {
    redis_client : null 
};

redis_cache.init = async () => {

    const port = 6379 ;
    redis_cache.redis_client = await redis.createClient(port);

}

redis_cache.save = async (token,expireT,userID) => {

    await redis_cache.redis_client.setex(token,expireT,userID);

};

redis_cache.get = async (token) => {

    return new Promise ((resolve,reject)=>{
        return redis_cache.redis_client.get(token,(err,data)=>{
            if (err) {
                return reject(err);
            }

            if (!data) {
                return reject('token not valid')
            }

            return resolve(data) ;
            
        })
    })

};

db.attachConnection = async (request, h) => {
    
    // console.log(connection);

    request.app.db = db;
    // request.app.queryDb = db.query ;

    request.app.redis = redis_cache ;

    return h.continue ;

}

db.query = async (connection,queryOption) => {
    // return queryset or err 
    return new Promise((resolve,reject)=>{
        return connection.query(queryOption,(err,res,field)=>{
            if (err) {
                return reject(err);
            } 

            return resolve(res);
        })
    })
}

/**
 * original : pool.getConnection(function(err,connection){ 
 *  1. query operation on connection 
 *  2. release connection back to pool })
 * callback function = function(err,connection)
 */
db.getConnection = async () => {
    // return a connection
    return new Promise((resolve,reject)=>{
       return db.pool.getConnection((err,connection)=>{
            if(err){
               return reject(err);
            }
            return resolve(connection); // return a connection in resolve 
            
        })
    })
}

exports.init = db.init = async (baseOptions = {}) => { 

    const hasOptions = Object.keys(baseOptions).length > 0;

    if(!db.pool && !hasOptions){
        throw new Error('No pool and no options to create one found, call `init` or `register` with options first');
    }

    if(db.pool) {
        console.log("pool already exist, some logic must be wrong, not properly closed somewhere")
    }

    // for debuging purpose 
    if (!Object.prototype.hasOwnProperty.call(baseOptions, 'host')) {
        throw new Error('Options must include host property');
    }

    if (!Object.prototype.hasOwnProperty.call(baseOptions, 'connectionLimit')) {
        throw new Error('Options must include connectionLimit property');
    }

    if (!Object.prototype.hasOwnProperty.call(baseOptions, 'user')) {
        throw new Error('Options must include user property');
    }

    if (!Object.prototype.hasOwnProperty.call(baseOptions, 'password')) {
        throw new Error('Options must include password property');
    }

    if (!Object.prototype.hasOwnProperty.call(baseOptions, 'database')) {
        throw new Error('Options must include database property');
    }

    // create pool
    db.pool = MySQL.createPool(baseOptions);

}


exports.plugin = {
    name: 'mydb',
    version: '1.0.0',
    register : async function(server, options) {

        // mysql initialization 
        await db.init(options); // 這個只在register的時候執行一次

        await redis_cache.init(); // redis, lazy way,need to create another plugin for it ???

        // attach mysql methods to request 
        server.ext('onPreAuth', db.attachConnection); // 注冊事件，在每個request來時調用回調函數


        console.log("mydb plugin registered");

    }

}