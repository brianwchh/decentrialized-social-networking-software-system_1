const {getSafeProperty} = require('../../../../utility/getSafeProperty')
const {WebSocketCode} = require('../WebSocketCode')
const {outgoingSockets,incomingSockets} = require('../manageSockConns')

const {proccessMsgOuterLayer} = require('./proccessMsgOuterLayer/proccessMsgOuterLayer')
const {wsuri} = require('../../../../ipport')
const webSocket = require("ws");
// const {User_Model} = require('../../../../../api/User/Model/User_Model');
const {User_Model} = require('../../../../api/User/Model/User_Model')
const {Contact_Model} = require('../../../../api/Contact/Model/Contact_Model')

    /**
     * public protocol : message data layout
     *     ___________________________________________ ___________
     *    |      FROM     |  TO      |     DATA       |TYPE_OUTER |       
     *    |_______________|__________|________________|___________|
     *                               /                 \
     *                              /                   \
     *                             /_____________________\
     *                            |TYPE_INNER| PAYLOAD   |
     *                            |__________|___________|
     * 
     * 
     * 
     * socket_conn.send(JSON.stringify({
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
        }
    }))
     * 
     */

const fileName = "onMessage.js"
let newSocket_conn_outgoing = ''

const onMessage = async (server ,socket, msgJson) => {

    const functionName = "onMessage(server ,socket, msgJson)"

    const msgObj = JSON.parse(msgJson)
    // safe check message properties
    const TO_URL = getSafeProperty(()=>msgObj.TO.URL, undefined)
    const TO_ID  = getSafeProperty(()=>msgObj.TO.ID, undefined)

    const FROM_URL = getSafeProperty(()=>msgObj.FROM.URL, undefined)
    const FROM_ID  = getSafeProperty(()=>msgObj.FROM.ID, undefined)

    const TYPE_OUTER = getSafeProperty(()=>msgObj.TYPE_OUTER, undefined)

    const TYPE_INNER = getSafeProperty(()=>msgObj.DATA.TYPE_INNER, undefined)
    const PAYLOAD = getSafeProperty(()=>msgObj.DATA.PAYLOAD, undefined)

    if (TO_URL == undefined || TO_ID == undefined 
        || FROM_URL == undefined || FROM_ID == undefined 
        || TYPE_OUTER == undefined || PAYLOAD == undefined
        || TYPE_INNER == undefined){
        socket.close(WebSocketCode.UnsupportedData,"TO_URL || TO_ID || FROM_URL || FROM_ID || TYPE_OUTER || PAYLOAD || TYPE_INNER not defined in message")
    }

    // check if TO_URL == current uri 
    if (TO_URL != wsuri){
        const db = getSafeProperty(()=>server.app.db, undefined )
        if (db == undefined ){
            debugLog(fileName,functionName,`db does not exist`)
            return ;
        }
        /**
         *  1. query if user exist 
         * */ 
        // very wrong to use promise like this,should use try and catch .....
        // todo : rewrite the query function
        let sqlResult = await db.query(User_Model.checkUserByIdOrName(FROM_ID)); // sender is the user on the current server

        // check if Error happen in query or querySet returns nothing
        if (sqlResult.errorArray.length != 0 || sqlResult.querySet.length == 0){
            sendMsg(socket_conn,from,to,'MSG','ERROR',`you are not a valid user + ${sqlResult.errorArray[0]}`) 
            return
        }
        const user_id = sqlResult.querySet[0]['id']

        /**
         *  2, check if contact exist
         */
        // queryContactViaIdOrName
        sqlResult = await db.query(Contact_Model.queryContactViaUser_idWebSocketUrlHisID(user_id,TO_URL,TO_ID));
        if (sqlResult.errorArray.length != 0 || sqlResult.querySet.length == 0){
            // if contact does not exist in Contact_Model,reply error message
            console.log(`in file ${fileName}, function ${functionName} ,cannot find contact ${FROM_URL},${FROM_ID}`)
            sendMsg(socket_conn,from,to,'MSG','ERROR',`contact: ${FROM_ID} is not registered on this server + ${sqlResult.errorArray[0]} `) 
            return
        }

        // if Contact exist 
        const token2AccessHim = sqlResult.querySet[0]['token2AccessHim']

        // 1.1 check if the current contact is connected to this server as websocket client 
        const socket_conn_id = String(`${TO_URL}+${TO_ID}`)
        const socket_conn_incoming = getSafeProperty(()=>incomingSockets[`socket_conn_id`], undefined )
        if (socket_conn_incoming === undefined){
            // check if already has an outgoing sockect as client exist 
            let socket_conn_outgoing = getSafeProperty(()=>outgoingSockets[`socket_conn_id`], undefined )
            // check if socket connected to other server existed,and still active ?

            let webSocketReadyState = getSafeProperty(()=>socket_conn_outgoing.readyState,undefined)
            console.log(`webSocketReadyState : ${webSocketReadyState}`)
            /**
                        Value        State                     Description
                        0            CONNECTING                Socket has been created. The connection is not yet open.
                        1            OPEN                      The connection is open and ready to communicate.
                        2            CLOSING                   The connection is in the process of closing.
                        3            CLOSED                    The connection is closed or couldn't be opened.
            */

            if (socket_conn_outgoing === undefined || webSocketReadyState != 1){
                // create new socket_conn_outgoing 
                try {
                    newSocket_conn_outgoing = await initWebSocket(server,TO_URL,token2AccessHim)
                    newSocket_conn_outgoing['socket_id_key'] = `${socket_conn_id}` 
                    outgoingSockets[`socket_conn_id`] = newSocket_conn_outgoing;
                } catch (error) {
                    console.log(error)
                }

            }
        }
    }
    
    proccessMsgOuterLayer(server, socket, msgObj)
}



/***
 *  create websocket connection to other server as a client 
 */

 const initWebSocket = async function (server,wsuri,token2AccessHim) {

    const sock_conn = new webSocket(`${wsuri}/?token=${token2AccessHim}`);

    let socket_open ;

    sock_conn.on('open', (sock_conn)=>{
        console.log('connection open');
        socket_open = true ;
    })
    
    sock_conn.on('close', ()=>{
        console.log('disconnected')
        websocketOnClose(sock_conn);
    })
    
    sock_conn.on('message', (msgJson)=>{

        const msgObj = JSON.parse(msgJson)
        proccessMsgOuterLayer(server, sock_conn, msgObj)

    })

    return new Promise(function(resovle,reject){

        let wait = setTimeout(() => {
            clearTimeout(wait);
            if (socket_open===true) {
                resovle(sock_conn)
            } else {
                reject("creating socket connection as client failed")
            }
          }, 2000)
    })

};

const websocketOnClose = function(sock_conn) {
    const key = sock_conn.socket_id_key
    if(outgoingSockets.hasOwnProperty(key) == true){
        delete outgoingSockets[`${key}`]
    }
};

exports.onMessage = onMessage

