'use strict';

const fs = require('fs');
const {STATIC_ROOT} = require('../../../config')

const fop = {
    
};

fop.delete = async (file) => {

    let isExisted = false ;

    try {
        const res = await fop.isFileExisted(file);
        isExisted = res.isExisted ;
    } catch (err) {
        isExisted = err.isExisted ;
    }

    if (isExisted === false){
        return {
            err: 'file not exist',
            isDeleted : true
        }
    }
    
    return new Promise((resolve,reject)=>{
        return fs.unlink(file,(err)=>{
            if(err){
                reject({
                    err: err,
                    isDeleted : false,
                });
            }

            resolve({msg: `${file} deleted`,
                    isDeleted : true
            });
        })
    })
}


fop.isPathExisted = async (path) => {
    return new Promise((resolve,reject)=>{
        return fs.stat(path,(err,stats)=>{
            // fs.stat(path[, options], callback)
            if(err) {
                return reject(err);
            }
            return resolve(stats);
        })
    })
}

fop.isFileExisted = async (file) => {
    return new Promise((resolve,reject)=>{
        // const file = `${path}/${filename}` ;
        return fs.access(file,fs.constants.F_OK,(err)=>{
            // fs.access(filename, mode, callback(err))
            // mode: fs.constants.F_OK , check if file exist 
            //       fs.constants.R_OK , check if file read ok
            //       fs.constants.W_OK , check if file write ok
            if(err) {
                return reject({err: err,
                    isExisted: false
                });
            }
            return resolve({msg: `${file} exist`,
                            isExisted: true
                });
        })
    })
}

fop.createPathRecursively = async (path) => {
    // fs.mkdir('/tmp/a/apple', { recursive: true }, (err) => {
    //     if (err) throw err;
    //   });

    return new Promise((resolve,reject)=>{
        return fs.mkdir(path,{recursive: true},(err)=>{
            if(err) {
                return reject(err);
            }
            return resolve(true);
        })
    })

}

fop.upload_promise = async (path,filename,payload_file) => {
    return new Promise((resolve,reject)=>{
        return fs.writeFile(`${path}/${filename}`,payload_file,err => {
            if(err){
                reject(err);
            }
            resolve({msg: 'uploaded successfully'});
        })
    })
}

fop.upload = async (path,filename,name_suffix,payload_file) => {
    // 1. create path if not exit
    
    let pathExist ;
    let err ;

    try {
        pathStats = await fop.isPathExisted(path);
        pathExist = pathStats.isDirectory() ;
    } catch (err) {
        console.log(`${path} not exist, need create one`);
        pathExist = false ;
    }

    // const pathExist =false ;

    // console.log(pathStats)

    let createPath ;
    if(pathExist===false){
        try{
            console.log(`creating path : ${path}`);
            createPath = await fop.createPathRecursively(path);
        } catch (err) {
            console.log(err);
            throw err ;
        }
    }
    

    // 2. upload file,and save as filename, if exist, append random letters infront of the filename
    let isExisted = false ;
    try {
        const filename_split = filename.split('.');
        const len = filename_split.length;
        const first_part = filename_split.slice(0,-1);
        const last_part = filename_split.splice(-1,len);
        
        filename = first_part+'_' + name_suffix + '.' + last_part ;
        const file = `${path}/${filename}` ;
        const res = await fop.isFileExisted(file);
        isExisted = res.isExisted ;
    } catch (err) {
        // console.log(err);
        isExisted = err.isExisted ;
    }

    if (isExisted === true) {
        // append random letters 
        const r = Math.random().toString(36).substring(7);
        const filename_split = filename.split('.');
        const len = filename_split.length;
        const first_part = filename_split.slice(0,-1);
        const last_part = filename_split.splice(-1,len);
        
        filename = first_part+'_' + name_suffix + '_' + r + '.' + last_part ;

    } 

    try {
        await fop.upload_promise(path,filename,payload_file)
    } catch (err) {
        console.log(err);
    }

    // double check if file uploaded successfully 
    try {
        const file = `${path}/${filename}` ;
        console.log('file: ',file);
        const res = await fop.isFileExisted(file);
        isExisted = res.isExisted ;
        console.log(res)
    } catch (err) {
        console.log(err);
        isExisted = err.isExisted ;
    }

    if (isExisted === true){
        console.log('upload succeed');
        return {
            msg: 'upload succeed',
            path_file: `${path}/${filename}`,
            isSuccessful : true
        }
    } else {
        console.log(err);
        return {
            isSuccessful: false ,
            err: 'file upload not successful'
        }
    }
    
}

fop.attachConnection = async (request, h) => {
    request.app.fop = fop ;

    return h.continue ;
}


exports.plugin = {
    name: 'fop',
    version: '1.0.0',
    register : async function(server, options) {

        // attach mysql methods to request 
        server.ext('onPreAuth', fop.attachConnection); // 注冊事件，在每個request來時調用回調函數


        console.log("fop(file operation) plugin registered");

    }

}