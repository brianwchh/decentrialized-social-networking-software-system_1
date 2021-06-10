import { authResetStateAction } from '../actions';
import {
        wsuri,
        cloudServer,
        cloudServerPort
    } from "../../../ipconfig"

import {proccessOuterLayerMsg} from './processPkg'

const webSocketEvents = {
    sendHeartBeat2CloudServer : null,
    isHeartBeatReceived : null ,
    websocketOnMessage: null,
    websocketOnOpen: null,
    websocketOnClose: null,
    websocketOnError : null,
    clearTimerEvents : null
}

    /**
     * public protocol 
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
     *  sock_conn.send(JSON.stringify({
            "TO" : {
                "DOMAIN" : "the domain name or IP of contact",
                "PORT"   : "the PORT of contact's cloud server ",
                "ID"     : "the ID of the contact on his cloud server,the destination domain may contain serveral family members",  
            },
            "FROM" : {
                "DOMAIN" : "the domain name or IP of sender",
                "PORT"   : "the PORT of sender's cloud server ",
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

    /**
     * 
        onclose: ((this: WebSocket, ev: CloseEvent) => any) | null;
        onerror: ((this: WebSocket, ev: Event) => any) | null;
        onmessage: ((this: WebSocket, ev: MessageEvent) => any) | null;
        onopen: ((this: WebSocket, ev: Event) => any) | null;
     * 
     */

webSocketEvents.sendHeartBeat2CloudServer = (sock_conn) => {

        const pkg_obj = {

            TO   : {
                        DOMAIN : cloudServer,
                        PORT : cloudServerPort,
                        ID :  'cloudserver',  // to cloud server itself, private protocol 
                    },
            FROM : {
                        DOMAIN : cloudServer,     // do not use homeserver's ip, because it is behind NAT,fill in cloudServer DOMAIN, 
                                            // indicate it is a private protocol 
                        PORT : cloudServerPort,
                        ID :  'frontEndDevice',  // from home server, private protocol 
                    },
            TYPE_OUTER : 'HEARTBEAT' ,
            DATA : {
                        TYPE_INNER : 'HEARTBEAT',
                        PAYLOAD    : 'I miss you' 
                    }

        }

        sock_conn.send(JSON.stringify(pkg_obj))

    }


webSocketEvents.isHeartBeatReceived = async () => {

    // 1. if HeartBeat not received after a certain amount of time, means the connection between server and frontend lost
    // close the existing websocket connection and create a new one 

        // if (heartBeat.getHeartBeatCnt() == 0) {
        //     // reinitialized socket connection to cloud server as client 
        //     console.log('did not recieve heartbeat from cloud server, reinitializing websocket connection to cloud...')
        //     sock_conn.close()
        //     sock_conn = await initWebSocket(server, `${cloudServer}:${cloudServerPort}`)
        // } else {
        //     heartBeat.clearHeartBeatCnt();
        // }
    }

// onmessage: ((this: WebSocket, ev: MessageEvent) => any) | null;
webSocketEvents.websocketOnMessage = (sock_conn, ev) => { 

    const msg = JSON.parse(ev.data)
    // console.log(msg)

    // switch(msg.DATA.TYPE) {
    //     case 'HEARTBEAT' : 

    //         break ;
    //     case 'RESPONSE' :  // response data from homeserver for get,post,put,delete, save the data in localstorage for 10s
    //         const key = msg.DATA.PAYLOAD.KEY ;
    //         const data = msg.DATA.PAYLOAD.DATA ;

    //         localStorage.setItem(key,data)
    //         const timerId = setTimeout(()=>{
    //             clearTimeout(timerId);
    //             localStorage.removeItem(key);
    //         }, 10000) ; // 10s 
        
    // }

    /**
     * public protocol 
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
                "URL"    : "websocket url+port",
                "ID"     : "the ID of the contact on his cloud server,the destination domain may contain serveral family members",  
            },
            "FROM" : {
                "URL"    : "websocket url+port",
                "ID"     : "the ID of the sender on his cloud server,the source domain may contain serveral family members", 
            },
            "TYPE_OUTER" : "HEARTBEAT"
            "DATA" : {
                "TYPE_INNER"   : "HEARTBEAT",
                "PAYLOAD":  "IMU" 
            }
        }))
    * */

    proccessOuterLayerMsg( msg, sock_conn)

}

webSocketEvents.websocketOnOpen = async(sock_conn, e) => {

    console.log("on open, connection established")

    const to = {
        DOMAIN : cloudServer,
        PORT : cloudServerPort,
        ID :  'cloudserver',  
    };

    const from = {
        DOMAIN : cloudServer,    
        PORT : cloudServerPort,
        ID :  'frontEndDevice',  
    };

}

webSocketEvents.websocketOnError = (sock_conn, e,cb_fn) => {
    console.log(e)
    alert(`websocketOnError : ${e.reason}`)
    return cb_fn
}

webSocketEvents.websocketOnClose = (sock_conn, e,cb_fn) =>  {
    console.log('disconnected from signaling server', e);
    alert(`websocketOnClose : ${e.reason}`)
    return cb_fn()
}

webSocketEvents.clearTimerEvents = (arrOfTimerIds) => {

    for (let i=0; i<arrOfTimerIds.length ; i++){
        clearInterval(arrOfTimerIds[i])
    }
}

export default webSocketEvents

