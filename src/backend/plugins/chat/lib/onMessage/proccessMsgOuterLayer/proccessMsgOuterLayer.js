

const {proccessMSG} = require('./MSG/proccessMSG')
const {proccessHEARTBEAT} = require('./HEARTBEAT/processHEARTBEAT')

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

const proccessMsgOuterLayer = (server ,socket,msgObj) => {

        console.log("proccessMsgOuterLayer ................. ")

        switch (msgObj.TYPE_OUTER) {
            case 'HEARTBEAT'  : 
                proccessHEARTBEAT(server,msgObj)
                break ;
    
            case 'MSG' :
                proccessMSG(server, socket, msgObj) 
                break ;
    
            default : 
                console.log('TYPE_OUTER not found')
                break ;
        }

    }
    
    
exports.proccessMsgOuterLayer = proccessMsgOuterLayer





