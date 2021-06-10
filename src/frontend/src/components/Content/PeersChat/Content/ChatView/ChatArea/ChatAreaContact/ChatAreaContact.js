import React,{useEffect,useState,useRef} from 'react'
import VideoCallIcon from '@material-ui/icons/VideoCall';
import PermPhoneMsgIcon from '@material-ui/icons/PermPhoneMsg';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachmentIcon from '@material-ui/icons/Attachment';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import SendIcon from '@material-ui/icons/Send';
import { connect } from 'react-redux';
import { 
    destroyWebsocketAction,
    setWebRTCmediaCallStateAction,
    setWebRTCstreamRefAction,
    setIsShowPanelAction
    } from '../../../../../../../store/websocket/actions'
import { 
    authLogoutAction,
    authCheckTokenVaidAction
    } from '../../../../../../../store/auth/actions'
import {my_wsuri} from '../../../../../../../ipconfig'
import * as actionType  from '../../../../../../../store/auth/actionTypes'
import * as webSocketState from '../../../../../../../store/websocket/webSocketState'
import asyncDelay from '../../../../../../../utility/asyncDelay'
import getSafePropertyWithAlert from '../../../../../../../utility/getSafePropertyWithAlert'
import getSafeProperty from '../../../../../../../utility/getSafeProperty'

import './ChatAreaContact.css'
import { AlternateEmail } from '@material-ui/icons';
import {msgsContactObj,
    selectedContactObj,
    auth_Global
} from '../../../../../../NavigationBar/Menu/PeersChatMenu/websocket/globalVar'
import {
    webRTC_inst_obj
} from '../../../../../../NavigationBar/Menu/PeersChatMenu/websocket/global_webRTC'
import axios from "axios";
import {messageEndPoint} from '../../../../../../../ipconfig'
import handleError from '../../../../../../../utility/handleError'
import PhoneEnabledIcon from '@material-ui/icons/PhoneEnabled';
import PhoneDisabledIcon from '@material-ui/icons/PhoneDisabled';
import ReplyIcon from '@material-ui/icons/Reply';


function ChatAreaContact(props) {

    const [textEditable,setTextEditable] = useState(true)
    const [inputValue,setInputValue] = useState([])
    const inputeditableRef = useRef(null)
    const [profileImg,setProfileImg] = useState('meihua.png')
    const [profileName,setProfileName] = useState("韩梅梅")
    const [sayUsayMe,setSayUsayMe] = useState("IMU")
    const [msgArray,setMsgArray] = useState([])
    const [isCallStarter,setIsCallStarter] = useState(false)


    const [selectedContact,setSelectedContact] = useState(props.selectedContact)

    const messageAreaRef = useRef(null)

    const fileName = "ChatAreaContact.js"

    const messageDirection = {
        incoming : true ,
        outgoing : false ,
    }

    const remoteStreamRef =  useRef(null)
    const localStreamRef  =  useRef(null)

    const [media_area_div,setMedia_area_div]= useState('')

    useEffect(() => {

        const keydownHandler = (e) => {
            if(e.keyCode===13 && e.ctrlKey) {
                handleSendMessage(e)
            }
        }

        props.setWebRTCstreamRefAction(localStreamRef,remoteStreamRef)
        webRTC_inst_obj.remoteVideoCom_ref = remoteStreamRef ;
        webRTC_inst_obj.localVideoCom_ref = localStreamRef ;

        document.addEventListener('keydown', keydownHandler)

        return () => {
            document.removeEventListener('keydown', keydownHandler)
        }

    }, [])


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
     * socket_conn.send(JSON.stringify({
            "TO" : {
                "URL"    : "websocket url+port",
                "ID"     : "the ID of the selectedContact on his cloud server,the destination domain may contain serveral family members",  
            },
            "FROM" : {
                "URL"    : "websocket url+port",
                "ID"     : "the ID of the sender on his cloud server,the source domain may contain serveral family members", 
                "CATEGORY" : "Group"
            },
            "TYPE_OUTER" : "HEARTBEAT"
            "DATA" : {
                "TYPE_INNER"   : "HEARTBEAT",
                "PAYLOAD":  "IMU" 
            }
        }))
    * */


    const sendMsg = async (type_inner,payload) => {
        const functionName = "sendMsg(payload)"

        if (!payload){
            alert("empty input detected")
            return
        }

        props.authCheckTokenVaidAction()
        await asyncDelay(1)
        if(props.login_status !== actionType.LOGIN_STATUS_SUCCEED){
            alert("please log in")
            return
        }

        if (!webRTC_inst_obj.socket_conn) {
            alert(`in ${fileName},function ${functionName}, websocketConn is empty, please connect to server via websocket`)
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

        const selectedContact = selectedContactObj.selectedContact
        // const selectedContact = props.selectedContact

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

    const handleOnInput = (e) => {
        // console.log(inputeditableRef.current.innerHTML)
        // console.log(inputeditableRef.current.clientHeight)
        // setInputMsg(inputeditableRef.current.innerHTML)
    }

    const handleSendMessage = (e) => {
        // const textContent = (inputeditableRef.current.innerText || inputeditableRef.current.textContent)
        // console.log(inputeditableRef.current.innerHTML)

        sendMsg('MSG',inputeditableRef.current.innerHTML)
        inputeditableRef.current.innerHTML = ''
        
    }

    useEffect(() => {
        const functionName = "useEffect[props.newMsgReadyToggle]"

        const msgArrayOfTheContact = getSafeProperty(()=> msgsContactObj.msgsContact[`${props.selectedContact.webSocketUrl}+${props.selectedContact.hisID}`] , undefined)
        
        if (props.mediaCallState === webSocketState.WEBSOCKET_MEDIACALL_STATE_IDLE) {
            messageAreaRef.current.innerHTML = '' 
            if (msgArrayOfTheContact != undefined){
                // const msgArrayReversed = msgArrayOfTheContact.slice().reverse()
                const msgArrayReversed = msgArrayOfTheContact
                for (let i=0; i<msgArrayReversed.length; i++){
                    let divMsgWrapper = document.createElement("div");
                    if ( msgArrayReversed[i]['direction']== messageDirection.incoming){
                        divMsgWrapper.className = "incomingMsg"
                    } else if(msgArrayReversed[i]['direction']== messageDirection.outgoing) {
                        divMsgWrapper.className = "outgoingMsg"
                    }
                    let divMsg = document.createElement("div");
                    divMsg.className = "msg"
                    divMsg.innerHTML = msgArrayReversed[i]['MSG'];  
                    divMsgWrapper.appendChild(divMsg)
                    messageAreaRef.current.appendChild(divMsgWrapper)
                }
                // setMsgArray(msgArrayOfTheContact.slice().reverse())
            }
        } 
        
        return () => {
            
        }
    }, [props.newMsgReadyToggle])


    // get the Last pageLen message
    const fetchLastNMsg_contact = (contact_id,user_id,his_webSocketUrl,hisID) => {
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
    
            msgsContactObj.msgsContact[`${his_webSocketUrl}+${hisID}`] = data.querySet
    
            // toggle the signal to force re-render
            msgsContactObj.newMsgToggleSignalFn(!msgsContactObj.newMsgReadyToggle)
            
        })
        .catch(error => {
    
            handleError(error,fileName,functionName)
    
        })
    }

    const fetechUnreadMsg_contact = (contact_id,user_id,his_webSocketUrl,hisID) => {
        const functionName = 'fetchLastNMsg_contact'
    
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
            // otherwise create a new one (should be pulling latest N messages including the unread ones)
            const unReadMsgArray = data.querySet.slice().reverse()
            unReadMsgArray.push(...msgsContactObj.msgsContact[`${his_webSocketUrl}+${hisID}`])
    
            msgsContactObj.msgsContact[`${his_webSocketUrl}+${hisID}`] = unReadMsgArray
    
            // toggle the signal to force re-render
            msgsContactObj.newMsgToggleSignalFn(!msgsContactObj.newMsgReadyToggle)
            
        })
        .catch(error => {
    
            handleError(error,fileName,functionName)
    
        })
    }


    useEffect(() => {
        
        const selectedContact = props.selectedContact

        if (props.mediaCallState === webSocketState.WEBSOCKET_MEDIACALL_STATE_IDLE) {
            messageAreaRef.current.innerHTML = ''
        }

        //when switch another contact
        if (msgsContactObj.msgsContact.hasOwnProperty(`${selectedContact.webSocketUrl}+${selectedContact.hisID}`) == true){
            // 1.1 if local message exist,go get unread message
            fetechUnreadMsg_contact(selectedContact.id,selectedContact.user_id,selectedContact.webSocketUrl,selectedContact.hisID)
            // toggle the signal to force re-render
            // msgsContactObj.newMsgToggleSignalFn(!msgsContactObj.newMsgReadyToggle)
        } else {
            // 1.2 else go fetch from backend database 
            fetchLastNMsg_contact(selectedContact.id,selectedContact.user_id,selectedContact.webSocketUrl,selectedContact.hisID)
        }

        return () => {
            
        }

    }, [props.selectedContact])


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

    }

    const onClickMakeVideoCall = async () => {
        if (props.mediaCallState !== webSocketState.WEBSOCKET_MEDIACALL_STATE_IDLE) {
            alert("still in call,please hand off current call before start a new call")
            return
        }

        props.setWebRTCmediaCallStateAction(webSocketState.WEBSOCKET_MEDIACALL_STATE_INVIDEOCALL)

        await onClickMakeMeidaCall(true)
    }

    const onClickMakeMeidaCall = async (isVideoTrue) => {
        
        // 1. initialize a new webRTC connection instance 
        webRTC_inst_obj.whoAmI = 'caller'
        await webRTC_inst_obj.createPeerConnection()

        // 2. assign remote and local video component to global_webRTC's remote_video_ref and local_video_ref,so that 
        // the incoming stream and local stream will be displayed accordingly 
        
        
        // 3. get local media add to localdesciption 
        // get local media 
        const mediaConstraints = {
            'video': isVideoTrue,
            'audio': true
        };
        let localStream ;
        try {
            localStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
        } catch (e) {
            // console.log(e)
            handleGetUserMediaError(e);
            return;
        }
        webRTC_inst_obj.localStream = localStream

        // 4.  addtrack,so that it will trigger handleNegotiationNeededEvent
        localStreamRef.current.srcObject = localStream ;

        for (const track of localStream.getTracks()){
            await webRTC_inst_obj.webRTC_inst.addTrack(track,localStream);
        }

        // 5. in handleNegotiationNeededEvent callback function generate offer ,send it to other peer 


        // 6. wait for answer and move forward from there
    }

    const onClickMakeAudioCall = async () => {

        if(props.mediaCallState !== webSocketState.WEBSOCKET_MEDIACALL_STATE_IDLE){
            alert("still in call,please hand off current call before start a new call")
            return 
        }
        props.setWebRTCmediaCallStateAction(webSocketState.WEBSOCKET_MEDIACALL_STATE_INVOICECALL)

        await onClickMakeMeidaCall(false)
    }

    const handleAcceptVideoCall = () => {
        // if(props.mediaCallState !== webSocketState.WEBSOCKET_MEDIACALL_STATE_IDLE){
        //     // to do : change from voic call to vedio call on the fly 
        //     alert("still in call,please hand off current call before start a new call")
        //     return 
        // }
        props.setWebRTCmediaCallStateAction(webSocketState.WEBSOCKET_MEDIACALL_STATE_INVIDEOCALL)
        webRTC_inst_obj.mediaCallState = webSocketState.WEBSOCKET_MEDIACALL_STATE_INVIDEOCALL
    }

    const handleAcceptCall = () => {
        // if(props.mediaCallState !== webSocketState.WEBSOCKET_MEDIACALL_STATE_IDLE){
        //     // to do : change from video call to voice call on the fly 
        //     alert("still in call,please hand off current call before start a new call")
        //     return 
        // }
        props.setWebRTCmediaCallStateAction(webSocketState.WEBSOCKET_MEDIACALL_STATE_INVOICECALL)
        webRTC_inst_obj.mediaCallState = webSocketState.WEBSOCKET_MEDIACALL_STATE_INVOICECALL
    }

    const handleDenyCall = async () => {

        await webRTC_inst_obj.closeCall()

        props.setWebRTCmediaCallStateAction(webSocketState.WEBSOCKET_MEDIACALL_STATE_IDLE)
        webRTC_inst_obj.mediaCallState = webSocketState.WEBSOCKET_MEDIACALL_STATE_IDLE

    }

    const onClickGo2Panel = () => {
        props.setIsShowPanelAction(true) // go to panel view
    }

    console.log("mediaCallState = ", props.mediaCallState)
    
    const media_area_video =    <div className='videoCallArea' style={{display : props.mediaCallState !== webSocketState.WEBSOCKET_MEDIACALL_STATE_IDLE ? 'grid' : 'none' }} >
                                    <div className="remoteWindow">
                                        <video className="remoteStreamVideo" ref={remoteStreamRef} autoPlay></video>
                                    </div>
                                    <div className="localWindow">
                                        <video className="localStreamVideo" ref={localStreamRef} autoPlay></video>
                                    </div>
                                    
                                    <div className="acceptVideo" onClick={handleAcceptVideoCall}>
                                        <VideoCallIcon style={{ color: 'green', fontSize: "30px" }} />
                                    </div>
                                    <div className="answer" onClick={handleAcceptCall}>
                                        <PhoneEnabledIcon style={{ color: 'green', fontSize: "30px" }} />
                                    </div>
                                    <div className="deny" onClick={handleDenyCall}>
                                        <PhoneDisabledIcon style={{ color: 'red', fontSize: "30px" }} />
                                    </div>
                                </div>

    const media_area_txt = <div className='messageArea' ref={messageAreaRef} style={{display : props.mediaCallState === webSocketState.WEBSOCKET_MEDIACALL_STATE_IDLE ?  'flex' : 'none'}}></div>
    
    return (
        <div className='chatAreaContactRoot'>
            <div className='contactProfile'>
                <div className='profileImg'>
                    <img src={props.selectedContact.image}  />
                </div>
                <p className='contactName'>
                    {props.selectedContact.name}
                </p>
                <a className='sayUsayMe'
                    href="#"
                >
                    {sayUsayMe}
                </a>
                <div className='videoCall' onClick={onClickMakeVideoCall}>
                    <VideoCallIcon style={{ color: 'white', fontSize: "25px" }} />
                </div>
                <div className='voiceCall' onClick={onClickMakeAudioCall}>
                    <PermPhoneMsgIcon style={{ color: 'white', fontSize: "25px" }} />
                </div>
                <div className='voiceCall' onClick={onClickGo2Panel}>
                    <ReplyIcon style={{ color: 'white', fontSize: "25px" }} />
                </div>
                <div className='more'>
                    <MoreVertIcon style={{ color: 'white', fontSize: "25px" }} />
                </div>
            </div>

            {media_area_video}
            {media_area_txt}

            <div className='textInput'>
                <div className='sendFileIcon'>
                    <AttachmentIcon style={{ color: 'white', fontSize: "30px" }} />
                </div>
                <div 
                    className='typeTextHere' 
                    contentEditable={textEditable}
                    onInput={handleOnInput}
                    ref={inputeditableRef}
                >

                </div>
                <div className='emoji'>
                    <EmojiEmotionsIcon style={{ color: 'rgb(235, 228, 137)', fontSize: "30px" }} />
                </div>
                <div className='sendIcon' onClick={handleSendMessage}>
                    <SendIcon style={{ color: 'white', fontSize: "30px" }} />
                </div>
            </div>
        </div>

    )
}


// websocketConn

const mapStateToProps = state => {
    return {
        login_status: state.auth.status ,
        isTokenValid: state.auth.isTokenValid,
        websocketConn: state.websocket.websocketConn,
        myUserName : state.auth.myUserName,
        toggleSignal : state.websocket.toggleSignal,
        newMsgReadyToggle : state.websocket.newMsgReadyToggle,
        selectedContact : state.websocket.selectedContact,
        mediaCallState :state.websocket.mediaCallState
    };
  };
  
  
const mapDispatchToProps = dispatch => {
    return {
        authLogoutAction : () => dispatch(authLogoutAction()),
        authCheckTokenVaidAction: () => dispatch(authCheckTokenVaidAction()),
        destroyWebsocketAction: () => dispatch(destroyWebsocketAction()),
        setWebRTCmediaCallStateAction : (mediaCallState) => dispatch(setWebRTCmediaCallStateAction(mediaCallState)),
        setWebRTCstreamRefAction : (localStreamRef,remoteStreamRef) => dispatch(setWebRTCstreamRefAction(localStreamRef,remoteStreamRef)),
        setIsShowPanelAction : (isShowPanel) => dispatch(setIsShowPanelAction(isShowPanel))
    };
  };

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (ChatAreaContact)