'use strict'

const {Order} = require('../Model/Order')
const {CartItem} = require('../Model/CartItem')

const OrderView = {

}


OrderView.createOrderTable = async (req,h) => {

    // connect to mysql 
    const connection = await req.app.db.getConnection() ;

    // create Item table if not exist 
    let res ;
    let errMsg ;
    try {
        console.log(Order.createOrderTable)
        res = await req.app.db.query(connection,Order.createOrderTable);
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

OrderView.inserOrder = async (req,h) => {
    //(user_id,address,total_price,status)
    const token = req.query.token ;
    // const payload = JSON.parse(req.payload ) ; // hapi parse JSON to object automatically ? 
    const payload = req.payload ;
    console.log('inserOrder payload : ',payload)

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

    const address = payload.address ;
    const total_price = payload.total_price ;
    const status = payload.status ;

    // connect to mysql 
    const connection = await req.app.db.getConnection() ;

    let res ;
    let errMsg ;
    try {
        res = await req.app.db.query(connection,Order.insertOrder(user_id,address,total_price,status));
    } catch (err) {
        console.log(err.sqlMessage) ;
        errMsg = err.sqlMessage ;
        connection.release();
        return {
            err: errMsg
        }
    }

    // set the selected CartItems' order Id 
    const cartItemsToBuy = payload.cartItemsToBuy ;
    console.log(payload)
    console.log(typeof(cartItemsToBuy));
    console.log(cartItemsToBuy)

    console.log('insertOrder : ',res)

    const orderId = res.insertId ;
    let i=0 ;
    for(i=0; i< cartItemsToBuy.length; i++){
        const item_id = cartItemsToBuy[i].item_id ;
        console.log('item_id : ',item_id);
        console.log('user_id : ',user_id);
        console.log('orderId : ',orderId);

        try {
            res = await req.app.db.query(connection,CartItem.updateCartItem2order(item_id,user_id,orderId));
            console.log('updateCartItem2order : ', res);
        } catch (err) {
            console.log(err.sqlMessage) ;
            errMsg = err.sqlMessage ;
            connection.release();
            return {
                err: errMsg
            }
        }
    }

    connection.release();

    return {
        data: res,
        orderId: orderId
    }
}

OrderView.getOrderDetail = async (req,h) => {

    console.log('getOrderDetail : ',req.query);

    const order_id = req.query.order_id ;

        // connect to mysql 
        const connection = await req.app.db.getConnection() ;

        let res ;
        let errMsg ;
        try {
            res = await req.app.db.query(connection,Order.getOrderDetail(order_id));
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
            data: res,
        }

}

exports.OrderView = OrderView ;