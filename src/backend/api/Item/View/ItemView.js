'use strict' 

const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi')
const {rootname} = require('../../../config')
const {Item} = require('../Model/Item');
const {Img} = require('../Model/Img');
const {v4:uuid4} = require('uuid');
const fs = require('fs');
const {STATIC_ROOT} = require('../../../config')
const {ip,host,port,deploy,outerIP} = require('../../../ipport')


// const AWS_outerIP =  'http://52.79.86.10:8964' ; 
const AWS_outerIP =  outerIP;

const ItemView = {

}


ItemView.listItems = async (req,h) => {

    // connect to mysql 
    const connection = await req.app.db.getConnection() ;
    // console.log('get connection')

    let res ;
    let errMsg ;

    try {
        res = await req.app.db.query(connection,Item.getItemList);
        if (!res) {
            connection.release();
            return {
                err: '',
                data : '',
                msg : 'empty query set'
            }
        }
        
        // console.log(res)

        // add image info to array
        const cnt = res.length;
        let i = 0;
        for(i=0;i<cnt;++i){
            const item_id = res[i].id ;
            // query images on item_id 
            try{
                const img_res = await req.app.db.query(connection,Img.getImgs(item_id))
                const img_len = img_res.length;
                let img_array = [];
                let j=0; 
                for(j=0;j<img_len;++j){
                    const url = img_res[j].uri;
                    // img_array.push(`${req.server.info.uri}${url}`);
                    img_array.push(`${AWS_outerIP}${url}`); 
                }
                // console.log(img_res);
                res[i]['imgArray'] = img_array;
                // console.log(res[i]);
            } catch (err) {
                console.log(err);
            }
        }

        // let resObj = {}; // key = id, value = {item_name: item_name,market_price: market_price,uri: uri ...}

        // res.forEach(el => {
        //     console.log("***************************")
        //     console.log('el :', el);
        //     if(el.uri !== null) {
        //         console.log('el:' , el.uri);
        //         const url = el.uri ;
        //         el.uri = `${req.server.info.uri}${url}`;
        //     }
        //     // check if has key = el.id, if not,create one, 
        //     console.log('is key exist : ',resObj.hasOwnProperty(el.id));
        //     if(resObj.hasOwnProperty(el.id) === false){
        //         console.log('if key not exist');
        //         let uri_arry = [];
        //         console.log(el.uri);
        //         if (el.uri !== null){
        //             console.log('xxxooo')
        //             uri_arry.push(el.uri);
        //             console.log('whatwhathaihl')
        //         }
        //         console.log(uri_arry);
        //         resObj[el.id] = {
        //             item_name: el.item_name ,
        //             market_price : el.market_price ,
        //             price : el.price ,
        //             uri : uri_arry,
        //         }
        //         console.log(resObj)
        //     } else {
        //         // otherwise append uri to existing uri array
        //         const key = String(el.id) ;
        //         if(el.uri){
        //             resObj[key].uri.push(el.uri);
        //         }
        //     }

        // });

        // console.log(resObj)
        connection.release();
        return {
            err: '',
            data: res
        }
    } catch (err) {
        console.log(err.sqlMessage) ;
        errMsg = err.sqlMessage ;
        connection.release() // bad method, should release() right after each operation.
        return {
            err : err.sqlMessage,
            data: ''
        }
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


    const item_id = req.params.id ;

    const connection = await req.app.db.getConnection() ;

    let res ;
    let errMsg ;
    try {
        res = await req.app.db.query(connection,Item.getItem(item_id));
        res = res[0];

        // query images on item_id 
        try{
            const img_res = await req.app.db.query(connection,Img.getImgs(item_id))
            const img_len = img_res.length;
            let img_array = [];
            let j=0; 
            for(j=0;j<img_len;++j){
                const url = img_res[j].uri;
                // img_array.push(`${req.server.info.uri}${url}`);
                img_array.push(`${AWS_outerIP}${url}`); 
            }
            // console.log(img_res);
            res['imgArray'] = img_array;

        } catch (err) {
            errMsg = err.sqlMessage ;
            console.log(err);
            connection.release();
            return {
                err: errMsg
            }
        }

        connection.release();

        console.log(res);
        
        return {
            err: '',
            data: res
        }


    } catch (err) {
        console.log(err.sqlMessage) ;
        errMsg = err.sqlMessage ;
        connection.release();
        return {
            err: errMsg
        }
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
    // for aws req.server.info gives an internal ip address.
    // here we need public addres.....
    
    // res.uri = `${req.server.info.uri}${res.uri}`;
    // have to add it mannually .....
    res.uri = `AWS_outerIP${res.uri}`;

    console.log('ItemView current Uri : ' , res.uri );

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