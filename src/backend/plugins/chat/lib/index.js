'use strict'

const webSocket = require("ws");
const {rmValFromArray,isValInArray} = require('./utils');
const ipport= require('../../../ipport');
const wRTC = require('wrtc')


// const myIP = 'http://localhost:6464';
const myIP = `${ipport.ip}:${ipport.port}` ;

const friendIpArray = [
    "http://localhost:8989"
];


let connections = {};

exports.plugin = {
    name: 'chat',
    version: '1.0.0',
    register : async function(server, options) {

    let wss = new webSocket.Server({
        server: server.listener,
        // clientTracking: false,
    })

    // console.log('db: ', server.app.db);

    
    let userList = [];
    let conection ;

    const queryUsers = `
            SELECT name
            FROM User
        `;

    userList = await server.app.db.query(conection,queryUsers);

    // for(let i=0; i<res.length; ++i){
    //     userList.push(res[i].name);
    // }
    // console.log(userList)



    const createPeerConnection = () =>  {
        
        const newPeerConnection = wRTC.RTCPeerConnection({
            iceServers: [     // Information about ICE servers - Use your own!
                {
                    urls : 'stun:stun.l.google.com:19302'
                }
            ]
        });
  
        // newPeerConnection.onicecandidate = this.handleICECandidateEvent;
        // newPeerConnection.ontrack = this.handleTrackEvent;
        // newPeerConnection.onnegotiationneeded = this.handleNegotiationNeededEvent;
        // newPeerConnection.onremovetrack = this.handleRemoveTrackEvent;
        // newPeerConnection.oniceconnectionstatechange = this.handleICEConnectionStateChangeEvent;
        // newPeerConnection.onicegatheringstatechange = this.handleICEGatheringStateChangeEvent;
        // newPeerConnection.onsignalingstatechange = this.handleSignalingStateChangeEvent;
  
  
        console.log(newPeerConnection) ;

        return newPeerConnection ;
        
      };

    wss.on('connection',async function (socket){
        console.log("connection established");
        console.log("connected clients ",wss.clients.size);

        const newPeerConnection = wRTC.RTCPeerConnection({
            iceServers: [     // Information about ICE servers - Use your own!
                {
                    urls : 'stun:stun.l.google.com:19302'
                }
            ]
        });
  

        console.log("peerconnection = ",newPeerConnection);

        let me ;

        // sendTo(socket, {
        //     "type" : "message" ,
        //     "from" : "server" ,
        //     "data" : "connection with signaling server establihed"
        // })

        socket.on('message',async (message) => {
            connections,me = await handleMessage(socket,message,connections,userList,me);
            console.log("number of users: ",Object.keys(connections).length)
            console.log(userList)
        });
        
        socket.on('close', ()=>{
            if(!me){
                return ;
            }

            try{
                delete connections[me.ip+'/'+me.name];
                userList = rmValFromArray(userList,me);
            } catch (err) {
                console.log(err)
                return
            }

            // notify all login users the userlist
            console.log("socket onClose ...., remainded users : ", userList.length);
            for(let i=0; i<userList.length; i++){
                let conn = '';
                let user = '';
                try {
                    user = userList[i];
                    const ip = 'http:/localhost'
                    conn = connections[+'/'+user.name]; // if does not throw erro, mannually detect if null
                } catch (err) {
                    return;
                }

                sendTo(conn, {
                    type: "login",
                    success: true,
                    data : userList,
                });
            }
            
            console.log('websocket closed',);
        })

    });

    }

} 

const sendTo = function (connection,message) {
    if (!connection){
        console.log("socket connection is null,please check bug")
        return ;
    }
    connection.send(JSON.stringify(message))
}


const handleMessage = async function (connection,message, connections, userList, me) {
    /**
     * the message structure we receive from peer 
     * message {
     *      "type" :  "login"/"message" ,
     *      "from" :  "server" / "peer",
     *      "to"   :   '',
     *      "success"   : true/false
     *      "data" :  {
     *                   "type" : "offer"/"answer"/"candidate",
     *                   "data" :  databody of corresponding type above
     *                 }
     * }
     */

    let msg = {};
    console.log(message)

    try {
        msg = JSON.parse(message)
        console.log(msg)
    } catch (e) {
        console.log('invalid jason data format');
        msg = {};
    }

    let user_name ;
    let user_ip ;


    switch (msg.type) {
        case "login" :
            console.log(`user ${msg.from.ip} ${msg.from.name} is trying to log in `);

            sendTo(connection, {
                type: "login",
                success: true,
                data : userList,
            });


            break;

        case "message" :
            console.log(`trying to connect to user ${msg.to.ip}/${msg.to.name}`);
            const dest_user = msg.to; 
            /* dest_user = {
                IP : 127.0.0.1:8989,
                name : root/someone/....
            }
            */ 
            const dest_user_ip = dest_user.ip ;
            const dest_user_name = dest_user.name ;
            let conn_of_server_n_dest_user = '';

            // check whether dest_user_ip === myIP ;
            if (dest_user_ip !== myIP ){
                    // check whether the user's signaling server is connected to this server as client 
                    const sockect_dest_as_client = connections[dest_user_ip]
                    if(sockect_dest_as_client){
                        console.log("the other server is already connected as client.....")
                        // if yes, select the existing socket, forward the message 
                        sendTo(sockect_dest_as_client, {
                            type: "message",
                            from: msg.from,
                            to : msg.to,
                            data: msg.data
                        });
                    } else {
                        // check whether this siangling server is connected to the dest signaling server 
                        // if not, create a new socket connect to the server 
                        let socket_this_server_as_client = connections_this_singalServer_as_client[dest_user_ip];
                        if (!socket_this_server_as_client){
                            console.log("connecting to other server as client .... ")
                            // const wsuri = "ws://localhost:6464";
                            const dest_user_ip_sep = dest_user_ip.split(":") ;
                            const destIpString = `${dest_user_ip_sep[1]}:${dest_user_ip_sep[2]}` ;
                            console.log("destIpString : ",destIpString);
                            const wsuri = `ws:${destIpString}`;
                            console.log(wsuri);
                            // initWebSocket(wsuri,(socket_this_server_as_client)=>{
                            //     sendTo(socket_this_server_as_client, {
                            //         "type": "message",
                            //         "from": msg.from,
                            //         "to" : msg.to,
                            //         "data": msg.data
                            //     });
                            //     connections_this_singalServer_as_client[dest_user.ip] = socket_this_server_as_client ;
                            // });
                            console.log("connection to other server.....")
                            try{
                                socket_this_server_as_client = await initWebSocket(wsuri) ;
                                console.log("socket to other server established");
                            } catch(err) {
                                console.log(err)
                            }

                            connections_this_singalServer_as_client[dest_user_ip] = socket_this_server_as_client;

                        } 
                        console.log("already connected to other server as client .... ")
                        console.log("sending message to the other server ... ")

                        sendTo(socket_this_server_as_client, {
                            type: "message",
                            from: msg.from,
                            to :  msg.to,
                            data: msg.data
                        })
                        
                    }
                    
                
            }

            //if equal to myip, determine which user is sent to 
            if (msg.from.ip !== myIP){
                if(!connections[msg.from.ip]){
                    console.log('detected a new connection from other server,adding to connections as client ..')
                    connections[msg.from.ip] = connection ;
                }
            } 
            
            conn_of_server_n_dest_user = connections[dest_user.ip+'/'+dest_user.name];

            if(!conn_of_server_n_dest_user){

                sendTo(connection, {
                    type: "message",
                    from: msg.to,
                    to : msg.from,
                    success: false,
                    data: `user ${dest_user.ip}/${dest_user.name} not exist or not on line`
                });

            } else { 
                // user exist or online 
                sendTo(conn_of_server_n_dest_user, {
                    type: "message",
                    from: msg.from,
                    to : msg.to ,
                    success: true,
                    data: msg.data
                });
            } 

            break;

        default:
            console.log("command type not found");
            // connection.send(JSON.stringify({"message": "log in failed"}));
            break;
    }

    return connections,me ;
};



let connections_this_singalServer_as_client = {};



const websocketOnMessage = function(msg) {
    const message = JSON.parse(msg);

    /**
     * the message structure we receive from the other signaling server 
     * message {
     *      "type" :  "login"/"message" ,
     *      "from" :  "server" / "peer",
     *      "to"   :   '',
     *      "success"   : true/false
     *      "data" :  {
     *                   "type" : "offer"/"answer"/"candidate",
     *                   "data" :  p2p databody of corresponding type above
     *                 }
     * }
     */

    switch (message.type) {

        case "message" :
            // sent data via connections[username]
            console.log("message")
            const dest_user = message.to ;

            const conn_with_dest_user = connections[dest_user.ip+'/'+dest_user.name];

            if(!conn_with_dest_user){
                console.log("conn_with_dest_user is null, what went wrong ?")
                // sendTo(connection, {
                //     "type": "message",
                //     "from": msg.to,
                //     "to" : msg.from,
                //     "success": false,
                //     "data": `user ${dest_user.ip}/${dest_user.name} not exist or not on line`
                // });

            } else { 
                // user exist or online 
                console.log("sending .... ")
                sendTo(conn_with_dest_user, {
                    type: "message",
                    from: message.from,
                    to : message.to ,
                    data: message.data
                });
            } 

            break;

        default :
            console.log("command type not found")
            break;
    }

};

const websocketOnOpen = function(wsuri) {
    console.log(`connection with the other user's signal server ${wsuri} established`)
};

const websocketOnError = function() {
  // this.initWebSocket();
};

const websocketOnClose = function(e) {
  console.log('disconnected from signaling server', e);
};


const initWebSocket = async function (wsuri) {

    const sock_conn = new webSocket(wsuri);

    let socket_open ;

    sock_conn.on('open', (sock_conn)=>{
        console.log('connection open');
        socket_open = true ;
    })
    
    sock_conn.on('close', ()=>{
        console.log('disconnected')
        websocketOnClose();
    })
    
    sock_conn.on('message', (message)=>{
        console.log("sock_conn.on message")
        console.log(message)
        websocketOnMessage(message);
    })

    return new Promise(function(resovle,reject){

        let wait = setTimeout(() => {
            clearTimeout(wait);
            if (socket_open===true) {
                resovle(sock_conn)
            } else {
                reject("connection to other signaling server error")
            }
          }, 2000)
    })

};