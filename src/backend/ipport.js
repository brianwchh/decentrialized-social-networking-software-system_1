// const ip='http://localhost:6464' ;
// // const ip='http://192.168.11.127:6464' ;
// const host='localhost';
// // const host = '192.168.11.127' ;  // hackend server address 
// const port='6464' ;

// exports.ip = ip ;
// exports.port = port ;
// exports.host = host ;

'use strict'

const deploy = false ;

const host= deploy === true ? '172.31.47.8' : 'localhost';
const port= deploy === true ? '8964' : '6464' ;

const ip=  `http://${host}:${port}` ;

const outerIP = deploy === true ? `https://52.79.86.10:${port}` : `http://localhost:${port}` ;


// exports = {host,ip,port,deploy}

exports.ip = ip ;
exports.port = port ;
exports.host = host ;
exports.deploy = deploy ;
exports.outerIP = outerIP ;