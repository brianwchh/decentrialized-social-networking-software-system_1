'use strict';

const fs = require('fs');
const {STATIC_ROOT} = require('../../../config')

const sfs = {
    
};

const checkFileExisted = async (file) => {
    return new Promise((resolve,reject)=>{
        return fs.access(file,fs.constants.F_OK,(err)=>{
            // fs.access(filename, mode, callback(err))
            // mode: fs.constants.F_OK , check if file exist 
            //       fs.constants.R_OK , check if file read ok
            //       fs.constants.W_OK , check if file write ok
            if(err) {
                return reject(err);
            }
            return resolve(true);
        })
    })
}

const readFile = async (pathname) => {
    return new Promise((resole,reject)=>{
        return fs.readFile(pathname, function(err, data){
            if(err){
                reject(err);
            } else {
                resole(data)
            }
        })
    })
}


sfs.pathHandler = async (req,h) => {

    const pathname = `.${req.url.pathname}`;
    // console.log(pathname);

    // // check if pathname exist 
    // let isFileExisted = false ;
    // try {
    //     isFileExisted = await checkFileExisted(pathname);
    // } catch (err) {
    //     // console.log(err);
    //     isFileExisted = false ;
    // }

    // if(isFileExisted === false){
    //     return {
    //         err: 'file not exist'
    //     }
    // }

    // // if exist read file and return to user
    // let data;
    // let err;
    // try {
    //     data = await readFile(pathname);
    // } catch (err) {
    //     return {
    //         err: err
    //     }
    // }

    // console.log(h.response.toString())

    return h.file(pathname);
    
    // return h.response(data).header("lajlafj");

}

exports.plugin = {
    name: 'staticfileserver',
    version: '1.0.0',
    register : async function(server, options) {


        server.route({
            method: 'GET',
            path: '/public/{file*}',
            handler: sfs.pathHandler
        });

        console.log("static file server plugin registered");

    }

}