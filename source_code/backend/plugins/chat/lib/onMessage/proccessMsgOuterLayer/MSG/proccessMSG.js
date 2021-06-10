
const {wsuri} = require('../../../../../../ipport')
const {getSafeProperty} = require('../../../../../../utility/getSafeProperty')
const {debugLog} = require('../../../../../../utility/debugLog')
const {User_Model} = require('../../../../../../api/User/Model/User_Model');
const {ChatRoom_Model} = require('../../../../../../api/Contact/Model/ChatRoom_Model');
const {P2PMessage_Model} = require('../../../../../../api/Message/Model/P2PMessage_Model')
const {Contact_Model} = require('../../../../../../api/Contact/Model/Contact_Model')
const {outgoingSockets,incomingSockets} = require('../../../manageSockConns')

const fileName = "proccessMSG.js"
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
            "CATEGORY" : "Group"
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

const proccessIncomingMSG_Contact =  async (db, socket_conn, msgObj) => {

    console.log(msgObj)

    const type_inner = getSafeProperty(()=>msgObj.DATA.TYPE_INNER, undefined )
    
    console.log(type_inner)

    switch (type_inner) {

        case 'MSG':
            handleTypeInner_MSG_Contact(db,socket_conn,msgObj)
            break;
        
        case 'offer':
            handleTypeInner_offer_Contact(db,socket_conn,msgObj)
            break;
        
        case 'answer':
            handleTypeInner_answer_Contact(db,socket_conn,msgObj)
            break;
        
        case 'candidate':
            handleTypeInner_candidate_Contact(db,socket_conn,msgObj)
            break;
    
        default:
            break;
    }
}

const handleTypeInner_offer_Contact =  async (db, socket_conn, msgObj) => {
    /**
         *  1. check if user exist in database
        */
    const functionName = "handleTypeInner_offer_Contact"
    const TO_ID = getSafeProperty(()=>msgObj.TO.ID, undefined )
    const TO_URL = getSafeProperty(()=>msgObj.TO.URL, undefined )
    const FROM_ID = getSafeProperty(()=>msgObj.FROM.ID, undefined )
    const FROM_URL = getSafeProperty(()=>msgObj.FROM.URL, undefined )
    const from = getSafeProperty(()=>msgObj.FROM, undefined )
    from['CATEGORY'] = 'CONTACT' // lazy solution for test only,need to add this CATEGORY information in database
    
    const to = getSafeProperty(()=>msgObj.TO, undefined )
    to['CATEGORY'] = 'CONTACT' // lazy solution for test only,need to add this CATEGORY information in database


    let sqlResult = await db.query(User_Model.checkUserByIdOrName(TO_ID));

    // check if Error happen in query or querySet returns nothing
    if (sqlResult.errorArray.length != 0 || sqlResult.querySet.length == 0){
        sendMsg(socket_conn,from,to,'MSG','ERROR',`user: ${TO_ID} you send to does not exist + ${sqlResult.errorArray[0]}`) 
        return
    }
    const user_id = sqlResult.querySet[0]['id']

    /**
     *  2, check if contact exist
     */
    // queryContactViaIdOrName
    sqlResult = await db.query(Contact_Model.queryContactViaUser_idWebSocketUrlHisID(user_id,FROM_URL,FROM_ID));
    if (sqlResult.errorArray.length != 0 || sqlResult.querySet.length == 0){
        // if contact does not exist in Contact_Model,reply error message
        console.log(`in file ${fileName}, function ${functionName} ,cannot find contact ${FROM_URL},${FROM_ID}`)
        sendMsg(socket_conn,from,to,'MSG','ERROR',`in file ${fileName},${functionName}  contact: ${FROM_ID} is not registered on this server + ${sqlResult.errorArray[0]} `) 
        return
    }

    // if Contact exist 
    // const contact_id = sqlResult.querySet[0]['id']

    /**
     *  4. if user online,send notification to him
     */
    // 4.1 get the contact's socket connection 

    const receieverSockConnID = `${TO_URL}+${TO_ID}`
    if(incomingSockets.hasOwnProperty(`${receieverSockConnID}`) == true){
        console.log(`in file ${fileName}, function ${functionName} ,${receieverSockConnID} socket connection exist !!! the keys of incomingSockets : ${Object.keys(incomingSockets)} `)

        // 4.2 send offer to the contact   
        const receiver_socket_conn = incomingSockets[`${receieverSockConnID}`]
        sendMsg(receiver_socket_conn,to,from,'MSG',msgObj.DATA.TYPE_INNER,msgObj.DATA.PAYLOAD) // private protocol between your server and clients 
    } else {
        console.log(`in file ${fileName}, function ${functionName} ,cannot find ${receieverSockConnID} socket connection! the keys of incomingSockets : ${Object.keys(incomingSockets)} `)
    }
}

const handleTypeInner_answer_Contact =  async (db, socket_conn, msgObj) => {

    console.log("**********************************************")
    console.log(msgObj)

    /**
         *  1. check if user exist in database
        */
    const functionName = "handleTypeInner_answer_Contact"
    const TO_ID = getSafeProperty(()=>msgObj.TO.ID, undefined )
    const TO_URL = getSafeProperty(()=>msgObj.TO.URL, undefined )
    const FROM_ID = getSafeProperty(()=>msgObj.FROM.ID, undefined )
    const FROM_URL = getSafeProperty(()=>msgObj.FROM.URL, undefined )
    const from = getSafeProperty(()=>msgObj.FROM, undefined )
    from['CATEGORY'] = 'CONTACT' // lazy solution for test only,need to add this CATEGORY information in database
     
    const to = getSafeProperty(()=>msgObj.TO, undefined )
    to['CATEGORY'] = 'CONTACT' // lazy solution for test only,need to add this CATEGORY information in database


    let sqlResult = await db.query(User_Model.checkUserByIdOrName(TO_ID));

    // check if Error happen in query or querySet returns nothing
    if (sqlResult.errorArray.length != 0 || sqlResult.querySet.length == 0){
        sendMsg(socket_conn,from,to,'MSG','ERROR',`user: ${TO_ID} you send to does not exist + ${sqlResult.errorArray[0]}`) 
        return
    }
    const user_id = sqlResult.querySet[0]['id']

    /**
     *  2, check if contact exist
     */
    // queryContactViaIdOrName
    sqlResult = await db.query(Contact_Model.queryContactViaUser_idWebSocketUrlHisID(user_id,FROM_URL,FROM_ID));
    if (sqlResult.errorArray.length != 0 || sqlResult.querySet.length == 0){
        // if contact does not exist in Contact_Model,reply error message
        console.log(`in file ${fileName}, function ${functionName},cannot find contact ${FROM_URL},${FROM_ID}`)
        sendMsg(socket_conn,from,to,'MSG','ERROR',`in file ${fileName},${functionName} contact: ${FROM_ID} is not registered on this server + ${sqlResult.errorArray[0]} `) 
        return
    }

    // if Contact exist 
    // const contact_id = sqlResult.querySet[0]['id']

    /**
     *  4. if user online,send notification to him
     */
    // 4.1 get the contact's socket connection 

    const receieverSockConnID = `${TO_URL}+${TO_ID}`
    if(incomingSockets.hasOwnProperty(`${receieverSockConnID}`) == true){
        console.log(`in file ${fileName}, function ${functionName} ,${receieverSockConnID} socket connection exist !!! the keys of incomingSockets : ${Object.keys(incomingSockets)} `)

        // 4.2 send offer to the contact   
        const receiver_socket_conn = incomingSockets[`${receieverSockConnID}`]
        sendMsg(receiver_socket_conn,to,from,'MSG',msgObj.DATA.TYPE_INNER,msgObj.DATA.PAYLOAD) // private protocol between your server and clients 
    } else {
        console.log(`in file ${fileName}, function ${functionName} ,cannot find ${receieverSockConnID} socket connection! the keys of incomingSockets : ${Object.keys(incomingSockets)} `)
    }
}

const handleTypeInner_candidate_Contact =  async (db, socket_conn, msgObj) => {
    /**
         *  1. check if user exist in database
        */
    const TO_ID = getSafeProperty(()=>msgObj.TO.ID, undefined )
    const TO_URL = getSafeProperty(()=>msgObj.TO.URL, undefined )
    const FROM_ID = getSafeProperty(()=>msgObj.FROM.ID, undefined )
    const FROM_URL = getSafeProperty(()=>msgObj.FROM.URL, undefined )
    const from = getSafeProperty(()=>msgObj.FROM, undefined )
    const functionName = "handleTypeInner_candidate_Contact"

    from['CATEGORY'] = 'CONTACT' // lazy solution for test only,need to add this CATEGORY information in database
    
    const to = getSafeProperty(()=>msgObj.TO, undefined )
    to['CATEGORY'] = 'CONTACT' // lazy solution for test only,need to add this CATEGORY information in database


    let sqlResult = await db.query(User_Model.checkUserByIdOrName(TO_ID));

    // check if Error happen in query or querySet returns nothing
    if (sqlResult.errorArray.length != 0 || sqlResult.querySet.length == 0){
        sendMsg(socket_conn,from,to,'MSG','ERROR',`user: ${TO_ID} you send to does not exist + ${sqlResult.errorArray[0]}`) 
        return
    }
    const user_id = sqlResult.querySet[0]['id']

    /**
     *  2, check if contact exist
     */
    // queryContactViaIdOrName
    sqlResult = await db.query(Contact_Model.queryContactViaUser_idWebSocketUrlHisID(user_id,FROM_URL,FROM_ID));
    if (sqlResult.errorArray.length != 0 || sqlResult.querySet.length == 0){
        // if contact does not exist in Contact_Model,reply error message
        console.log(`in file ${fileName}, function ${functionName} ,cannot find contact ${FROM_URL},${FROM_ID}`)
        sendMsg(socket_conn,from,to,'MSG','ERROR',`in file ${fileName},${functionName} contact: ${FROM_ID} is not registered on this server + ${sqlResult.errorArray[0]} `) 
        return
    }

    // if Contact exist 
    // const contact_id = sqlResult.querySet[0]['id']

    /**
     *  4. if user online,send notification to him
     */
    // 4.1 get the contact's socket connection 

    const receieverSockConnID = `${TO_URL}+${TO_ID}`
    if(incomingSockets.hasOwnProperty(`${receieverSockConnID}`) == true){
        console.log(`in file ${fileName}, function ${functionName} ,${receieverSockConnID} socket connection exist !!! the keys of incomingSockets : ${Object.keys(incomingSockets)} `)

        // 4.2 send offer to the contact   
        const receiver_socket_conn = incomingSockets[`${receieverSockConnID}`]
        sendMsg(receiver_socket_conn,to,from,'MSG',msgObj.DATA.TYPE_INNER,msgObj.DATA.PAYLOAD) // private protocol between your server and clients 
    } else {
        console.log(`in file ${fileName}, function ${functionName},cannot find ${receieverSockConnID} socket connection! the keys of incomingSockets : ${Object.keys(incomingSockets)} `)
    }
}

const handleTypeInner_MSG_Contact =  async (db, socket_conn, msgObj) => {
    /**
     *  1. check if user exist in database
    */
    const functionName = "handleTypeInner_MSG_Contact"
    const TO_ID = getSafeProperty(()=>msgObj.TO.ID, undefined )
    const TO_URL = getSafeProperty(()=>msgObj.TO.URL, undefined )
    const FROM_ID = getSafeProperty(()=>msgObj.FROM.ID, undefined )
    const FROM_URL = getSafeProperty(()=>msgObj.FROM.URL, undefined )
    const from = getSafeProperty(()=>msgObj.FROM, undefined )
    from['CATEGORY'] = 'CONTACT' // lazy solution for test only,need to add this CATEGORY information in database
    
    const to = getSafeProperty(()=>msgObj.TO, undefined )
    to['CATEGORY'] = 'CONTACT' // lazy solution for test only,need to add this CATEGORY information in database


    // query if user exist 
    let sqlResult = await db.query(User_Model.checkUserByIdOrName(TO_ID));

    // check if Error happen in query or querySet returns nothing
    if (sqlResult.errorArray.length != 0 || sqlResult.querySet.length == 0){
        sendMsg(socket_conn,from,to,'MSG','ERROR',`user: ${TO_ID} you send to does not exist + ${sqlResult.errorArray[0]}`) 
        return
    }
    const user_id = sqlResult.querySet[0]['id']

    /**
     *  2, check if contact exist
     */
    // queryContactViaIdOrName
    sqlResult = await db.query(Contact_Model.queryContactViaUser_idWebSocketUrlHisID(user_id,FROM_URL,FROM_ID));
    if (sqlResult.errorArray.length != 0 || sqlResult.querySet.length == 0){
        // if contact does not exist in Contact_Model,reply error message
        console.log(`in file ${fileName}, function ${functionName} ,cannot find contact ${FROM_URL},${FROM_ID}`)
        sendMsg(socket_conn,from,to,'MSG','ERROR',`contact: ${FROM_ID} is not registered on this server + ${sqlResult.errorArray[0]} `) 
        return
    }

    // if Contact exist 
    const contact_id = sqlResult.querySet[0]['id']

    /**
     *  3. save message in database
    */
    const messageDirection = {
        incoming : true ,
        outgoing : false ,
    }
    const msgContent = msgObj.DATA.PAYLOAD ;
    sqlResult = await db.query(P2PMessage_Model.insertOneRow(messageDirection.incoming,user_id,contact_id,msgContent,false));
    if (sqlResult.errorArray.length != 0 || sqlResult.querySet.length == 0){
        // if contact does not exist in Contact_Model,reply error message
        console.log(`in file ${fileName}, function ${functionName} , save message to database error !!!`)
        sendMsg(socket_conn,from,to,'MSG','ERROR',`contact: ${FROM_ID} save message error on server + ${sqlResult.errorArray[0]} `) 
        return
    }
    // 3.2 if the sender of the message is also an user on the server,save the message in database as outgoing to the user(sender)
    if (FROM_URL == wsuri){
        // 3.2.1 get sender user_id via the id name in the message.FROM.ID
        sqlResult = await db.query(User_Model.checkUserByIdOrName(FROM_ID));
        // check if Error happen in query or querySet returns nothing
        if (sqlResult.errorArray.length != 0 || sqlResult.querySet.length == 0){
            sendMsg(socket_conn,from,to,'MSG','ERROR',`user: ${FROM_ID} you send to does not exist + ${sqlResult.errorArray[0]}`) 
            return
        }
        const sender_user_id = sqlResult.querySet[0]['id']
        // 3.2.2 get the contact_id via the id name in the message.TO.ID + message.TO.URL + sender(user_id) 
        // ie. check if the sender(sender_user_id) is an registered contact of the user msg.TO, ie, if such contact exist in the database
        // queryContactViaIdOrName
        sqlResult = await db.query(Contact_Model.queryContactViaUser_idWebSocketUrlHisID(sender_user_id,TO_URL,TO_ID));
        if (sqlResult.errorArray.length != 0 || sqlResult.querySet.length == 0){
        // if contact does not exist in Contact_Model,reply error message
        console.log(`in file ${fileName}, function ${functionName} ,cannot find contact ${TO_URL},${TO_ID}`)
        sendMsg(socket_conn,from,to,'MSG','ERROR',`contact:  you are not a contact of ${TO_URL},${TO_ID} + ${sqlResult.errorArray[0]} `) 
        return
        }

        // if the msg_To user is a Contact of the sender,多此一舉的驗證？不是自己朋友列表中的人，客戶端怎麼會發信息來？也擺，當是一種多重保險唄 
        const contact_id_contactOfSender = sqlResult.querySet[0]['id']

        // 3.2.3 save the message according to the contact_id_contactOfSender and the sendder user_id
        sqlResult = await db.query(P2PMessage_Model.insertOneRow(messageDirection.outgoing,sender_user_id,contact_id_contactOfSender,msgContent,false));
        if (sqlResult.errorArray.length != 0 || sqlResult.querySet.length == 0){
            // if contact does not exist in Contact_Model,reply error message
            console.log(`in file ${fileName}, function ${functionName} , save message to database error !!!`)
            sendMsg(socket_conn,from,to,'MSG','ERROR',`contact: ${TO_ID} save message error on server + ${sqlResult.errorArray[0]} `) 
            return
        }

        // 3.2.4 send the notification to the sender (don't send notification to the sender who is not on the server,incase they might not surport this protocol)
        sendMsg(socket_conn,from,to,'MSG','NEW_MSG_NOTIFICATION',{numOfUnreadMsg : 1}) // private protocol between your server and clients
    }

    /**
     *  4. if user online,send notification to him
    */
    // 4.1 get the contact's socket connection 

    const receieverSockConnID = `${TO_URL}+${TO_ID}`
    if(incomingSockets.hasOwnProperty(`${receieverSockConnID}`) == true){
        console.log(`in file ${fileName}, function ${functionName} ,${receieverSockConnID} socket connection exist !!! the keys of incomingSockets : ${Object.keys(incomingSockets)} `)
        // 4.2 query number of unread messages regarding to the contact and the user
        sqlResult = await db.query(P2PMessage_Model.queryUnreadMsgViaContactIdAndUserId(user_id,contact_id));
        if (sqlResult.errorArray.length != 0 || sqlResult.querySet.length == 0){
            // if contact does not exist in Contact_Model,reply error message
            sendMsg(socket_conn,from,to,'MSG','ERROR',`query unread message eroor:  ${sqlResult.errorArray[0]} `) 
            return
        }
        const numOfUnreadMsg = sqlResult.querySet.length 
        // 4.2 send notification 
        const receiver_socket_conn = incomingSockets[`${receieverSockConnID}`]
        sendMsg(receiver_socket_conn,to,from,'MSG','NEW_MSG_NOTIFICATION',{numOfUnreadMsg : numOfUnreadMsg}) // private protocol between your server and clients 
    } else {
        console.log(`in file ${fileName}, function ${functionName} ,cannot find ${receieverSockConnID} socket connection! the keys of incomingSockets : ${Object.keys(incomingSockets)} `)
    }

}

const proccesIncomingsMSG_Group =  async (db, socket_conn, msgObj) => {
    /**
     *  1. check if user name exist in database
     */



     /**
      *  2. save message in database
      */

    
    /**
     *  3. if user of this group is online,send notification to it 
     */
}

const proccessIncomingMSG_ChatRoom =  async (db, socket_conn, msgObj) => {
    /**
     *  1. check if chat room name exist in database
     */



     /**
      *  2. save message in database
      */

    
    /**
     *  3. if user of this chat room is online,send notification to it 
     */
}


const saveOutGoingMSG_Contact = async (db,socket_conn,msgObj) => {


    const functionName = "saveOutGoingMSG_Contact"
    const TO_ID = getSafeProperty(()=>msgObj.TO.ID, undefined )
    const TO_URL = getSafeProperty(()=>msgObj.TO.URL, undefined )
    const FROM_ID = getSafeProperty(()=>msgObj.FROM.ID, undefined )
    const FROM_URL = getSafeProperty(()=>msgObj.FROM.URL, undefined )
    const from = getSafeProperty(()=>msgObj.FROM, undefined )
    from['CATEGORY'] = 'CONTACT' // lazy solution for test only,need to add this CATEGORY information in database
    
    const to = getSafeProperty(()=>msgObj.TO, undefined )
    to['CATEGORY'] = 'CONTACT' // lazy solution for test only,need to add this CATEGORY information in database

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
    const contact_id = sqlResult.querySet[0]['id']


    /**
     *  3. save message in database
    */
    if (msgObj.DATA.TYPE_INNER === 'MSG') {

        const messageDirection = {
            incoming : true ,
            outgoing : false ,
        }
        const msgContent = msgObj.DATA.PAYLOAD ;
        sqlResult = await db.query(P2PMessage_Model.insertOneRow(messageDirection.outgoing,user_id,contact_id,msgContent,false));
        if (sqlResult.errorArray.length != 0 || sqlResult.querySet.length == 0){
            // if contact does not exist in Contact_Model,reply error message
            console.log(`in file ${fileName}, function ${functionName} , save message to database error !!!`)
            sendMsg(socket_conn,from,to,'MSG','ERROR',`contact: ${FROM_ID} save message error on server + ${sqlResult.errorArray[0]} `) 
            return
        }

    }

    /**
     *  4. send notification back to sender, so he can fetach the sent message from database 
     */
     sendMsg(socket_conn,from,to,'MSG','NEW_MSG_NOTIFICATION',{numOfUnreadMsg : 1}) // private protocol between your server and clients

}

const saveOutGoingMSG_Group = async (db,socket_conn,msgObj) => {


}

const saveOutGoingMSG_ChatRoom = async (db,socket_conn,msgObj) => {


}


const proccessMSG = async (server, socket_conn, msg) => {
    let msgObj = msg ;

    const functionName = "proccessMSG = (server,socket,msgObj)" 

    let msgCategory = 0;  // 1: P2PMsg, 2: GroupMsg, 3: ChatRoomMsg. nasty null, if(!null) = if(!0) , remember this!
    const msgCategoryTypes = {
        P2PMsg : 1 ,
        GroupMsg : 2 ,
        ChatRoomMsg : 3
    }

    // 1. if To.URL != current server's websocket url, it is a message to other's server 
    const TO_URL = String(getSafeProperty(()=>msgObj.TO.URL, undefined ))
    const TO_ID = String(getSafeProperty(()=>msgObj.TO.ID, undefined ))

    if (TO_URL != wsuri){
        /**
         *  in this case, it is a outgoing message from
         *  1. one of the users on the current server to contact's server,當前服務器上某用戶給其contact的外發信息
         *  2. one of the chatRooms on the current server to chatroom members' server，chatRoom成員發至此服務器，然後此服務器羣發給chatroom成員的外發信息。 
         */
        // 1.1 check if the current contact is connected to this server as websocket client 
        const socket_conn_id = String(`${TO_URL}+${TO_ID}`)
        const socket_conn_incoming = getSafeProperty(()=>incomingSockets[`socket_conn_id`], undefined )
        // 1.2 if not, create a websocket connection to this contact's server as a websocket client
        if (socket_conn_incoming === undefined){
            // check if already has an outgoing sockect as client exist 
            const socket_conn_outgoing = getSafeProperty(()=>outgoingSockets[`socket_conn_id`], undefined )
            if (socket_conn_outgoing === undefined){
                // 爲了代碼結構方便，在和incoming socket_conn同一層的文件裏生成socket_conn_outgoing,所以能到此的socket，socket_conn_outgoing一定存在
                // 在這個文件裏生成client的socket代碼邏輯非常不好組織
                // 在同一層的話，可以共用處理消息的模塊
                console.log("something is wrong,it must exist! ")
            } else {
                // send message via this socket_conn_outgoing
                // todo : 判斷是否to是合法的，即需要在數據庫中查是否是存在的用戶
                sendMsg(socket_conn_outgoing,msgObj.TO, msgObj.FROM,msgObj.TYPE_OUTER,msgObj.DATA.TYPE_INNER,msgObj.DATA.PAYLOAD)
            }
        } else {
            sendMsg(socket_conn_incoming,msgObj.TO, msgObj.FROM,msgObj.TYPE_OUTER,msgObj.DATA.TYPE_INNER,msgObj.DATA.PAYLOAD)
        }

        // 1.3 save message in database, notifying whether sent successful 
        // check if database hander is passed in
        const db = getSafeProperty(()=>server.app.db, undefined )
        if (db == undefined ){
            debugLog(fileName,functionName,`db does not exist`)
            return ;
        }

        const category = getSafeProperty(()=>msgObj.FROM.CATEGORY, undefined )
        if (category == undefined ){
            debugLog(fileName,functionName,`msgObj.FROM.CATEGORY does not exist`)
            return ;
        }

        switch (category) {
            case 'CHATROOM': {
                msgCategory = msgCategoryTypes.ChatRoomMsg ;
                saveOutGoingMSG_ChatRoom(db,socket_conn,msgObj)
                break
            }

            case 'GROUP': {
                msgCategory = msgCategoryTypes.GroupMsg ;
                saveOutGoingMSG_Group(db,socket_conn,msgObj)
                break ;
            }

            case 'CONTACT' : { 
                msgCategory = msgCategoryTypes.P2PMsg ;
                saveOutGoingMSG_Contact(db,socket_conn,msgObj)
                break ;
            }

            default : { 
                const from = getSafeProperty(()=>msgObj.TO, undefined )
                from['CATEGORY'] = "CONTACT"
                const to   = getSafeProperty(()=>msgObj.FROM, undefined )
                sendMsg(socket_conn,to,from,'MSG','ERROR','you need to add CATEGORY in FROM.CATEGORY') 
                break ;
            }
        }

    } else {
        // 2. if TO.URL == current server's websocket url, it's an incomming message to user / chatroom on this server 
        /**
         * 信息的TO.URL對象爲本服務器，根據TO.ID可以判斷來源是：（注：可以用後綴來區分來源的類別，這就要求在建立Contact_Model,Group_Model和ChatRoom_Model的時候
         * 自動在後面加後綴，這樣在確定信息來源屬於哪類時可以很快定位，而不用去數據庫中逐個查詢來猜在哪個table中。）
         * 1. 來自聯系人(Contact_Model)，信息接收對象爲該服務器上的某個用戶  (TO.ID應是xxx,亦即User_Model中的name)
         * 2. 來自該服務器上某個chatroom的成員，信息接受對象爲chatroom的ID（亦即TO.ID爲xxx_ChatRoom),此時服務器要到數據庫中獲得所有該chatroom成員的TO信息，然後逐個轉發此信息
         * 3. 來自別人服務器上的（chatroom)，信息接收對象是該服務器上的一個羣組ID(Group_Model),（亦即TO.ID爲xxx_Group)
         * 
         *  in this case,the message is for one of the users on the current server.
         *  the source of the message falls in 3 possible categories: 
         *  1. an incoming message from a contact,the receiver TO.ID should be username of User_Model.
         *  2. from a member of a chatroom which is created on this server by a user on the server,the receiver TO.ID should be the name field of ChatRoom_Model,better to add a postfix _ChatRoom to it so that it is easy to tell
         *     which category this message belongs to.  
         *  3. from a chatroom on other's server,the name of the group is listed under database table Group_Model. TO.ID sould be the name field of Group_Model,better to add a postfix _Group for 
         *     better branching in the code,so that we don iterate in User_Model,Contact_Model,ChatRoom_Model and Group_Model to identify the category of this message
         */

        /**
         *  TO DO : better use name convention in database,for instance add a postfix of _Contact to indicate it is contact message,
         *         _Group for group message, _ChatRoom for chat room message.so that it can save the
         *         trouble to try in each category to find out what kind of message it is.query in database is costy
         *  
         */

        const category = getSafeProperty(()=>msgObj.FROM.CATEGORY, undefined )
        // lazy, not checking undefined value of from and to properties

        // check if database hander is passed in
        const db = getSafeProperty(()=>server.app.db, undefined )
        if (db == undefined ){
            debugLog(fileName,functionName,`db does not exist`)
            return ;
        }

        if (category == undefined ){
            debugLog(fileName,functionName,`msgObj.FROM.CATEGORY does not exist`)
            return ;
        }

        // get the postfix of TO.ID,and identify its category
        // const idSplitArr = TO_ID.split('_').slice(-1)
        // const TO_ID_NAME = TO_ID.split('_').slice(0,-1).join('_')
        
        // msgObj.TO.ID = TO_ID_NAME  ; // remove the postfix

        // let postfix = ''
        // if(idSplitArr.length != 0){
        //     postfix = idSplitArr[0] 
        // }

        console.log("tracing......,category = ", category)
        

        switch (category) {
            case 'CHATROOM': {
                msgCategory = msgCategoryTypes.ChatRoomMsg ;
                proccessIncomingMSG_ChatRoom(db,socket_conn,msgObj)
                break
            }

            case 'GROUP': {
                msgCategory = msgCategoryTypes.GroupMsg ;
                proccesIncomingsMSG_Group(db,socket_conn,msgObj)
                break ;
            }

            case 'CONTACT' : { 
                msgCategory = msgCategoryTypes.P2PMsg ;
                proccessIncomingMSG_Contact(db,socket_conn,msgObj)
                break ;
            }

            default : { 
                const from = getSafeProperty(()=>msgObj.TO, undefined )
                from['CATEGORY'] = "CONTACT"
                const to   = getSafeProperty(()=>msgObj.FROM, undefined )
                sendMsg(socket_conn,to,from,'MSG','ERROR','you need to add CATEGORY in FROM.CATEGORY') 
                break ;
            }

        }

    }

    // save the (sender) user's message to database 

    // then send feedback to sender on the server to fetch message from database to refresh the front end view.
    
} 


exports.proccessMSG = proccessMSG 



