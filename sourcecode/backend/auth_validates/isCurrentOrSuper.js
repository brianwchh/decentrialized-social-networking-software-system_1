'use strict'

const isCurrentOrSuper = {

} ;

isCurrentOrSuper.validate = async (req) => {

    let isValid = false ;
    let credentials = null ;

    const token = req.headers.token ;
    const queriedUserID = Number(req.params.id) ;
    
    if (!token) {
        credentials = {err: 'no token found'} ;
        return {
            isValid, credentials
        }
    }

    // check if token is valid 
    let user_id = null;
    try {
        user_id = await req.app.redis.get(token);
    } catch (err) {
        console.log(err);
        credentials = {err: err}  ;
        return {
            isValid, credentials
        }
    }

    console.log(user_id)

    // check if user is in the database 
    let connection ; 

    try {
        connection = await req.app.db.getConnection() ; //connect to mysql
    } catch (err){
        console.log(err);
        credentials = {err: err} ;
        return {
            isValid, credentials
        }
    }

    let res ;
    let errMsg ;
    // create User table if not exist 
    const getUserQuery = `SELECT id, name , isSuper
                         FROM User
                         WHERE id = '${user_id}'`;
    try {
        res = await req.app.db.query(connection,getUserQuery);
        res = res[0];
    } catch (err) {
        console.log(err.sqlMessage) ;
        errMsg = err.sqlMessage ;
        connection.release();
        credentials = {err: err} ;
        return {isValid, credentials};
    }

    connection.release();

    const user = res;
    if(user.id === queriedUserID || user.isSuper){
        isValid = true ;
        credentials = user;
    } else {
        credentials = {err: 'token invalid'}
    }

    return { isValid, credentials };
};

exports.isCurrentOrSuper = isCurrentOrSuper ;
 