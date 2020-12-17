'use strict'

const isCurrentOrSuper = {

} ;

isCurrentOrSuper.validate = async (req) => {

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

    if (!user_id){
        credentials = {err: 'token invalid'} ;
        return {
            isValid, credentials
        }
    }

    console.log(user_id)

    // check if user is in the database 
    let connection ; 

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
        credentials = {err: err} ;
        return {isValid, credentials};
    }


    const user = res;
    if(user.id ){  // user exist 
        isValid = true ;
        credentials = user;
    } else {
        credentials = {err: 'token invalid'}
    }

    return { isValid, credentials };
};

exports.isCurrentOrSuper = isCurrentOrSuper ;
 