'use strict' 

const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi')
const {rootname} = require('../../../config')
const {Item} = require('../Model/Item');
const {Img} = require('../Model/Img');
const {CartItem} = require('../Model/CartItem');
const {v4:uuid4} = require('uuid');
const fs = require('fs');
const {STATIC_ROOT} = require('../../../config')


const CartItemView = {

}

CartItemView.createCartItemTable = async (req,h) => { 

    // connect to mysql 
    const connection = await req.app.db.getConnection() ;

    // create Item table if not exist 
    let res ;
    let errMsg ;
    try {
        console.log(CartItem.createCartItemTable)
        res = await req.app.db.query(connection,CartItem.createCartItemTable);
    } catch (err) {
        console.log(err);
        console.log(err.sqlMessage) ;
        errMsg = err.sqlMessage ;
        connection.release();
        return {
            err: errMsg
        }
    }

    connection.release();

    return {
        msg: res
    }

}


CartItemView.add2Cart = async (req,h) => { 

    // item_id,user_id,item_cnt,price,total_price
    const {payload} = req ;

    const token = req.query.token ;

    // check if token is valid 
    let user_id = null;
    try {
        user_id = await req.app.redis.get(token);
    } catch (err) {
        console.log(err);
        return {
            err, err
        }
    }

    const item_id = payload.item_id ;
    const item_cnt = Number(payload.item_cnt) ;
    const price = Number(payload.price) ;
    const isSelected = payload.isSelected ;

    const total_price = Number(item_cnt) * Number(price) ;

    // connect to mysql 
    const connection = await req.app.db.getConnection() ;

    let res ;
    let errMsg ;
    try {
        res = await req.app.db.query(connection,CartItem.getCartItem(item_id,user_id));
        res = res[0];
        console.log('getCartItem : ', res);
    } catch (err) {
        console.log(err.sqlMessage) ;
        errMsg = err.sqlMessage ;
        return {
            err: errMsg
        }
    }
    // if exist then increase the item_cnt, and update,otherwise insert new CartItem
    if (!res){

        try {
            res = await req.app.db.query(connection,CartItem.insertCartItem(item_id,user_id,item_cnt,isSelected,price,total_price));
            res = res[0];
        } catch (err) {
            console.log(err.sqlMessage) ;
            errMsg = err.sqlMessage ;
            return {
                err: errMsg
            }
        }

    } else {

        const sel_item_cnt = res.item_cnt ;
        const sel_total_price = res.total_price ;

        const updated_item_cnt = Number(sel_item_cnt) + Number(item_cnt) ;
        const updated_total_price = Number(sel_total_price) + Number(price * item_cnt) ;

        try {
            res = await req.app.db.query(connection,CartItem.updateCartItem(item_id,user_id,updated_item_cnt,isSelected,price,updated_total_price));
            // res = res[0];
        } catch (err) {
            console.log(err.sqlMessage) ;
            errMsg = err.sqlMessage ;
            connection.release();
            return {
                err: errMsg
            }
        }

    }

    try {
        res = await req.app.db.query(connection,CartItem.getCartItem(item_id,user_id));
        res = res[0];
        console.log('getCartItem : ', res);
    } catch (err) {
        console.log(err.sqlMessage) ;
        errMsg = err.sqlMessage ;
        return {
            err: errMsg
        }
    }

    connection.release();

    return {
        msg: res 
    }

}

CartItemView.listCartItem = async (req,h) => {  

    const token = req.query.token ;

    // check if token is valid 
    let user_id = null;
    try {
        user_id = await req.app.redis.get(token);
    } catch (err) {
        console.log(err);
        return {
            err, err
        }
    }

    // connect to mysql 
    const connection = await req.app.db.getConnection() ;

    let res ;
    let errMsg ;
    try {
        res = await req.app.db.query(connection,CartItem.queryByUserId(user_id));
        // res = res[0];
        console.log('getCartItem : ', res);
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



CartItemView.delteCartItems = async (req,h) => {  
    /**
     * SELECT * 
        FROM orders 
        WHERE state IN ( ‘VA’ , ‘GA’ , ‘FL’) 
     */

    const {user_id} = req.headers ;
    const {item_ids} = req.headers;

    // connect to mysql 
    const connection = await req.app.db.getConnection() ;

    let res ;
    let errMsg ;
    try {
        res = await req.app.db.query(connection,CartItem.deleteCartItems(item_ids,user_id));
        // res = res[0];
        console.log('getCartItem : ', res);
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
        msg: res
    }

}

CartItemView.editCart = async (req,h) => {

    return {
        msg: 'editCart'
    }
}

exports.CartItemView = CartItemView ;