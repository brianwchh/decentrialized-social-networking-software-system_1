'use strict';

const MySQL = require('mysql');
const Hoek = require('@hapi/hoek');
const redis = require('redis');

// 基本流程： 
// 1. 在register plugin時，初始化mysql

// 2. 在lifecycle中的onPreAuth中，把mysql的method加入到request的method中，所以在各個用戶的
// request在route的函數中就能通過調用這額這些方法訪問mysql數據庫。

const db = {
    pool: null ,
    err : ''
};

const redis_cache = {
    redis_client : null 
};

redis_cache.init =  () => {

    const port = 6379 ;
    redis_cache.redis_client =  redis.createClient(port);
    redis_cache.redis_client.on("error", function(error) {
        console.log(`redis erro ${error} `);
      });

}

redis_cache.save = async (token,expireT,userID) => {

    return new Promise ((resolve,reject)=>{
        return redis_cache.redis_client.setex(token,expireT,userID,(error,res)=>{
            if (error) {
                console.log(`redis_cache.del : ${error}`);
                return reject({dataArray:[],errorArray:[error]});
            }

            return resolve({dataArray:[res],errorArray:[]}) ;
        })
    })
};


redis_cache.delete = async (token) => {

    return new Promise ((resolve,reject)=>{
        return redis_cache.redis_client.del(token,(error,res)=>{
            if (error) {
                console.log(`redis_cache.del : ${error}`);
                return reject({dataArray:[],errorArray:[error]});
            }

            return resolve({dataArray:[res],errorArray:[]}) ;
            
        })
    })

};

redis_cache.get = async (token) => {

    return new Promise ((resolve,reject)=>{
        return redis_cache.redis_client.get(token,(error,res)=>{
            if (error) {
                console.log(`redis_cache.get : ${error}`);
                return reject({dataArray:[],errorArray:[error]});
            }

            return resolve({dataArray:[res],errorArray:[]}) ;
            
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

db.query_core = async (connection,queryOption) => {
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

db.query = async (queryOption) => {
    // get connection from pool
    let conn = '' ;
    try {
        conn = await db.getConn();
    } catch (err) {
        console.log('plugin/mydb/lib/index.js db.query, failed getConn : ' + err);
        return { querySet : [], errorArray: ['plugin/mydb/lib/index.js db.query, failed getConn : ' + err]} ;
    }

    db.err = [] ;

    try {
        const querySet = await db.query_core(conn,queryOption);

        conn.release();
        // if(querySet.length == 0) {
        //     console.log('plugin/mydb/lib/index.js db.query :  result not found in database for sql = ' + queryOption)
        //     return {querySet: [], errorArray: ['plugin/mydb/lib/index.js db.query :  result not found in database for sql = ' + queryOption]}
        // }

        // console.log(querySet)
        // if (querySet.length === 0){
        //     return {querySet : [], errorArray: ['not exist']} // 不可如此，有空查詢存在，且非錯誤
        // } else {
        //     return {querySet : querySet, errorArray: []} ;
        // }

        return {querySet : querySet, errorArray: []} ;

    } catch (err) {

        conn.release();
        console.log('error in db plugin : ',err);
        console.log('******************************')
        console.log('err message : ', err.sqlMessage);
        console.log('******************************')
        db.err = err.sqlMessage ;

        console.log('plugin/mydb/lib/index.js db.query, err in catch : ' + err.sqlMessage)
        return {querySet: [], errorArray: ['plugin/mydb/lib/index.js db.query, err in catch : ' + err.sqlMessage]};

    }
}

db.getErr = () => {
    return [db.err] ;
}

/**
 * original : pool.getConnection(function(err,connection){ 
 *  1. query operation on connection 
 *  2. release connection back to pool })
 * callback function = function(err,connection)
 */


db.getConn = async () => {
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

        // server.app[db] = db ;
        // console.log(Object.keys(server))
        server.app['db'] = db ;
        server.app['redis_cache'] = redis_cache ;
        // console.log(server.app)

        // attach mysql methods to request 
        console.log('attaching database to each request object')
        server.ext('onPreAuth', db.attachConnection); // pass db handler to each incoming request object


        console.log("mydb plugin registered");

    }

}