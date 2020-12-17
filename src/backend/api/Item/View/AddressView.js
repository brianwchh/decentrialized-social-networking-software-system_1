'use strict' 

const {Address} = require('../Model/Address')

const AddressView = {

}


AddressView.createaddresstable = async (req,h) => {

    // connect to mysql 
    const connection = await req.app.db.getConnection() ;

    // create Item table if not exist 
    let res ;
    let errMsg ;
    try {
        console.log(Address.createAddressTable)
        res = await req.app.db.query(connection,Address.createAddressTable);
    } catch (err) {
        console.log(err.sqlMessage) ;
        errMsg = err.sqlMessage ;
        connection.release();
        return {
            err: errMsg
        }
    }

    connection.release();

    return {
        data: res
    }

}

AddressView.insertAddress = async (req, h) => {

    // connect to mysql 
    const connection = await req.app.db.getConnection() ;

    const token = req.query.token ;

    // check if token is valid 
    let userId = null;
    try {
        userId = await req.app.redis.get(token);
    } catch (err) {
        console.log(err);
        return {
            err, err
        }
    }

    const addressField = req.payload.addressField ;
    const isDefault = req.payload.isDefault ;

    // insert to Address table 
    let res ;

    try {
        res = await req.app.db.query(connection,Address.insertAddress(userId,addressField,isDefault));
    } catch (err) {
        console.log(err.sqlMessage) ;
        errMsg = err.sqlMessage ;
    }

    connection.release();

    return {
        data: res
    }

}

AddressView.getAddressbyUserId = async (req, h) => {

    // connect to mysql 
    const connection = await req.app.db.getConnection() ;

    const token = req.query.token ;

    // check if token is valid 
    let userId = null;
    try {
        userId = await req.app.redis.get(token);
    } catch (err) {
        console.log(err);
        return {
            err, err
        }
    }

    let res ;
    let errMsg;

    try {
        res = await req.app.db.query(connection,Address.getAddressListByUserId(userId));
        console.log(res)
    } catch (err) {
        console.log(err) ;
        errMsg = err ;
        connection.release();
        return {
            err: errMsg 
        }
    }

    connection.release();

    return {
        data: res
    }
}


exports.AddressView = AddressView ;