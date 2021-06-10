// const ip='http://localhost:6464' ;
// // const ip='http://192.168.11.127:6464' ;
// const host='localhost';
// // const host = '192.168.11.127' ;  // hackend server address 
// const port='6464' ;

// exports.ip = ip ;
// exports.port = port ;
// exports.host = host ;

'use strict'

const deploy = true ;

const host= deploy === true ? '127.0.0.1' : 'localhost';
const port= deploy === true ? '6464' : '6464' ;

const frontEndPort = 3000

const ip=  `http://${host}:${port}` ;

const wsuri = deploy === true ? `wss://decensormedia.org/websocket` : `ws://localhost:${port}` ;
const my_wsuri = deploy === true ? `wss://decensormedia.org/websocket` : `ws://localhost:${port}` ;

const outerIP = deploy === true ? `https://decensormedia.org:${port}` : `http://localhost:${port}` ;

const frontEndUrl = deploy === true ? `https://decensormedia.org` : `http://localhost:${frontEndPort}` 

exports.ip = ip ;
exports.port = port ;
exports.host = host ;
exports.deploy = deploy ;
exports.outerIP = outerIP ;
exports.wsuri = wsuri ;
exports.my_wsuri = my_wsuri ;
exports.frontEndUrl = frontEndUrl ;

