import React,{useState,useEffect,useRef} from 'react'
import './PeersChatMenu.css'
import PeersChat from '../../../Content/PeersChat/PeersChat'
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import {setIsExpandChatMenuAction,
    saveWebsocketConn2StoreAction,
    destroyWebsocketAction,
    setNewMsgToggleAction,
    setWebRTCmediaCallStateAction,
    setContactListAction
} from '../../../../store/websocket/actions'
import {
    authCheckTokenVaidAction
} from '../../../../store/auth/actions'
import asyncDelay from '../../../../utility/asyncDelay'
import * as mediaCallStateTypes from '../../../../store/websocket/webSocketState'

import {wsuri,
    messageEndPoint,
    my_wsuri,
    cloudServer,
    contactEndPoint
} from '../../../../ipconfig'
import {
    selectedGroupObj,
    selectedContactObj,
    selectedChatroomObj,
    msgsContactObj,
    allContactObj,            
    auth_Global
    } from './websocket/globalVar'

import {
    webRTC_inst_obj
} from './websocket/global_webRTC'


import getSafePropertyWithAlert from '../../../../utility/getSafePropertyWithAlert'

import * as loginStatus from '../../../../store/auth/actionTypes'
import axios from "axios";

import {config_json} from '../../../../global_config'
import handleError from '../../../../utility/handleError'
import { AlternateEmail, PowerInputSharp } from '@material-ui/icons';


function PeersChatMenu(props) {

    const fileName = "PeersChatMenu.js"
    
    const [isExpandMenu,setIsExpandMenu] = useState(false)

    const ref = useRef(null)

    const webRTC_peerConnection_ref = useRef(null)
    const offer_ref = useRef(null)

    const [localStream,setLocalStream] = useState('')
    const [remoteStream,setRemoteStream] = useState('')
    const [isIncomingCall,setIsIncomingCall] = useState('false')


    const handleOnclick2ExpandMenu = () => {
        setIsExpandMenu(!isExpandMenu)
        props.setIsExpandChatMenuAction(!isExpandMenu)
    }

    const handleOnclick2CloseMenu = () => {
        setIsExpandMenu(false)
        props.setIsExpandChatMenuAction(false)
    }

    useEffect(() => {
        window.isExpandMenu = isExpandMenu
        return () => {
            
        }
    }, [isExpandMenu])

    useEffect(() => {
        if(isExpandMenu == true){
            setIsExpandMenu(false)
        }
        return () => {
            
        }
    }, [props.toggleChatMenu])


    const setUpWebsocke = () => {
        const token = localStorage.getItem('token')
        webRTC_inst_obj.socket_conn = new WebSocket(`${wsuri}/?token=${token}`)
        webRTC_inst_obj.socket_conn.onmessage = (ev) => {websocketOnMessage(webRTC_inst_obj.socket_conn,ev)};
        webRTC_inst_obj.socket_conn.onopen    = (e ) => {websocketOnOpen(webRTC_inst_obj.socket_conn,e)} ;
        webRTC_inst_obj.socket_conn.onerror   = (e ) => {websocketOnError(webRTC_inst_obj.socket_conn,e ) } ;
        webRTC_inst_obj.socket_conn.onclose   = (e ) => {websocketOnClose(webRTC_inst_obj.socket_conn,e )} ;
    }


    // actions taken at initialization
    useEffect(() => {
        
        // setup the callback functions to assign value to the global object values 
        msgsContactObj.newMsgToggleSignalFn = newContactMsgUpdateCB ;

        if (props.status === loginStatus.LOGIN_STATUS_SUCCEED){

            getAllContactList()

            // establish websocket connection to server 
            setUpWebsocke()
 
            // props.saveWebsocketConn2StoreAction(webRTC_inst_obj.socket_conn) // for global

        }

        return () => {
            
        }
    }, [])

    // actions taken after login or log out 
    useEffect(() => {

        if (props.status === loginStatus.LOGIN_STATUS_SUCCEED){

            getAllContactList()

            // establish websocket connection to server 
            setUpWebsocke()

            // props.saveWebsocketConn2StoreAction(webRTC_inst_obj.socket_conn) // for global

        } else {

            if (webRTC_inst_obj.socket_conn ){
                webRTC_inst_obj.socket_conn.close()
                webRTC_inst_obj.socket_conn = ''
            }
            props.destroyWebsocketAction()

        }

        return () => {
        
        }

    }, [props.status])   // when this signal changes,change the websocket



    //-------------------------- state machine ----------------------------------------

    useEffect(() => {
        
        if (props.mediaCallState === mediaCallStateTypes.WEBSOCKET_MEDIACALL_STATE_INVIDEOCALL){
            // prepare for the video call
            // closeVideoCall()
            // startVideoCall();
            
        } else if (props.mediaCallState === mediaCallStateTypes.WEBSOCKET_MEDIACALL_STATE_INVOICECALL){
            // closeVideoCall()
            // startVoiceCall()
        } else if (props.mediaCallState === mediaCallStateTypes.WEBSOCKET_MEDIACALL_STATE_MEDIACALLRECEIVED){
            
        } else {
            // when call is terminated or in idle from the beginning, close the webRTC connection
            props.setWebRTCmediaCallStateAction(mediaCallStateTypes.WEBSOCKET_MEDIACALL_STATE_IDLE)
            // setIsIncomingCall(false)
            // closeVideoCall()
        }

    }, [props.mediaCallState])


    const startVideoCall = () => {
        // createWebRTCsocketCnnInst()
        // getStream(true)

        // setWebRTC_peerConnection(webRTCInst) // use another useEffect as callback function on the value change of webRTC_inst_obj.webRTC_inst
        //                                      // kind of nasty since can't use await in useEffect to make it async logic
        // // waitUseStateUpdate()
        // setTimeout(() => {getStream()},500) // 0.5s ,use a simple timer callback function to replace the useEffect polling
    }

    const startVoiceCall = () => {
        // createWebRTCsocketCnnInst()
        // getStream(false)

    }

    const processingOffer = async (isVideoTrue) => {

        if(!webRTC_inst_obj.webRTC_inst.signalingState != "stable"){
            console.log("signaling is not stable")
            await asyncDelay(1)
        }

        // alert("creating answer ..... ")

        const answer = await webRTC_inst_obj.webRTC_inst.createAnswer();
        await webRTC_inst_obj.webRTC_inst.setLocalDescription(answer)
        sendMsg('answer',answer)

        const mediaConstraints = {
            'video': isVideoTrue,
            'audio': true,
        };

        const localStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
        webRTC_inst_obj.localStream = localStream

        for (const track of localStream.getTracks()){
            await webRTC_inst_obj.webRTC_inst.addTrack(track,localStream);
        }

        // alert('local track added')


        // // getLocalStream(isVideoTrue)  // use async in callback function
        // const localStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
        
        // for (const track of localStream.getTracks()){
        //     await this.newPeerConnection.addTrack(track,localStream);
        // }
        // // create answer
        // const answer = await webRTC_inst_obj.webRTC_inst.createAnswer();
        // await webRTC_inst_obj.webRTC_inst.setLocalDescription(answer)
    }

    /**
     * a callback function assign to the callback functions of websocket  
     * 
     * @param {*} newMsgReadyToggle : variable assigned to a new value when received a new message in websocket callback function
     *                                used to update the value props.newMsgReadyToggle in store
     */
    const newContactMsgUpdateCB = (newMsgReadyToggle) => {
        props.setNewMsgToggleAction(newMsgReadyToggle)
    }

    /**
     * 
     * @param {*} isInMediaCall, update this value according to the state of media call conversation
     */
    const setisInMediaCallAction_CB = (isInMediaCall) => {
        props.setisInMediaCallAction(isInMediaCall)
    }
    /**
     *  after changing the value of isInVideoCall in store,update the value in global object,
     *  follow this rule to update the value in global object.
     */
    useEffect(() => {
        // webRTC_global.isInCall = props.isInMediaCall

        return () => {
            
        }
    }, [props.isInVideoCall])


    useEffect(() => {
        msgsContactObj.newMsgReadyToggle = props.newMsgReadyToggle
        return () => {
            
        }
    }, [props.newMsgReadyToggle])


    const fetechUnreadMsg_contact = (contact_id,user_id,msg) => {
        const functionName = 'fetechUnreadMsg_contact'
    
        const token=localStorage.getItem('token')
    
        const query = {
            params : {
                contact_id: contact_id, // which contact this message belongs to
                user_id: user_id  ,
                token:    token   ,         // 
                status:  'unread' ,         // 'read/unread/all'
                offset:        0  ,  // for pagination purposes,the starting id of the messages
                pageLen : 0       , // number of messages in one query action 
            }
        } 
        // equevalent to localhost:3000/message/contact?contact_id=10
    
        axios
        .get(`${messageEndPoint}/contact`,
                query 
            )
        .then( res => {
    
            const data = getSafePropertyWithAlert(()=>res.data,fileName,functionName,"")
    
            // 1.2 save the message 
            // 1.2.1, check if msgsContact[`${msg.FROM.URL}+${msg.FROM.ID}`] exist, if true, add new arrays to the existing array,
            const unReadMsgArray = data.querySet.slice().reverse()
            unReadMsgArray.push(...msgsContactObj.msgsContact[`${msg.FROM.URL}+${msg.FROM.ID}`])
            msgsContactObj.msgsContact[`${msg.FROM.URL}+${msg.FROM.ID}`] = unReadMsgArray;
    
            // toggle the signal to force re-render
            msgsContactObj.newMsgToggleSignalFn(!msgsContactObj.newMsgReadyToggle)
            
        })
        .catch(error => {
    
            handleError(error,fileName,functionName)
    
        })
    
    }
    
    /**
     *  
     *  get all the contact list,and save it as global object 
     * 
     */

     const getAllContactList = () => {
        const functionName = 'getAllContactList'
    
        const token=localStorage.getItem('token')
    
        const query = {
            params : {
                category_id : null,
                token : token
            }
        } 
    
        axios
        .get(`${contactEndPoint}`,
                query 
            )
        .then( res => {
    
            const querySet = getSafePropertyWithAlert(()=>res.data.querySet,fileName,functionName)

            let allContactList = {}
            // construct allContactObj.allContact = {url+id : contact} from data.queryset
            for(let i=0; i<querySet.length; ++i){
                const contact = querySet[i]
                const URL = contact.webSocketUrl ;
                const ID  = contact.hisID ;
                allContactList[`${URL}+${ID}`] = contact 
            }

            props.setContactListAction(allContactList)
            allContactObj.allContact = allContactList
    
        })
        .catch(error => {
    
            handleError(error,fileName,functionName)
    
        })
    }


    const fetchLastNMsg_contact = (contact_id,user_id,msg) => {
        const functionName = 'fetchLastNMsg_contact'
    
        const token=localStorage.getItem('token')
    
        const query = {
            params : {
                contact_id: contact_id, // which contact this message belongs to
                user_id: user_id  ,
                token:    token   ,         // 
                status:  'all' ,         // 'read/unread/all'
                offset:        0  ,  // for pagination purposes,the starting id of the messages
                pageLen : 30       , // number of messages in one query action 
            }
        } 
        // equevalent to localhost:3000/message/contact?contact_id=10
    
        axios
        .get(`${messageEndPoint}/contact`,
                query 
            )
        .then( res => {
    
            const data = getSafePropertyWithAlert(()=>res.data,fileName,functionName,"")
    
            // 1.2 save the message 
            // otherwise create a new one (should be pulling latest N messages including the unread ones)
    
            msgsContactObj.msgsContact[`${msg.FROM.URL}+${msg.FROM.ID}`] = data.querySet
    
            // toggle the signal to force re-render
            msgsContactObj.newMsgToggleSignalFn(!msgsContactObj.newMsgReadyToggle)
            
        })
        .catch(error => {
    
            handleError(error,fileName,functionName)
    
        })
    }

    /**
     * *************************************************************************************************************************
     *                                           websocket callback functions
     * **************************************************************************************************************************
     */

    // onmessage: ((this: WebSocket, ev: MessageEvent) => any) | null;
    const websocketOnMessage = (sock_conn, ev) => { 

        const msg = JSON.parse(ev.data)
        // console.log(msg)

        /**
         * public protocol : message data layout（大道至簡）                                       透明
         *     _______________________________________________________________
         *    |      FROM     |  TO      |     DATA                |TYPE_OUTER |                我们的爱
         *    |_______________|__________|_________________________|___________|                是蓝色的 
         *                               /                          \                           一直只为你而转
         *                              /                            \
         *                             /______________________________\                         我们的眼泪
         *                            |TYPE_INNER| PAYLOAD   | MSG_ID  |                        流进心间
         *                            |__________|___________|_________|                        汇成江海
         *                                                                                      變成人間五味
         *                                                                                      化着清晨的青煙
         *                                                                                      一生只爲你而生
            socket_conn.send(JSON.stringify({                                                   
            "TO" : {                                                                            對你的心
                "URL" : "websocket url of contact",                                             是透明的原色
                "ID"     : "the ID of the contact on his cloud server",                         不論再歷經幾萬年
            },                                                                                  一直只爲你而存在
            "FROM" : {
                "URL" : "websocket url of sender",                                              親愛的
                "ID"     : "the ID of the sender on his cloud server",                          你是我今生的全部
                "CATEGORY" : "optional"                                                         餘生將用盡全力
            },                                                                                  只爲與你相見
            "TYPE_OUTER" : "HEARTBEAT"                                                          哪怕只是
            "DATA" : {                                                                          曇花一現
                "TYPE_INNER"   : "HEARTBEAT",                                                   也只爲你 成魔成狂
                "PAYLOAD":  "I miss you"                                                        管他 地獄天堂
            },
            "MSG_ID" : msg_id                                                                   此生因你
                                                                                                存在
                                                                                                而值得
                                                                                                
                                                                                                ---
                                                                        2021年5月1日 晨思，去中心化社交媒體網絡(DecensorMedia)
        }))
        * 
        */

        // get the incoming contact 

        ProccessOuterLayerMsg( msg, sock_conn)

    }

    const websocketOnOpen = async(sock_conn, e) => {

        console.log("on open, connection established")
    
    }

    const websocketOnError = (sock_conn, e) => {
        console.log(`webSocketEvents.websocketOnError, ${e}`)
        alert(`websocketOnError : ${e.reason}`)
    }
    
    const websocketOnClose = (sock_conn, e) =>  {
        console.log('webSocketEvents.websocketOnClose ', e);
        // alert(`webSocketEvents.websocketOnClose  : ${e.reason}`)

        // reopen if close automatically due to long inactive state 
        if (props.status === loginStatus.LOGIN_STATUS_SUCCEED){
            setTimeout(() =>{setUpWebsocke()}, 1000)
        }
    }
    
    const clearTimerEvents = (arrOfTimerIds) => {
    
        for (let i=0; i<arrOfTimerIds.length ; i++){
            clearInterval(arrOfTimerIds[i])
        }
    }

    const ProccessOuterLayerMsg = ( msg, socket_conn) => {

        switch (msg.TYPE_OUTER) {
    
            case 'MSG' :
                processInnerLayerMsg(msg, socket_conn)
                break ;
            
            case 'HEARTBEAT' : 
    
                break ;
    
            case 'EROOR' :
    
                break ;
    
            default : 
                console.log('TYPE_OUTER not found')
    
        }
    
    }


    const processInnerLayerMsg = (msg, socket_conn) => {
        const functionName = "processInnerLayerMsg(msg, socket_conn)"

        const category = getSafePropertyWithAlert(()=>msg.FROM.CATEGORY,fileName,functionName,'')

        // switch based on msg.FROM.CATEGORY 
        switch(category) {
            case 'CONTACT' : {
                processInnerLayerMsg_CONTACT(msg, socket_conn)
                break ;
            }

            case 'GROUP' : {
                processInnerLayerMsg_GROUP(msg, socket_conn)
                break;
            }

            case 'CHATROOM' : {
                processInnerLayerMsg_CHATROOM(msg, socket_conn)
                break;
            }

            default : {
                console.log('FROM.CATEGORY is not supported ')
                break ;
            }
        }

    }

    const processInnerLayerMsg_CONTACT = (msg, socket_conn) => { 
        const functionName = "processInnerLayerMsg_CONTACT"
        const data = msg.DATA
        const category = getSafePropertyWithAlert(()=>msg.FROM.URL,fileName,functionName,'')
    
        switch (data.TYPE_INNER) {
    
            case 'ERROR' : 
                alert(data.PAYLOAD)
                break ;
    
            case 'NEW_MSG_NOTIFICATION' : {
                const selectedContact = getSafePropertyWithAlert(()=>selectedContactObj['selectedContact'],fileName,functionName,'')
                // const selectedContact = props.selectedContact
                /**
                 * 1. if FROM.URL + FROM.ID is the current contact the client is talking to
                 */
    
                if (`${msg.FROM.URL}+${msg.FROM.ID}` == `${selectedContact.webSocketUrl}+${selectedContact.hisID}` )
                {
                    // 1.1 if msg with this contact exist locally,
                    if (msgsContactObj.msgsContact.hasOwnProperty(`${msg.FROM.URL}+${msg.FROM.ID}`) == true){
                        //if exist, fetch unread msg and push unread msg to the existing array
                        fetechUnreadMsg_contact(selectedContact.id,selectedContact.user_id,msg)
                    } else {
                        // 1.2 if local msg not exist,go fetch the last N messages
                        fetchLastNMsg_contact(selectedContact.id,selectedContact.user_id,msg)
                    } 
    
                    msgsContactObj.unReadMsgCnt[`${msg.FROM.URL}+${msg.FROM.ID}`] = 0
    
                } else {
                    /**
                     * 2. if FROM.URL + FROM.ID is not the current contact the client is talking to
                     */
                    if (msgsContactObj.unReadMsgCnt.hasOwnProperty(`${msg.FROM.URL}+${msg.FROM.ID}`) == true){
                        msgsContactObj.unReadMsgCnt[`${msg.FROM.URL}+${msg.FROM.ID}`] += msg.DATA.PAYLOAD.numOfUnreadMsg
                    } else {
                        msgsContactObj.unReadMsgCnt[`${msg.FROM.URL}+${msg.FROM.ID}`] = msg.DATA.PAYLOAD.numOfUnreadMsg
                    }
    
                    msgsContactObj.newMsgToggleSignalFn(!msgsContactObj.newMsgReadyToggle)
    
                }
                
                break;
            }
    
            case 'offer' : {

                console.log("onReceiveOffer")
    
                onReceiveOffer(msg)
    
                break;
            }
    
            case 'answer' : {
                // if incoming contact is not the active contact 
                console.log('onReceiveAnswer')
    
                const answer = data.PAYLOAD
                onReceiveAnswer(answer)
    
                break;
            }
    
            case 'candidate' : {
                // if incoming contact is not the active contact 
                console.log('onCandidate')
    
                const candidate = data.PAYLOAD
                onReceiveRemoteIceCandidate(candidate)
    
                break;
            }
    
            default : 
                console.log("data.TYPE_INNER not found")
        }
    }
    
    const processInnerLayerMsg_GROUP = (msg, socket_conn) => { 

    }
    
    
    const processInnerLayerMsg_CHATROOM = (msg, socket_conn) => { 
    
    }

    const onReceiveOffer  = async (msg)  => {

        const functionName = "onReceiveOffer"

        webRTC_inst_obj.whoAmI = 'callee'
        
        const offer = msg.DATA.PAYLOAD
    
        // 1, get the current active contact info 
        const selectedContact = getSafePropertyWithAlert(()=>selectedContactObj['selectedContact'],fileName,functionName,'')
    
        // if (`${msg.FROM.URL}+${msg.FROM.ID}` != `${selectedContact.webSocketUrl}+${selectedContact.hisID}` ){
        //     // the incoming contact is not the current active contact 
        //     // 2, switch selected contact to be the one of the incoming call 
        //     const incomingContact = getSafePropertyWithAlert(()=>allContactObj.allContact[`${msg.FROM.URL}+${msg.FROM.ID}`],fileName,functionName,'')
        //     selectedContactObj.setSelectedContact_CB(incomingContact)
        // }

        const incomingContact = getSafePropertyWithAlert(()=>allContactObj.allContact[`${msg.FROM.URL}+${msg.FROM.ID}`],fileName,functionName,'')
        selectedContactObj.setSelectedContact_CB(incomingContact)
        selectedContactObj.selectedContact = incomingContact

        // // prepare remoteStream placeholder,add remote stream in callback function
        // const remoteStream = new MediaStream();
        // setRemoteStream(remoteStream)
        // props.remoteStream_ref.current.srcObject = remoteStream

        setIsIncomingCall(true)
        // this is kind of nasty,it has to wait sometime for the state to change. so it is better to replace it with global variables which can change value
        // instantly.this is one of the most nasty and ugly thing we tend to forget that the process does not wait the state to change before 
        // proceeding to next line
        props.setWebRTCmediaCallStateAction(mediaCallStateTypes.WEBSOCKET_MEDIACALL_STATE_MEDIACALLRECEIVED)
        

        // 1. create peer2peer connection instance 
        await webRTC_inst_obj.createPeerConnection()

        // 2. set remoteDescription from remote offer 
        const remote_desc = new RTCSessionDescription(offer);
        try {
            await webRTC_inst_obj.webRTC_inst.setRemoteDescription(remote_desc)
        } catch (e) {
            console.log(e) ;
        }

        // polling answer or reject button to be pressed
        let pollingResult = false ;
        for(let i=0;i<15;i++){ // wait 15 seconds
            await asyncDelay(1)
            if (webRTC_inst_obj.mediaCallState === mediaCallStateTypes.WEBSOCKET_MEDIACALL_STATE_INVIDEOCALL || webRTC_inst_obj.mediaCallState === mediaCallStateTypes.WEBSOCKET_MEDIACALL_STATE_INVOICECALL){
                pollingResult = true ;
                break ;
            }
        }

        if (pollingResult === false){
            webRTC_inst_obj.closeCall()
            props.setWebRTCmediaCallStateAction(mediaCallStateTypes.WEBSOCKET_MEDIACALL_STATE_IDLE)
            alert("not answered")
            return
        }

        if(webRTC_inst_obj.webRTC_inst.signalingState != "stable"){
            console.log(" ***** signaling is not stable")
        }

        const mediaConstraints =    {
                                        'video': true,
                                        'audio': true,
                                    };
        
        try {
            const localStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
        
            for (const track of localStream.getTracks()){
                await webRTC_inst_obj.webRTC_inst.addTrack(track,localStream);
            }

            webRTC_inst_obj.localStream = localStream 
            webRTC_inst_obj.localVideoCom_ref.current.srcObject = localStream

            const answer = await webRTC_inst_obj.webRTC_inst.createAnswer();
            await webRTC_inst_obj.webRTC_inst.setLocalDescription(answer);

            // sent it over to peer via signaling channel
            sendMsg('answer',answer)
        } catch (e) {
            console.log(e)
        }

    }


    /**
     *  create webRTCsocket connection instance and set up the corresponding callback functions
     */

    
    const onReceiveAnswer = async (answer) => {
        

        console.log("received answer, adding remote SDP")

        if(webRTC_inst_obj.webRTC_inst.signalingState != "have-local-offer"){
            console.log(" ***** should have have-local-offer before receiving an answer,logically wrong,ie, you should send offer before getting an answer ")
            alert(" ***** should have have-local-offer before receiving an answer,logically wrong, ie, you should send offer before getting an answer ")
            return 
        }
        // create remote SDP based on answer, and add to peerconnection instance
        try {
            await webRTC_inst_obj.webRTC_inst.setRemoteDescription(new RTCSessionDescription(answer));
        } catch (e) {
            console.error('error adding remote SDP ');
        }
    
        // if(webRTC_inst_obj.webRTC_inst.signalingState != "have-remote-pranswer"){
        //     console.log("in file processPkg.js,function onReceiveOffer,signalingState should be have-remote-pranswer,ie,at this stage,we should have received and applied remote answer accordding to our offer")
        //     alert("in file processPkg.js,function onReceiveOffer,signalingState should be have-remote-pranswer,ie,at this stage,we should have received and applied remote answer accordding to our offer")
        //     return 
        // }
    }
    
    
    const onReceiveRemoteIceCandidate = async (candidate) => {

        
        // if(!webRTC_inst_obj.webRTC_inst){
        //     return 
        // }

        await webRTC_inst_obj.webRTC_inst.addIceCandidate(candidate);
    }

    const sendMsg = async (type_inner,payload) => {
        // 注意此處是被註冊的回調函數調用的，所以要記住，裡面的變量如果不是全局變量，都是註冊時傳遞的值，不會實時改變
        // 因爲js沒有指針一說，所以要用全局變量的土法子來傳遞值。不要用props.socket_conn之類的信號，註冊時都是空。
        const functionName = "sendMsg(payload)"

        if (!payload){
            alert("empty input detected")
            return
        }

        const selectedContact = selectedContactObj.selectedContact
        // const selectedContact = props.selectedContact

        if (!webRTC_inst_obj.socket_conn) {
            alert(`in ${fileName},function ${functionName}, webRTC_inst_obj.socket_conn is empty, please connect to server via websocket`)
            return
        }

        let webSocketReadyState = getSafePropertyWithAlert(()=>webRTC_inst_obj.socket_conn.readyState,fileName,functionName,'')
        console.log(webSocketReadyState)
        /**
                    Value	     State	                   Description
                    0	         CONNECTING	               Socket has been created. The connection is not yet open.
                    1	         OPEN	                   The connection is open and ready to communicate.
                    2	         CLOSING	               The connection is in the process of closing.
                    3	         CLOSED	                   The connection is closed or couldn't be opened.
        */
        if (webSocketReadyState != 1){
            webRTC_inst_obj.socket_conn.close()
            props.destroyWebsocketAction()
            alert("refresh the page to connect to server again")
            // distroy websocket to make sure webRTC_inst_obj.socket_conn is null,otherwise cannot create a new one,logic lock!!!
            return
        }

        webRTC_inst_obj.socket_conn.send(JSON.stringify({
            TO : {
                "URL"    :  selectedContact.webSocketUrl,  // the websocket url+port to connect to 
                "ID"     : `${selectedContact.hisID}`,       // his id or unique name on his server 
            },
            FROM : {
                "URL"    : my_wsuri,
                "ID"     : `${props.myUserName}`, 
                "CATEGORY": "CONTACT"
            },
            TYPE_OUTER : "MSG" ,
            DATA : {    // data can be encrypted from peerDevice-to-peerDevice
                "TYPE_INNER"   : type_inner,  
                "PAYLOAD":  payload 
            }
        }))
    }

    const sendHeartBeat2CloudServer = (sock_conn) => {

        const pkg_obj = {

            TO   : {
                        URL : cloudServer,
                        ID :  'cloudserver',  // to cloud server itself, private protocol 
                    },
            FROM : {
                        URL : cloudServer,     // do not use homeserver's ip, because it is behind NAT,fill in cloudServer DOMAIN, 
                                            // indicate it is a private protocol 
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


    const isHeartBeatReceived = async () => {

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


    /**
     * *************************************************************************************************************************
     *                                          end of websocket callback functions 
     * **************************************************************************************************************************
     */


    const handleGetUserMediaError = (e) => {
        switch(e.name) {
            case "NotFoundError":
                alert("Unable to open your call because no camera and/or microphone" +
                        "were found.");
                break;
            case "SecurityError":
                break ;

            case "PermissionDeniedError":

                // Do nothing; this is the same as the user canceling the call.
                break;
            default:
                alert("Error opening your camera and/or microphone: " + e.message);
                break;
        }

        closeVideoCall();
    }

    const closeVideoCall = () => {

        // Close the RTCPeerConnection
  
        if (webRTC_inst_obj.webRTC_inst) {
  
          // Disconnect all our event listeners; we don't want stray events
          // to interfere with the hangup while it's ongoing.
  
          webRTC_inst_obj.webRTC_inst.ontrack = null;
          webRTC_inst_obj.webRTC_inst.onnicecandidate = null;
          webRTC_inst_obj.webRTC_inst.oniceconnectionstatechange = null;
          webRTC_inst_obj.webRTC_inst.onsignalingstatechange = null;
          webRTC_inst_obj.webRTC_inst.onicegatheringstatechange = null;
          webRTC_inst_obj.webRTC_inst.onnotificationneeded = null;
  
          // Stop all transceivers on the connection
  
          webRTC_inst_obj.webRTC_inst.getTransceivers().forEach(transceiver => {
            transceiver.stop();
          });
  
          // Stop the webcam preview as well by pausing the <video>
          // element, then stopping each of the getUserMedia() tracks
          // on it.

  
          if(localStream){
            localStream.getTracks().forEach(track => {
                track.stop();
              });
          }

          if(remoteStream){
            remoteStream.getTracks().forEach(track => {
                track.stop();
              });
          }
  
          // Close the peer connection
          webRTC_inst_obj.webRTC_inst.close();
          webRTC_inst_obj.webRTC_inst = null;

        }

    }


    return (
        <div className='peersChatMenuRoot'>
            <p className="PeersChat" style={{color:'black'}} onClick={handleOnclick2ExpandMenu}> 
                <span>PeersChat</span>
            </p>

            <div className="chatViewRoot" style={{display: isExpandMenu == true ? 'block':'none'}}>
                <div className="topBar">
                    <div className="closeIconWrapper" onClick={handleOnclick2CloseMenu}>
                        <CloseIcon style={{ color: 'white', fontSize: "20px" }} />
                    </div>
                </div>
                <div className="chatContainer">
                    <PeersChat  />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        selectedContact: state.websocket.selectedContact,
        selectedGroup : state.websocket.selectedGroup,
        selectedChatRoom : state.websocket.selectedChatRoom,
        toggleSignal: state.websocket.toggleSignal,
        status      : state.auth.status,
        newMsgReadyToggle : state.websocket.newMsgReadyToggle,
        isInVideoCall : state.websocket.isInVideoCall,
        myUserName : state.auth.myUserName,
        sock_conn : state.websocket.sock_conn,
        mediaCallState : state.websocket.mediaCallState,
        remoteStream_ref: state.websocket.remoteStream_ref,
        localStream_ref : state.websocket.localStream_ref,
        allContactList_keyIsIpId : state.websocket.allContactList_keyIsIpId
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
        // createWebsocket : (socket_cnn) => dispatch(createWebsocketAction(socket_cnn))
        destroyWebsocketAction : () => dispatch(destroyWebsocketAction()),
        setIsExpandChatMenuAction : (isExpandMenu) => dispatch(setIsExpandChatMenuAction(isExpandMenu)),
        setNewMsgToggleAction         : (newMsgReadyToggle) => dispatch(setNewMsgToggleAction(newMsgReadyToggle)),
        authCheckTokenVaidAction      : () => dispatch(authCheckTokenVaidAction()),
        setWebRTCmediaCallStateAction : (mediaCallState) => dispatch(setWebRTCmediaCallStateAction(mediaCallState)),
        setContactListAction : (allContactList_keyIsIpId) =>  dispatch(setContactListAction(allContactList_keyIsIpId))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (PeersChatMenu)

