const webSocket = require('ws');


const wsuri = 'ws://localhost:6464';

let socket_this_server_as_client ;

// try{
//     socket_this_server_as_client = await initWebSocket(wsuri) ;
//     console.log("socket to other server established");
// } catch(err) {
//     console.log(err)
// }

// const setupSocketCallback = function (sock_conn) {
//     sock_conn.on('open', (sock_conn)=>{
//         console.log('connected');
//         callback(sock_conn);
//     })
    
//     sock_conn.on('close', ()=>{
//         console.log('disconnected')
//         websocketOnClose();
//     })
    
//     sock_conn.on('message', (msg)=>{
//         console.log(msg)
//         websocketOnMessage(msg);
//     })
// }

// const initWebSocket = async function (wsuri) {

//     const sock_conn = new WebSocket(wsuri);

//     return new Promise(function(resovle,reject){
//         if (sock_conn) {
//             resovle(sock_conn)
//         } else (reject('socket not established'))
//     })

// };

const initWebSocket = async function (wsuri) {

    const sock_conn = new webSocket(wsuri);

    let socket_open = '';

    sock_conn.on('open', (sock_conn)=>{
        console.log('connection open');
        socket_open = true ;
        console.log("socket_open : ",socket_open)
    })

    
    sock_conn.on('close', ()=>{
        console.log('disconnected')
    })
    
    sock_conn.on('message', (msg)=>{
        console.log(msg)
    })

    return new Promise(function(resovle,reject){

        let wait = setTimeout(() => {
            clearTimeout(wait);
            if (socket_open===true) {
                resovle(sock_conn)
            } else {
                reject("connection error")
            }
          }, 1000)
    })

};

initWebSocket(wsuri)
.then((res)=>{
    console.log("connetion established")
})
.catch((err)=>{
    console.log("connection error",err)
})

// setupSocketCallback(socket_this_server_as_client);




