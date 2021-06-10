/**
 * 用此方法的原因：
 * useEffect 中无法使用 await来等待一条程序执行完，
 * 在比较深层的父子组件中传递callback函数比较麻烦
 */
import getSafePropertyWithAlert from './../../../../../utility/getSafePropertyWithAlert'
import {
    selectedContactObj,
    me,
} from './globalVar'
import {my_wsuri} from '../../../../../ipconfig'
import * as mediaCallStateTypes from '../../../../../store/websocket/webSocketState'

const fileName = 'global_webRTC.js'


const closeCall = async () => {

    console.log("Closing the call");

    // Close the RTCPeerConnection

    if (webRTC_inst_obj.webRTC_inst) {

        console.log("closing webRTC_inst ...")
        webRTC_inst_obj.whoAmI = ''

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
      console.log("Transceivers closed ...")

      // Stop the webcam preview as well by pausing the <video>
      // element, then stopping each of the getUserMedia() tracks
      // on it.

      if(webRTC_inst_obj.localStream){
        webRTC_inst_obj.localStream.getTracks().forEach(track => {
            track.stop();
          });
      }

      console.log("local stream closed ...")

      if(webRTC_inst_obj.remoteStream){
        webRTC_inst_obj.remoteStream.getTracks().forEach(track => {
            track.stop();
          });
      }

      console.log("remote stream closed ...")

      // Close the peer connection
      webRTC_inst_obj.webRTC_inst.close();
      webRTC_inst_obj.webRTC_inst = null;
      webRTC_inst_obj.localStream = null;
      webRTC_inst_obj.remoteStream = null;
      
    }

  }

const createPeerConnection = async () => {

    await closeCall()
    
    const webRTC_inst = new RTCPeerConnection({
        iceServers: [     // Information about ICE servers - Use your own!
            {
                urls : 'stun:stun.l.google.com:19302'
            }
        ]
    });


    webRTC_inst.onicecandidate = handleICECandidateEvent
    webRTC_inst.ontrack = handleTrackEvent;
    webRTC_inst.onnegotiationneeded = handleNegotiationNeededEvent;
    webRTC_inst.oniceconnectionstatechange = handleICEConnectionStateChangeEvent;
    webRTC_inst.onicegatheringstatechange = handleICEGatheringStateChangeEvent;
    webRTC_inst.onsignalingstatechange = handleSignalingStateChangeEvent;

    webRTC_inst_obj.webRTC_inst = webRTC_inst 
}


export const webRTC_inst_obj = {

    webRTC_inst : '',
    socket_conn : '',
    localStream : '',
    remoteStream : '',
    localVideoCom_ref : '',
    remoteVideoCom_ref : '',
    closeCall          :  closeCall ,
    whoAmI             : '' ,  // 'caller' / 'callee', only assign value at click call or at receiving offer
    mediaCallState     : mediaCallStateTypes.WEBSOCKET_MEDIACALL_STATE_IDLE ,

    // methods 
    createPeerConnection : createPeerConnection,

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
    // if (webSocketReadyState != 1){
    //     alert("refresh the page to connect to server again")
    //     webRTC_inst_obj.socket_conn.close()
    //     webRTC_inst_obj.socket_conn = ''
    //     // distroy websocket to make sure websocketConn is null,otherwise cannot create a new one,logic lock!!!

    //     return
    // }

    console.log(`selectedContact.webSocketUrl = ${selectedContact.webSocketUrl}, selectedContact.hisID = ${selectedContact.hisID}  `)
    console.log(`selectedContact.webSocketUrl = ${selectedContact.webSocketUrl}, selectedContact.hisID = ${selectedContact.hisID}  `)

    webRTC_inst_obj.socket_conn.send(JSON.stringify({
        TO : {
            "URL"    :  selectedContact.webSocketUrl,  // the websocket url+port to connect to 
            "ID"     : `${selectedContact.hisID}`,       // his id or unique name on his server 
        },
        FROM : {
            "URL"    : my_wsuri,
            "ID"     : me.myUserName , 
            "CATEGORY": "CONTACT"
        },
        TYPE_OUTER : "MSG" ,
        DATA : {    // data can be encrypted from peerDevice-to-peerDevice
            "TYPE_INNER"   : type_inner,  
            "PAYLOAD":  payload 
        }
    }))
}


const handleICECandidateEvent = (event) => {

    if (event.candidate) {
        /**
         * receive candidate from the Ice server
         * send the local ice candidate to remote peer 
         */
        const IceCandidate = new RTCIceCandidate(event.candidate);
        console.log("handleICECandidateEvent, receive local icecandidates, and send it to remote peer")

        webRTC_inst_obj.myIceCandidate = IceCandidate 

        sendMsg('candidate',IceCandidate)  
    
    }

}


const handleTrackEvent = (event) =>  {
    console.log("****** handleTrackEvent.......")
    /**
     * When new tracks are added to the RTCPeerConnection— 
     * either by calling its addTrack() method or 
     * because of renegotiation of the stream's format
     */
    console.log ("*******************************************************")
    console.log ("*******************************************************")
    console.log ("******* got new stream from remote peer",event.streams[0])
    console.log ("*******************************************************")
    console.log ("*******************************************************")

    // get remote stream display on html page
    // this.$refs.remoteCamRef.srcObject = event.streams[0]  ;

    // this.remoteStream = event.streams[0];
    // this.updateRemoteStream = !this.updateRemoteStream;
    webRTC_inst_obj.remoteVideoCom_ref.current.srcObject = event.streams[0] ;
    webRTC_inst_obj.remoteStream = event.streams[0]

    // add remote stream to html element 

}


const handleNegotiationNeededEvent = async () => {

    /**
     * Once the caller has created its  RTCPeerConnection, 
     * created a media stream, and added its tracks to the connection as 
     * shown in Starting a call, the browser will deliver a negotiationneeded
     *  event to the RTCPeerConnection to indicate that it's ready to begin
     *  negotiation with the other peer
     *  当添加新的媒体源时，就生成新的offer，告诉对方自己available的视频的格式，
     */

    console.log("******* handleNegotiationNeededEvent")
    if (webRTC_inst_obj.whoAmI !== 'caller'){
        alert('you must be a caller to trigger handleNegotiationNeededEvent, check webRTC logic flow')
    }
    
    let offer 
    try {
        offer = await webRTC_inst_obj.webRTC_inst.createOffer();
        await webRTC_inst_obj.webRTC_inst.setLocalDescription(offer);
        
    } catch(e) {
        console.log(e)
        alert(e)
        return ;
    }
    // sent offer to other peer over signaling channel 
    sendMsg('offer', offer)

}


const handleICEConnectionStateChangeEvent = (event) => {
    console.log("******* handleICEConnectionStateChangeEvent")
    switch(webRTC_inst_obj.webRTC_inst.iceConnectionState) {
        case "closed":
        case "failed":
        case "disconnected":
            closeCall();
            break;
    }
}


const handleICEGatheringStateChangeEvent = (event) => {
    /**
     * icegatheringstatechange events are used 
     * to let you know when the ICE candidate gathering 
     * process state changes
     */
    // Our sample just logs information to console here,
    // but you can do whatever you need.
    console.log("****** handleICEGatheringStateChangeEvent")
}


const handleSignalingStateChangeEvent = (event) =>  {
    console.log("***** handleSignalingStateChangeEvent")
    switch(webRTC_inst_obj.webRTC_inst.signalingState) {
        case "closed":
            closeCall();
            break;
    }
}





