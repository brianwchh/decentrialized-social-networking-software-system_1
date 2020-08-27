'use strict' 

const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi')
const {rootname} = require('../../../config')
const {Item} = require('../Model/Item');
const {Img} = require('../Model/Img');
const {ChartItem} = require('../Model/ChartItem');
const {v4:uuid4} = require('uuid');
const fs = require('fs');
const {STATIC_ROOT} = require('../../../config')


const ChartItemView = {

}

ChartItemView.createChartItemTable = async (req,h) => { 

    // connect to mysql 
    const connection = await req.app.db.getConnection() ;

    // create Item table if not exist 
    let res ;
    let errMsg ;
    try {
        res = await req.app.db.query(connection,ChartItem.createChartItemTable);
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


ChartItemView.add2Chart = async (req,h) => { 

    // item_id,user_id,item_cnt,price,total_price
    const {payload} = req ;

    console.log(payload)

    const user_id = payload.user_id ;
    const item_id = payload.item_id ;
    const item_cnt = Number(payload.item_cnt) ;
    const price = Number(payload.price) ;
    const total_price = Number(item_cnt) * Number(price) ;
    const isSelected = payload.isSelected ;

    // connect to mysql 
    const connection = await req.app.db.getConnection() ;

    let res ;
    let errMsg ;
    try {
        res = await req.app.db.query(connection,ChartItem.getChartItem(item_id,user_id));
        res = res[0];
        console.log('getChartItem : ', res);
    } catch (err) {
        console.log(err.sqlMessage) ;
        errMsg = err.sqlMessage ;
        return {
            err: errMsg
        }
    }
    // if exist then increase the item_cnt, and update,otherwise insert new ChartItem
    if (!res){

        try {
            res = await req.app.db.query(connection,ChartItem.insertChartItem(item_id,user_id,item_cnt,isSelected,price,total_price));
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
            res = await req.app.db.query(connection,ChartItem.updateChartItem(item_id,user_id,updated_item_cnt,isSelected,price,updated_total_price));
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
        res = await req.app.db.query(connection,ChartItem.getChartItem(item_id,user_id));
        res = res[0];
        console.log('getChartItem : ', res);
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

ChartItemView.listChartItem = async (req,h) => {  

    const {user_id} = req.headers ;

    // connect to mysql 
    const connection = await req.app.db.getConnection() ;

    let res ;
    let errMsg ;
    try {
        res = await req.app.db.query(connection,ChartItem.queryByUserId(user_id));
        // res = res[0];
        console.log('getChartItem : ', res);
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



ChartItemView.delteChartItems = async (req,h) => {  
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
        res = await req.app.db.query(connection,ChartItem.deleteChartItems(item_ids,user_id));
        // res = res[0];
        console.log('getChartItem : ', res);
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

ChartItemView.editChart = async (req,h) => {

    return {
        msg: 'editChart'
    }
}

exports.ChartItemView = ChartItemView ;