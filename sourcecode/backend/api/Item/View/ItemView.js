'use strict' 

const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi')
const {rootname} = require('../../../config')
const {Item} = require('../Model/Item');
const {Img} = require('../Model/Img');
const {v4:uuid4} = require('uuid');
const fs = require('fs');
const {STATIC_ROOT} = require('../../../config')


const ItemView = {

}


ItemView.listItems = async (req,h) => {

    return {
        msg: 'get item list'
    }
}

ItemView.createItem = async (req,h) => {

    // connect to mysql 
    const connection = await req.app.db.getConnection() ;

    // create Item table if not exist 
    let res ;
    let errMsg ;
    try {
        res = await req.app.db.query(connection,Item.createItemTable);
    } catch (err) {
        console.log(err.sqlMessage) ;
        errMsg = err.sqlMessage ;
        connection.release();
        return {
            err: errMsg
        }
    }

    try {
        res = await req.app.db.query(connection,Img.createImgTable);
    } catch (err) {
        console.log(err.sqlMessage) ;
        errMsg = err.sqlMessage ;
        connection.release();
        return {
            err: errMsg
        }
    }

    // (item_name,market_price,price) 
    const {payload} = req; 

    let item_name = null;
    let market_price = null ;
    let price = null ;

    if(payload){
        item_name = payload.item_name ;
        market_price = payload.market_price ;
        price = payload.price ;
    }

    const schema = Joi.object({

        item_name: Joi.string().required(),
        market_price: Joi.number(),
        price: Joi.number(),

    }) ;

    try {
        await schema.validateAsync({
            item_name: item_name,
            market_price: market_price,
            price: price,
        })
    } catch (err) {
        console.log(err);
        return {
            msg : err.details
        }
    }

    const createItem = Item.insertItem(item_name,market_price,price);

    try {
        res = await req.app.db.query(connection,createItem);
    } catch (err) {
        console.log(err.sqlMessage) ;
        errMsg = err.sqlMessage ;
    }

    // release the coonnection back to pool 
    connection.release();

    return {
        msg: res,
        err: errMsg 
    }

}

ItemView.itemDetail = async (req,h) => {


    const itemID = req.params.id ;

    const connection = await req.app.db.getConnection() ;

    let res ;
    let errMsg ;
    try {
        res = await req.app.db.query(connection,Item.getItem(itemID));
        res = res[0];
    } catch (err) {
        console.log(err.sqlMessage) ;
        errMsg = err.sqlMessage ;
        return {
            err: errMsg
        }
    }
     
    connection.release();

    return {
        item: res,
    }
}

ItemView.updateItem = async (req,h) => {

    const itemID = req.params.id ;

    const {payload} = req; 

    let item_name = null;
    let market_price = null ;
    let price = null ;

    if(payload){
        item_name = payload.item_name ? payload.item_name: null ;
        market_price = payload.market_price ? payload.market_price : null ;
        price = payload.price ? payload.price : null ;
    }

    const schema = Joi.object({

        item_name: Joi.string().required(),
        market_price: Joi.number(),
        price: Joi.number(),

    }) ;

    try {
        await schema.validateAsync({
            item_name: item_name,
            market_price: market_price,
            price: price,
        })
    } catch (err) {
        console.log(err);
        return {
            msg : err.details
        }
    }

    const connection = await req.app.db.getConnection() ;

    let res ;
    let errMsg ;
    try {
        res = await req.app.db.query(connection,Item.getItem(itemID));
        res = res[0];
    } catch (err) {
        console.log(err.sqlMessage) ;
        errMsg = err.sqlMessage ;
        connection.release();
        return {
            err: errMsg
        }
    }

    if (res){
        item_name = item_name ? item_name : res.item_name ;
        market_price = market_price ? market_price : res.market_price ;
        price = price ? price : res.price ;
    } else {
        connection.release();
        return {
            err: `item ${itemID} is empty`
        }
    }

    try {
        res = await req.app.db.query(connection,Item.updateItem(itemID,item_name,market_price,price));
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
        item: res,
    }

}


ItemView.deleteItem = async (req,h) => {

    const itemID = req.params.id ;

    const connection = await req.app.db.getConnection() ;

    let res ;
    let errMsg ;
    try {
        res = await req.app.db.query(connection,Item.deleteItem(itemID));
    } catch (err) {
        console.log(err.sqlMessage) ;
        errMsg = err.sqlMessage ;
        connection.release();
        
        return {
            err: errMsg
        }
    }
     
    connection.release();

    return {msg: res}

}

ItemView.chartList = async (req,h) => {

    return {
        msg: 'chart list view',
    };
}

ItemView.add2Chart = async (req,h) => {
    
    return {
        msg: 'add2Chart'
    }

}


ItemView.getOrderList = async (req,h) => {

    return {
        msg: 'get order items'
    }
}

ItemView.createOrder = async (req,h) => {

    return {
        msg: 'createOrder from chart'
    }
}

ItemView.editOrder = async (req,h) => {

    return {
        msg: 'editOrder'
    }
}

ItemView.deleteOrder = async (req,h) => {

    return {
        msg: 'deleteOrder'
    }
}

ItemView.createAddress = async (req,h) => {

    return {
        msg: 'createAddress'
    }
}

ItemView.getAddressList = async (req,h) => {

    return {
        msg: 'getAddressList'
    }
}

ItemView.getAddressDetail = async (req,h) => {

    return {
        msg: 'getAddressDetail'
    }
}

ItemView.editAddress = async (req,h) => {

    return {
        msg: 'editAddress'
    }
}

ItemView.deleteAddress = async (req,h) => {

    return {
        msg: 'deleteAddress'
    }
}

ItemView.uploadImage = async (req,h) => {

    const {payload} = req ;

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth()+1;
    const day = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();

    console.log(year+'-'+month+'-'+day+'-'+hour+'-'+minute+'-'+second);
    const filename = payload.filename;
    const item_id = payload.item_id;
    const sub_dir = `${item_id}/${year}/${month}/${day}`;
    const name_suffix = hour+'-'+minute+'-'+second ;
    const r = Math.random().toString(36).substring(7);
     
    let res = await req.app.fop.upload(`${STATIC_ROOT}/images/${sub_dir}`,filename,name_suffix,payload.file);
    console.log(res);

    if(res.isSucessful === false){
        return res;
    }

    console.log(`path_file = ${res.path_file}`);
    let rel_path_file = res.path_file ;
    const path_file_len = rel_path_file.length;
    rel_path_file = rel_path_file.slice(1,path_file_len);
    console.log(rel_path_file);
    
    // const url = req.connection.protocol 
    //         + '://'
    //         // + req.info.host
    //         + req.url.path ;

    const url = req.info.host

    // console.log(req.server.info.host);
    // console.log(req.server.info.protocol);
    // console.log(req.server.info.uri);
    // console.log(req.server.info.port);

    const url_res = `${req.server.info.uri}${rel_path_file}` ;
    const url_to_save_in_db = rel_path_file 
    
    console.log('url_to_save_in_db: ',url_to_save_in_db);

    // connect to mysql 
    const connection = await req.app.db.getConnection() ;
    // insert to image table 
    let errMsg ;
    try {
        res = await req.app.db.query(connection,Img.insertImg(item_id,url_to_save_in_db));
        console.log(res)
    } catch (err) {
        console.log(err) ;
        errMsg = err.sqlMessage ;
        connection.release();
        return {
            err: errMsg
        }
    }

    if(!res.insertId) {
        // insert image unsuccessful
        connection.release();
        return {
            err: 'insert image info to database unsuccessful'
        }
    }

    const ImgID = res.insertId;

    try {
        res = await req.app.db.query(connection,Img.getImg(ImgID));
        res = res[0];
        console.log(res)
        if (!res) {
            connection.release();
            return {
                err: 'insert image info to database unsuccessful'
            }
        }
    } catch (err) {
        console.log(err.sqlMessage) ;
        errMsg = err.sqlMessage ;
        connection.release();
        return {
            err: errMsg
        }
    }

    connection.release();

    console.log(req.server.info.uri)
    
    res.uri = `${req.server.info.uri}${res.uri}`;

    return {
        img: res
    }

}

ItemView.deleteImage = async (req,h) => { 

    
    const imageId = req.params.id ;

    // connect to mysql 
    const connection = await req.app.db.getConnection() ;

    let res ;
    let errMsg ;

    try {
        res = await req.app.db.query(connection,Img.getImg(imageId));
        res = res[0];
        console.log(res)
        if (!res) {
            connection.release();
            return {
                err: `image ${imageId} not exist in database`
            } 
        }
    } catch (err) {
        console.log(err.sqlMessage) ;
        errMsg = err.sqlMessage ;
        connection.release();
        return {
            err: errMsg
        }
    }

    // delete from dist   
    const file = `.${res.uri}` ;

    let isDeleted ;
    try {
        const res = await req.app.fop.delete(file);
        isDeleted = res.isDeleted ;
        console.log('isDeleted: ', isDeleted);
    } catch (err) {
        console.log(err);
        connection.release();
        isDeleted = err.isDeleted ;
        return {
            err: err
        }
    }

    // delete information from database
    try {
        res = await req.app.db.query(connection,Img.deleteImg(imageId));
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
        msg : res
    }

}


exports.ItemView = ItemView ;