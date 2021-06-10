/**
 * 用這種土方法的好處就是避開在註冊回調函數時，props傳入的變量無法更新的問題。
 * 回調函數傳入的變量的值，如果不是全局變量，一直就是開始記憶的值，這點要留意。
 * 
 * rules to follow when changing the values in the global objects. 
 * 
 * when values are shared with component functions, should only invoke callback function from a component where this object are initialized.
 * 1. change the value in the store first
 * 2. then use useEffect to watch the state of the value,whenever it changes, in useEffect function change the value in the global object according to 
 * the state of the value in the store. do not change the value in the global object directly.thus the other components which watch the state of the variable 
 * can take action accordingly.
 * 
 */


/**
 * 
 * msgsContact data layout : 
 * msgsContact = {
 *          url+id : {
 *                      sent : [sentArray],
 *                      rcvd : [rcvdArray]
 *                  }
 * }
 * 
 * unReadMsgCnt: {
        url+id : cnt
    }
 * 
 */
export const msgsContactObj = {
    msgsContact : {

    },
    newMsgToggleSignalFn : null,
    newMsgReadyToggle : false,
    unReadMsgCnt: {

    }
}

/**
 * 
 * msgsGroup data layout : 
 * msgsGroup = {
 *          url+id : {
 *                      sent : [sentArray],
 *                      rcvd : [rcvdArray]
 *                  }
 * }
 * 
 * rcvdArray[i] data layout : {
 *      sender_url: xxx ,
 *      sender_id : xxx ,
 *      msgbody   : lalalalal
 * }
 * 
 */
export const msgsGroup = {

}


/**
 * 
 * msgsChatRoom data layout : 
 * msgsChatRoom = {
 *          url+id : {
 *                      sent : [sentArray],
 *                      rcvd : [rcvdArray]
 *                  }
 * }
 * 
 * sentArray[i] data layout : {
 *      sender_url: xxx ,
 *      sender_id : xxx ,
 *      msgbody   : lalalalal
 * }
 * 
 */
export const msgsChatRoom = {

}



/**
 * 
 * allContactObj.allContact = {
 *  url+id : contact 
 * }
 * 
 */
export const allContactObj = {
    allContact : {} ,
}

export const allGroupObj = {
    allGroup : null ,
    setAllGroup_CB : null 
}

export const allChatroomObj = {
    allChatroom : null ,
    setAllChatroom_CB : null 
}

export const selectedContactObj = {
    selectedContact : {
        webSocketUrl: null,
        hisID : null             
    },
    setSelectedContact_CB : null,
}

export const selectedGroupObj = {
    selectedGroup : null,
    setSelectedGroup_CB : null,
}

export const selectedChatroomObj = {
    selectedChatroom : null,
    setSelectedChatroom_CB : null,
}

export const me = {
    myUserName : null,
    myUserID : null ,
    userImage: null 
}


/**
 * 
 *  createPeerConnection() {
      if (this.newPeerConnection){
          console.log("PeerConnection exist, can't not create again");
          return;
      }
      this.newPeerConnection = new RTCPeerConnection({
          iceServers: [     // Information about ICE servers - Use your own!
              {
                  urls : 'stun:stun.l.google.com:19302'
              }
          ]
      });

      this.newPeerConnection.onicecandidate = this.handleICECandidateEvent;
      this.newPeerConnection.ontrack = this.handleTrackEvent;
      this.newPeerConnection.onnegotiationneeded = this.handleNegotiationNeededEvent;
      this.newPeerConnection.onremovetrack = this.handleRemoveTrackEvent;
      this.newPeerConnection.oniceconnectionstatechange = this.handleICEConnectionStateChangeEvent;
      this.newPeerConnection.onicegatheringstatechange = this.handleICEGatheringStateChangeEvent;
      this.newPeerConnection.onsignalingstatechange = this.handleSignalingStateChangeEvent;
    },
    isInCall : indicating if the user is in the call with his contact,and takes no more incall untill he finish the current one
 * 
 */

// export const webRTC_global = {

//     webRTC_peerConnection  : null ,
//     localStream : null ,
//     remoteStream : null ,
//     isInCall : false,
//     setIsIncallStoreAction_cb : '',
//     isCallAccepted : false,
//     isCallDenied : false,
//     setIsCallAcceptedOrDenied_cb : '',

//     /**
//      * incoming_msg : which contains the offer message
//      * processAnswerTheCall_cbfn : when press answer the call in component file ChatAreaContact.js,this function is invoked 
//      *                              which will invoke the function processingOffer in component file PeersChatMenu.js
//      * in short: the purpose of these three global signals is to avoid passing signals and callback function thru props from / to 
//      * the long internal path between a parant component and child component.
//      * 这三个全局信号和回调函数的目的，是为了避免信号在子组件和父组件之间的深层传递。如果只是隔着一代，信号传递还ok，隔着太多的其他子父组件，信号来回传递过程
//      * 太过于复杂。要更新的部分也随之增多，不如直接用全局变量，无需触发其他无关组件的更新.
//      * when and where these values are assigned : 
//      * 1. processAnswerTheCall_cbfn is initialized with the function pointer :processingOffer at the time when parent component PeersChatMenu.js
//      *              is created. 
//      * 3. incomming_msg: same as above
//      *
//      * 
//      * 
//      * 
//      */

//     incoming_msg : '',
//     socket_conn : '',
//     myUserName : '' ,
//     processAnswerTheCall_cbfn : '',

//     /**
//      *  用于从子组件ChatAreaContact.js传递remoteStream_ref和localStream_ref到父组件PeersChatMenu.js
//      *  于ChatAreaContact.js子组件创建时赋值
//      *  used to pass values of remoteStream_ref and localStream_ref from child component ChatAreaContact.js to parent component PeersChatMenu.js
//      *  assigned value at the creation of child component 
//      */
//     localStreamRef : null ,
//     remoteStreamRef : null,


// }

export const auth_Global = {
    checkTokenValidOrNot_async : null , // check if token still valid,initialized in file App.js,it will delete the token and logout if not valid, 
                                        // then use a promise and timeout logic to poll the loginStatus signal (status) in store,and then execute the 
                                        // next line of code that follows 
    loginStatus : false 
}

 


