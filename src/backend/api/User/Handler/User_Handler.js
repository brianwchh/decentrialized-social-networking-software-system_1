'use strict' 

const {rootname} = require('../../../config')
const {User_Model} = require('../Model/User_Model');
const {v4:uuid4} = require('uuid');
const {httpStatus} = require('../../../httpStatus')
const {getSafeProperty} = require('../../../utility/getSafeProperty')
const {ListViewActions} = require('../Handler/ListViewActions')
const {} = require('../Handler/DetailViewActions')

const User_Handler = {}

/**
 *   **************  list view  ***********************
 */

User_Handler.getListView = async (req,h) => {

    const data = {
        querySet : [],
        error : ['method not allowed'],
        statusCode: httpStatus.MethodNotAllowed,
        message : [],
        atributes: {},
    }

    return h.response(data).code(httpStatus.MethodNotAllowed)
}

User_Handler.postListView = async (req,h) => {

    let data ;

    const action = getSafeProperty(()=>req.query.action, 'undefined')
    if (action  == 'undefined') {
        console.log('action not found in query object')

        const data = {
            querySet : [],
            error : ['Bad request'],
            statusCode : httpStatus.BadRequest,
            message : ['action not found in query object'],
            atributes: {}
        }
        return h.response(data).code(data.statusCode)
    }

    if (action == 'registration') {
        const data = await ListViewActions.registration(req,h)

        return h.response(data).code(data.statusCode)

    } else if (action == 'login') {
        const data = await ListViewActions.login(req,h)

        console.log('postDetailView : data = ', data)

        return h.response(data).code(data.statusCode)

    } else if (action == 'validate') {
        // validate if token valid
        const data = await ListViewActions.validate(req,h)
        return h.response(data).code(data.statusCode)

    } else if (action == 'logout') {
        const data = await ListViewActions.logout(req,h)
        return h.response(data).code(data.statusCode)
        
    } else if (action == 'create') {
        // super user create new user
        // need validate the incoming post is from super user,token is required
        data = {
            querySet : [],
            error : ['Bad request'],
            statusCode : httpStatus.BadRequest,
            message : ['action not implemented'],
            atributes: {}
        }
        return h.response(data).code(data.statusCode)

    } else {
        data = {
            querySet : [],
            error : ['Bad request'],
            statusCode : httpStatus.BadRequest,
            message : ['action not implemented'],
            atributes: {}
        }
        return h.response(data).code(data.statusCode)
    }
}

User_Handler.putListView = async (req,h) => {

    const data = {
        querySet : [],
        error : ['method not allowed'],
        statusCode: httpStatus.MethodNotAllowed,
        message : [],
        atributes: {},
    }

    return h.response(data).code(httpStatus.MethodNotAllowed)

}

User_Handler.deleteListView = async (req,h) => {

    const data = {
        querySet : [],
        error : ['method not allowed'],
        statusCode: httpStatus.MethodNotAllowed,
        message : [],
        atributes: {},
    }

    return h.response(data).code(httpStatus.MethodNotAllowed)

}


/**
 *  ***************** detail view ****************************
 */


User_Handler.getDetailView = async (req,h) => {

    const data = {
        querySet : [],
        error : ['method not allowed'],
        statusCode: httpStatus.MethodNotAllowed,
        message : [],
        atributes: {},
    }

    return h.response(data).code(httpStatus.MethodNotAllowed)

}

User_Handler.postDetailView = async (req,h) => {

    const data = {
        querySet : [],
        error : ['method not allowed'],
        statusCode: httpStatus.MethodNotAllowed,
        message : [],
        atributes: {},
    }

    return h.response(data).code(httpStatus.MethodNotAllowed)

}

User_Handler.putDetailView = async (req,h) => {

    const data = {
        querySet : [],
        error : ['method not allowed'],
        statusCode: httpStatus.MethodNotAllowed,
        message : [],
        atributes: {},
    }

    return h.response(data).code(httpStatus.MethodNotAllowed)

}

User_Handler.deleteDetailView = async (req,h) => {

    const data = {
        querySet : [],
        error : ['method not allowed'],
        statusCode: httpStatus.MethodNotAllowed,
        message : [],
        atributes: {},
    }

    return h.response(data).code(httpStatus.MethodNotAllowed)

}


// User_Handler.getUser = async (req,h) => {

//     const userID = req.params.id ;

//     const connection = await req.app.db.getConnection() ;

//     let querySet ;
//     let errMsg ;
//     try {
//         querySet = await req.app.db.query(connection,User_Model.getUser(userID));
//         querySet = querySet[0];
//     } catch (error) {
//         console.log(error.sqlMessage) ;
//         errMsg = error.sqlMessage ;
//     }
     
//     connection.release();

//     if (!querySet) {
//         return {error: 'user not exist'};
//     }

//     return {
//         user: querySet,
//         error: errMsg
//     }

// };

// User_Handler.putUser = async (req,h) => {

//     // update a row in database
//     /**
//      * UPDATE table 
//      * SET      name = 'brian12',
//      *          email = 'brianwchh@gmail.com,
//      *          password = 'xxxxxxxjjjj',
//      * WHERE    id = userID 
//      */

//     const userID = req.params.id ;

//     const connection = await req.app.db.getConnection() ;

//     let querySet ;
//     let errMsg ;
//     try {
//         querySet = await req.app.db.query(connection,User_Model.getUser(userID));
//         querySet = querySet[0];
//     } catch (error) {
//         console.log(error.sqlMessage) ;
//         errMsg = error.sqlMessage ;
//     }
     
//     connection.release();

//     if (!querySet) {
//         return {error: 'user not exist'};
//     }

//     return {
//         user: querySet,
//         error: errMsg
//     }

// };

// User_Handler.deleteUser = async (req,h) => {

//     const userID = req.params.id ;

//     const connection = await req.app.db.getConnection() ;

//     let querySet ;
//     let errMsg ;
//     try {
//         querySet = await req.app.db.query(connection,User_Model.deleteUser(userID));
//     } catch (error) {
//         console.log(error.sqlMessage) ;
//         errMsg = error.sqlMessage ;
//     }
     
//     connection.release();

//     return {
//         msg : `delete user${userID}`,
//         error: errMsg
//     }
// };

exports.User_Handler = User_Handler ;