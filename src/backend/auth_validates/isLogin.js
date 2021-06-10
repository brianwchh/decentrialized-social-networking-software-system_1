'use strict'

const isLogin = {

};

/**
 * 
 * @param {*} redis 
 * @param {*} token 
 * 
 * @param {*} return : {data: user_id, errorArray: []}
 */
isLogin.validate = async (redis, token) => {

    if (!token) {

        return {
            data: [],
            errorArray: ['token is null']
        }
    }

    // check if token is still valid in redis 
    let user_id = null;

    const redisRes = await redis.get(token);

    if (redisRes.errorArray != 0) { // any catached errors ??? something wrong
        console.log('isLogin redisRes : ', redisRes.errorArray)
        // query redis error 
        return {
            data: [],
            errorArray: [redisRes.errorArray[0]]
        }
    } else {

        console.log("**********************************************")
        console.log(redisRes.dataArray[0])

        if (redisRes.dataArray[0] == null) { // token not valid  
            return {
                errorArray: ['@isLogin.js -> validate, token invalid'],
                data: []
            }
        }

        return {
            errorArray: [],
            data: redisRes.dataArray[0]
        }
    }

};

exports.isLogin = isLogin;