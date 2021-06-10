'use strict'

const isSuperUser = {

} ;

isSuperUser.validate = async (req) => {

    let isValid = false ;
    let credentials = null ;

    const token = req.query.token ;
    // const queriedUserID = Number(req.params.id) ;
    
    if (!token) {
        credentials = {err: 'no token found'} ;
        return {
            isValid, credentials
        }
    }

    // check if token is valid 

    const redisRes = await req.app.redis.get(token);
    console.log(`isSuperUser redisRes = ${redisRes}`)

    if (redisRes.errorArray.length != 0){
        credentials = {err: 'token invalid'} ;
        return {
            isValid, credentials
        }
    }

    const user_id = redisRes.data;

    console.log(user_id)

    // check if user is in the database 
    const getUserQuery = `SELECT id, name , isSuper
                         FROM User_Mode
                         WHERE id = '${user_id}'`;

    const sqlResult = await req.app.db.query(getUserQuery);

    if (sqlResult.errArray != 0){
        credentials = {err: sqlResult.errArray} ;
        return {isValid,credentials}
    } else {
        const user = sqlResult.querySet[0]

        if (user.isSuper == true){
            isValid = true 
            credentials = user 
            
            return {isValid,credentials}
        } else {
            isValid = false 
            credentials = {err: 'not super'} 
            
            return {isValid,credentials}
        }
    }
};

exports.isSuperUser = isSuperUser ;








