


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
const processHEARTBEAT = (socket, msgObj) => {



}


exports.processHEARTBEAT = processHEARTBEAT 

