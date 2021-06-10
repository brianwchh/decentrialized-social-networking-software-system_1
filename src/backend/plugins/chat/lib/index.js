'use strict'

const webSocket = require("ws");
const {rmValFromArray,isValInArray} = require('./utils');
const ipport= require('../../../ipport');
const wRTC = require('wrtc')
const querystring = require('querystring');
const {WebSocketCode} = require('./WebSocketCode')

const myIP = `${ipport.ip}:${ipport.port}` ;
const {onMessage} = require('./onMessage/onMessage')

const {isLogin} = require('../../../auth_validates/isLogin')
const {User_Model} = require('../../../api/User/Model/User_Model')
const {Contact_Model} = require('../../../api/Contact/Model/Contact_Model')
const {wsuri} = require('../../../ipport')
const {outgoingSockets,incomingSockets} = require('./manageSockConns')


/**
 * public protocol : message data layout
 *     _______________________________________________________________
 *    |      FROM     |  TO      |     DATA                |TYPE_OUTER |       
 *    |_______________|__________|_________________________|___________|
 *                               /                          \
 *                              /                            \
 *                             /______________________________\
 *                            |TYPE_INNER| PAYLOAD   | MSG_ID  |
 *                            |__________|___________|_________|
 * 
 * 
 * 
 * 
    socket_conn.send(JSON.stringify({
    "TO" : {
        "URL" : "the domain name or IP of contact",
        "ID"     : "the ID of the contact on his cloud server,the destination domain may contain serveral family members",  
    },
    "FROM" : {
        "URL" : "the domain name or IP of sender",
        "ID"     : "the ID of the sender on his cloud server,the source domain may contain serveral family members", 
    },
    "TYPE_OUTER" : "HEARTBEAT"
    "DATA" : {
        "TYPE_INNER"   : "HEARTBEAT",
        "PAYLOAD":  "I miss you" 
    },
    "MSG_ID" : msg_id
}))
    * 
    */

const sendMsg = (socket_conn, to, from, type_outer, type_inner, payload,msg_id) => {

    socket_conn.send(JSON.stringify({
        TO : to ,
        FROM : from,
        TYPE_OUTER : type_outer,
        DATA : {
            TYPE_INNER   : type_inner,
            PAYLOAD      : payload 
        },
        MSG_ID : msg_id
    }))

}


exports.plugin = {
    name: 'chat',
    version: '1.0.0',
    register : async function(server, options) {

    // create webSocket servver 

    let wss = new webSocket.Server({
        server: server.listener,
        // clientTracking: false,
    })

    /**
     *  
        // wss Events
        on(event: 'connection', cb: (this: Server, socket: WebSocket, request: http.IncomingMessage) => void): this;
        on(event: 'error', cb: (this: Server, error: Error) => void): this;
        on(event: 'headers', cb: (this: Server, headers: string[], request: http.IncomingMessage) => void): this;
        on(event: 'close' | 'listening', cb: (this: Server) => void): this;
        on(event: string | symbol, listener: (this: Server, ...args: any[]) => void): this;
     */

    wss.on('connection',async function (socket,req){
        console.log("new connection established");
        console.log("the number of connected clients ",wss.clients.size);
        
        const queryStringJson= JSON.stringify(querystring.parse(req.url.split('?')[1],'&','='))
        const queryStringObj = JSON.parse(queryStringJson)

        // 1. check if token exist 
        if (queryStringObj.hasOwnProperty("token") === false ) {
            // token not exist,close the connection and reply with error message
            console.log('key token not found, closing incoming socket connection ... ,at if (queryStringObj.hasOwnProperty("token") === false )')
            socket.close(WebSocketCode.UnsupportedData, "token not found,at backend,at if (queryStringObj.hasOwnProperty('token') === false )");

            return
        }
        
        // 2. check if it is a connetion from a user by querying user via token 
        // 2.1 get user_id from redis_cache
        let user_id = null;
        const token = queryStringObj.token ;
        let isUserOnThisServer = false;
        let isContactFromOtherServer = false ;
        let isMemberOfChatRoom = false ; // 是否爲自己某個chatRoom的成員
        let isFromGroupYouJoined = false ; // 是否爲自己加入的別人服務器上的group


        // get postfix from an token for better identifying which Category the incoming connection belongs to
        // User ? Contact ? Group ? memberOfChatroom ? since token2AccessHim and tokenAssigned2Him are kind of protocol before contact become contact
        const tokenSplitedArray = token.split('_')
        const category = tokenSplitedArray.slice(-1)[0] 

        console.log(tokenSplitedArray)
        console.log(category)

        switch(category) {
            case 'Contact' :  {
                isContactFromOtherServer = await queryIfIsContact(server,token,socket)
                break ;
            }

            case 'Group' :   {

                break ;
            }

            case 'Chatroom' :   {

                break ;
            }

            default :  {
                //  user 
                isUserOnThisServer = await queryIfIsUser(server,token,socket)
            }
        }

       
        // 4. TODO: query in database if it is from a member of my chatRoom by the token I assign to him (it might as well a contact)


        // 5. TODO: query in database if it is from a group I joined by the token I assign to him



        // if not a user nor a contact,then refuse the connection.
        if (isUserOnThisServer == false && isContactFromOtherServer == false && isMemberOfChatRoom == false && isFromGroupYouJoined == false ){
            console.log(`in index.js of chat plugin,function wss.on('connection',async function (socket,req),neither a user nor a contact`)
            socket.close(WebSocketCode.UnsupportedData, "not a valid user nor a valid contact");
        }

        
        // 3. setup callback functions
        /**
         * socket  Events
                on(event: 'close', listener: (this: WebSocket, code: number, reason: string) => void): this;
                on(event: 'error', listener: (this: WebSocket, err: Error) => void): this;
                on(event: 'upgrade', listener: (this: WebSocket, request: http.IncomingMessage) => void): this;
                on(event: 'message', listener: (this: WebSocket, data: WebSocket.Data) => void): this;
                on(event: 'open' , listener: (this: WebSocket) => void): this;
                on(event: 'ping' | 'pong', listener: (this: WebSocket, data: Buffer) => void): this;
                on(event: 'unexpected-response', listener: (this: WebSocket, request: http.ClientRequest, response: http.IncomingMessage) => void): this;
         */
        // on socket message
        socket.on('message',async (message) => {
            onMessage(server,socket,message)
        });
        
        // on socket close
        socket.on('close', ()=>{
            const socket_conn_key = socket.socket_id_key
            console.log(socket_conn_key)
            console.log("the number of connected clients ",wss.clients.size);
            if(incomingSockets.hasOwnProperty(socket_conn_key) == true){
                delete incomingSockets[`${socket_conn_key}`]
            }
            console.log('websocket closed');
        })

        // on socket upgrade
        socket.on('upgrade', (req) => {
            console.log("on socket upgrade ")
        })

        // on socket open 
        socket.on('open', () => {
            console.log("on socket open ")
        })

        // on socket error 
        socket.on('error', (error) => {
            console.log("on socket error :" , error)
        })

    });

    }

} 


const queryIfIsContact  = async (server,tokenAssigned2Him,socket) =>  {

    let isContactFromOtherServer = false ;

    // 3. query in database if it from contact by the token I assign to him
    let sqlResult = await server.app.db.query(Contact_Model.queryContactViaTokenAssigned2Him(tokenAssigned2Him));
    // check if Error happen in query or querySet returns nothing
    if (sqlResult.errorArray.length != 0 || sqlResult.querySet.length == 0){
        console.log(`in index.js of chat plugin,function wss.on('connection',async function (socket,req),can not find the contact info with this token in database`)

    } else {
        isContactFromOtherServer = true 
        const hisID = sqlResult.querySet[0]['hisID']
        const webSocketUrl = sqlResult.querySet[0]['webSocketUrl']
        const socket_conn_id = String(`${webSocketUrl}+${hisID}`)

        // if socket_conn_id exist,close it and save the newest one 
        if(incomingSockets.hasOwnProperty(`${socket_conn_id}`) == true){
            incomingSockets[`${socket_conn_id}`].close(WebSocketCode.ProtocolError, `duplicate connection ...`)
            console.log(`in index.js of chat plugin,function wss.on('connection',(incomingSockets.hasOwnProperty(${socket_conn_id}) == true),socket_conn_id exist,close it`)
        }
        socket['socket_id_key'] = `${socket_conn_id}` ;  // 方便知道自己是誰
        incomingSockets[`${socket_conn_id}`] = socket    // 用於用socket_conn_id找到自己
    }

    return  isContactFromOtherServer
}


const queryIfIsUser = async (server,token, socket) => {

    let isUserOnThisServer = false ;

    const redisRes = await server.app.redis_cache.get(token);

    if (redisRes.errorArray != 0){  // any cached errors ??? something wrong
        console.log('plugin chat index.js : ', redisRes.errorArray)
        // query redis error 
        socket.close(WebSocketCode.ProtocolError, `plugin chat index.js, query redis error :  ${redisRes.errorArray}`);
        // return 
    } else if (redisRes.dataArray[0] == null ){ // token not valid  
            console.log(`in index.js of chat plugin,function wss.on('connection',async function (socket,req),token not valid,at if (redisRes.dataArray[0] == null)`)
            socket.close(WebSocketCode.ProtocolError, `plugin chat index.js, query user by token, user not exist`);
    } else {
        isUserOnThisServer = true ;
    }

    // save the incoming socket in a dictionary
    if (isUserOnThisServer === true){
        const user_id = redisRes.dataArray[0] 
     
        // 2.2 query user info (for saving socket connections) by user_id    
        let sqlResult = await server.app.db.query(User_Model.getUserViaId(user_id));

        // check if Error happen in query or querySet returns nothing
        if (sqlResult.errorArray.length != 0 || sqlResult.querySet.length == 0){
            console.log(`in index.js of chat plugin,function wss.on('connection',async function (socket,req),can not find the user info with this token in database`)
            // socket.close(WebSocketCode.ProtocolError, `plugin chat index.js, query user by id goes wrong ...`);
            // return  // do not return from here,if not a user maybe a contact from other server
        } else {
            const user_name = sqlResult.querySet[0]['name']
            const socket_conn_id = String(`${wsuri}+${user_name}`)
    
            // if socket_conn_id exist,close it and save the newest one 
            if(incomingSockets.hasOwnProperty(`${socket_conn_id}`) == true){
                incomingSockets[`${socket_conn_id}`].close(WebSocketCode.ProtocolError, `duplicate connection ...`)
                console.log(`in index.js of chat plugin,function wss.on('connection',(incomingSockets.hasOwnProperty(${socket_conn_id}) == true),socket_conn_id exist,close it`)
            }
            socket['socket_id_key'] = `${socket_conn_id}` ;  // 方便知道自己是誰
            incomingSockets[`${socket_conn_id}`] = socket    // 用於用socket_conn_id找到自己
            console.log(`in index.js of chat plugin,function wss.on('connection',adding new socket to incomingSockets[${socket_conn_id}] = socket `)
        }
    }


    return  isUserOnThisServer ;

}

