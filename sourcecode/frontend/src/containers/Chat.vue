<template>
<div id="grid-container">
  <div id="side-panel">

    <div id="search-bar">
        <!-- <div id="searchIcon">  -->
          <!-- <v-icon >mdi-eye</v-icon>   -->
        <!-- </div> -->
        <div id="inputArea">
          <!-- <input 
            type="text"
            placeholder="search your friends"
          > -->
          <p>
            {{myUserName}}
          </p>
        </div>
    </div>

    <div id="profile">
          <img id="profile_img" src="https://5b0988e595225.cdn.sohucs.com/images/20191103/0f67a5b5b70f4416852885e48c14ae6a.jpeg" class="online" alt="" />
          <form id="input_username">
            <input class="IP" type="text" maxlength="60" v-model="vBindMyIP" placeholder="http://52.79.86.10:8964">
            <input class="usrname" type="text" maxlength="30" v-model="inputName" placeholder="Username">
  
            <input class="btn" type="button" name="login" value="Log in" v-on:click="register">
          </form>

          <form id="add_friend">
            <input class="IP" type="text" maxlength="60" v-model="vBindFriendIP" placeholder="input friend's IP">
            <input class="usrname" type="text" maxlength="30" v-model="inputFriendName" placeholder="friend's name">
  
            <input class="btn" type="button" name="add" value="add" v-on:click="addFriend">
          </form>
    </div>
    
    <div id="contact-list">
          <a class="card" 
            v-for="contact in contactList" 
            :key="contact.ip+'/'+contact.name" 
            v-on:click="selectContact(contact)"
            v-show="contact.ip+'/'+contact.name===myIP+'/'+myUserName? false : true"
            >
              <img src="https://5b0988e595225.cdn.sohucs.com/images/20180108/0ae5a618ed8741ab94dc109cf61ae284.jpeg" alt="" />
              <p class="name">{{contact.name}}</p>
              <p class="cont_ip">{{contact.ip}}</p>
          </a>
    </div>
  </div>

  
  <div v-if="otherUserName" class="rightSide" >

    <div class="messageComp">
      <MessageComp 
        class="msg"  
        v-bind:contact_name = "otherUserName"
        v-bind:msgArr = "msgList2Child"
        v-bind:updateLocalStream = "updateLocalStream"
        v-bind:updateRemoteStream = "updateRemoteStream"
        v-bind:local_stream = "localStream"
        v-bind:remote_stream = "remoteStream"
        v-bind:inCall = "inCall"
      />
      <v-icon v-show="inCall" id="hangup" class="red--text" v-on:click="hangupCall">mdi-phone-hangup</v-icon>
      <v-icon v-show="inCall" id="answer" class="green--text" v-on:click="answerCall">mdi-phone-hangup</v-icon>
    </div>

    <div id="input-area">
      <div id="chatMethods">
        <a class="audioCall" v-on:click="onClickMakeAudioCall">
          <v-icon class="green--text">mdi-phone</v-icon>
        </a>
        <a class="videoCall" v-on:click="onClickMakeVideoCall">
          <v-icon class="green--text">mdi-video-plus</v-icon>
        </a>
        <a class="sendFile" v-on:click="onclickSendFile">
          <v-icon class="green--text"> mdi-file-multiple-outline </v-icon>
        </a>
      </div>

      <div id="textArea">
        <textarea 
            placeholder="input your text here, hit Ctrl + Enter to send" 
            v-model="inputText" 
            @keydown="processKey"
          >

        </textarea>
      </div>

      <div id="sentButton"> 
        <v-icon class="green--text" type="button" v-on:click="sentText">mdi-send</v-icon>
      </div>

    </div>
  </div>

  <div v-else class="rightSide_emty">
        <div id="wakeup">
          <p class="important">
            Protecting data = protecting brain, <span>PRIVACY MATTERS</span> 
          </p>
          <p class="txt">
            Why people spend tremendous time on chat apps that collect privacy for free 
          </p>
          <p class="txt">
            it's time to make our own website talk to eachother, store our data at home 
          </p>
        </div>

        <img src="https://raw.githubusercontent.com/brianwchh/decentrialized-social-networking-software-system_1/master/pic/blockDiagram.png" alt="">
        <img src="https://github.com/brianwchh/decentrialized-social-networking-software-system_1/blob/master/pic/p2p.png?raw=true" alt="">
        <p class="textCont"> because I don't have domain name for this website now,so in order to
          use webrtc for video chat, the temporary simple solution is to set unsafely-treat-insecure-origin-as-secure
          option in your browser, and reset it back to defualt after you finish the video chat demo, below is the video tutorial 
        </p>
        <p class="textCont">
          chrome://flags/#unsafely-treat-insecure-origin-as-secure
          http://52.79.86.10
          http://52.78.225.18
        </p>
        <div class="video_container">
          <iframe class="tu_video"
            src="https://www.youtube.com/embed/8IpbgL5GlIM">
          </iframe>
        </div>
        <div class="video_container">
          <iframe class="tu_video"
            src="https://www.youtube.com/embed/Vv0f_0YaJx0">
          </iframe>
        </div>
  </div>


</div>
</template>

<script>
import MessageComp from '../components/Chat/MessageComp'
import {wsuri} from '../ipconfig'

export default {
  name: 'Home',
  components: {
    MessageComp ,
  },
  data () {
      return {

        vBindMyIP: 'http://52.79.86.10:8964' ,
        myIP : '',
        vBindFriendIP : '' ,
        inputFriendName: '' ,

        incomingMsgUser: '' ,
        myUserName: '',
        inputName: '',
        contactList: [],
        inputText: '',

        newPeerConnection: '',
        msgData: '',
        otherUserName: '',
        otherUserIP: '' ,
        isConnected: false,
        isLogin: false,
        sock_conn: '',
        webRTC_config: '',
        username: null,
        textMsgs: {},
        updateChild: false,
        msgList2Child: [],

        localStream : null,
        remoteStream : null,
        updateLocalStream : 0,
        updateRemoteStream : 0,

        incomingCall: false,
        acceptOrRefuse : '',

        inCall: '' ,
        isVideoCall: true ,

      }
  },

  created() {
    this.initWebSocket();
  },

  beforeDestroy(){
    // this.logout(this.username); // not working, need to do this in server end by detecting heartbeating....
  }, 

  destroyed() {
    this.sock_conn.close();
  },
  
  methods: {

    addFriend () {
        this.contactList.push({
          ip: this.vBindFriendIP,
          name: this.inputFriendName
        });
        this.vBindFriendIP = '' ;
        this.inputFriendName = '' ;
    },

    hangupCall(){
      this.acceptOrRefuse = "hangoff"
      console.log("hangup call");
      this.closeCall();
      this.inCall = false ;
    },

    answerCall() {
      this.acceptOrRefuse = "answer";
      console.log("answer call");
    },

    processKey(event){
      if(event.ctrlKey && event.keyCode === 13){
        this.sentText();
      }
    },

    async onclickSendFile(){
      console.log("send file .... ")
    },

    async selectContact(contact){
      this.otherUserName = contact.name ;
      this.otherUserIP = contact.ip ;
      this.msgList2Child = await this.textMsgs[this.otherUserIP+'/'+this.otherUserName];
      console.log(contact);
    },

    async sentText(){
      console.log("sent text message....");
      console.log(this.inputText);

      if(!this.inputText){
        return;
      }

      this.sock_conn.send(JSON.stringify(
          {
              type : "message",
              to   : { 
                      ip : this.otherUserIP,
                      name: this.otherUserName,
              },
              from : { 
                      ip : this.myIP,
                      name: this.myUserName,
              },
              data : {
                  type : "text" ,
                  data : this.inputText
              }
          }
      ));


      /**
       * textMsgs structure : 
       * 
       *  username0: [
       *              {thisUserName: textdata},
       *              {otherUserName: textdata},
       *               .
       *               .
       *               .
       *             ],
       * 
       *  username1: [
       *              {thisUserName: textdata},
       *              {otherUserName: textdata},
       *               .
       *               .
       *               .
       *             ],
       */
      // get text arrray of the contact 
      // append the text message to the array
      let textArr = [];
      if (!this.textMsgs[this.otherUserIP+'/'+this.otherUserName]){
        textArr.push({
            id: 0,
            type: "send",
            data : this.inputText 
          });
        this.textMsgs[this.otherUserIP+'/'+this.otherUserName] = textArr ;
      } else {
        textArr = this.textMsgs[this.otherUserIP+'/'+this.otherUserName];
        textArr.push({
            id: textArr.length,
            type: "send",
            data : this.inputText 
        })
        this.textMsgs[this.otherUserIP+'/'+this.otherUserName] = textArr ;
      }


      this.inputText = '' ;
      this.updateChild = await !this.updateChild ;
      this.msgList2Child = await this.textMsgs[this.otherUserIP+'/'+this.otherUserName];

      console.log(this.textMsgs)

    },

    async createPeerConnection() {
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

    handleGetUserMediaError(e) {
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

        // closeVideoCall();
    },

    handleICECandidateEvent(event) {
        console.log("******** handleICECandidateEvent")
        if (event.candidate) {
            /**
             * send the local ice candidate to remote peer on recieving them from ice server
             */
            const IceCandidate = new RTCIceCandidate(event.candidate);
            console.log("the local icecandidates is : ",IceCandidate);
            this.sock_conn.send(JSON.stringify({
                type : "message",
                to   : { 
                      ip : this.otherUserIP,
                      name: this.otherUserName,
              },
              from : { 
                      ip : this.myIP,
                      name: this.myUserName,
              },
                data : {
                    type : "candidate",
                    data : event.candidate
                }
            }))
        }
    },

    handleTrackEvent(event) {
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

        this.remoteStream = event.streams[0];
        this.updateRemoteStream = !this.updateRemoteStream;

    },

    async handleNegotiationNeededEvent() {

        /**
         * Once the caller has created its  RTCPeerConnection, 
         * created a media stream, and added its tracks to the connection as 
         * shown in Starting a call, the browser will deliver a negotiationneeded
         *  event to the RTCPeerConnection to indicate that it's ready to begin
         *  negotiation with the other peer
         */

        console.log("******* handleNegotiationNeededEvent")
        
        let offer 
        try {
            offer = await this.newPeerConnection.createOffer();
            await this.newPeerConnection.setLocalDescription(offer);
        } catch(e) {
            console.log(e)
            return ;
        }
        // sent offer to other peer over signaling channel 
        this.sock_conn.send(JSON.stringify(
            {
                type : "message",
                to   : { 
                      ip : this.otherUserIP,
                      name: this.otherUserName,
              },
              from : { 
                      ip : this.myIP,
                      name: this.myUserName,
              },
                data : {
                    "type" : "offer" ,
                    "data" : offer 
                }
            }
        ))
    },

    handleRemoveTrackEvent(event) {
        console.log("****** handleRemoveTrackEvent",event)
        // var stream = document.getElementById("received_video").srcObject;
        // var trackList = stream.getTracks();
        
        // if (trackList.length == 0) {
        //     closeVideoCall();
        // }
    },

    handleICEConnectionStateChangeEvent(event) {
        console.log("handleICEConnectionStateChangeEvent",event)
        switch(this.newPeerConnection.iceConnectionState) {
            case "closed":
            case "failed":
            case "disconnected":
            // closeVideoCall();
            break;
        }
    },

    handleICEGatheringStateChangeEvent(event) {
        /**
         * icegatheringstatechange events are used 
         * to let you know when the ICE candidate gathering 
         * process state changes
         */
        // Our sample just logs information to console here,
        // but you can do whatever you need.
        console.log("****** handleICEGatheringStateChangeEvent",event)
    },

    handleSignalingStateChangeEvent(event) {
        console.log("***** handleSignalingStateChangeEvent",event)
        switch(this.newPeerConnection.signalingState) {
            case "closed":
            // closeVideoCall();
            break;
        }
    },

    closeCall() {

      console.log("Closing the call");

      // Close the RTCPeerConnection

      if (this.newPeerConnection) {

        // Disconnect all our event listeners; we don't want stray events
        // to interfere with the hangup while it's ongoing.

        this.newPeerConnection.ontrack = null;
        this.newPeerConnection.onnicecandidate = null;
        this.newPeerConnection.oniceconnectionstatechange = null;
        this.newPeerConnection.onsignalingstatechange = null;
        this.newPeerConnection.onicegatheringstatechange = null;
        this.newPeerConnection.onnotificationneeded = null;

        // Stop all transceivers on the connection

        // this.newPeerConnection.getTransceivers().forEach(transceiver => {
        //   transceiver.stop();
        // });

        // Stop the webcam preview as well by pausing the <video>
        // element, then stopping each of the getUserMedia() tracks
        // on it.

        // if (this.localStream.srcObject) {
            // this.localStream.getTracks().forEach(track => {
            //   track.stop();
            // });
        // }

        if(this.localStream){
          this.localStream.getTracks().forEach(track => {
              track.stop();
            });
        }

        // Close the peer connection

        this.newPeerConnection.close();
        this.newPeerConnection = null;
        this.localStream = null;
        this.updateLocalStream = ! this.updateLocalStream ;

        this.inCall = false ;
        
      }

    },

    async onClickMakeVideoCall (e) {
        e.preventDefault;

        if(this.localStream){
          this.localStream.getTracks().forEach(track => {
              track.stop();
            });
        }

        this.isVideoCall = true ;

        this.sock_conn.send(JSON.stringify(
            {
                type : "message",
                to   : { 
                      ip : this.otherUserIP,
                      name: this.otherUserName,
              },
              from : { 
                      ip : this.myIP,
                      name: this.myUserName,
              },
                data : {
                    "type" : "media_type" ,
                    "data" : "video" 
                }
            }
        ))

        if(this.localStream){
          this.localStream.getTracks().forEach(track => {
              track.stop();
            });
        }

        this.inCall = true ;

        this.createPeerConnection();

        // get local media 
        const mediaConstraints = {
                                'video': true,
                                'audio': true
                            };
        let localStream ;
        try {
            localStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
        } catch (e) {
            console.log(e)
            this.handleGetUserMediaError(e);
            return;
        }
        // attach stream to local html for display
        // this.$refs.localCamRef.srcObject = localStream ; 
        
        // localStream.getTracks().forEach(track => this.newPeerConnection.addTrack(track, localStream));
        for (const track of localStream.getTracks()){
                await this.newPeerConnection.addTrack(track,localStream);
        }

        this.localStream = localStream ;
        this.updateLocalStream = !this.updateLocalStream ;

    },

    async onClickMakeAudioCall (e) {
        e.preventDefault;

        if(this.localStream){
          this.localStream.getTracks().forEach(track => {
              track.stop();
            });
        }

        this.sock_conn.send(JSON.stringify(
            {
                type : "message",
                to   : { 
                      ip : this.otherUserIP,
                      name: this.otherUserName,
              },
              from : { 
                      ip : this.myIP,
                      name: this.myUserName,
              },
                data : {
                    "type" : "media_type" ,
                    "data" : "audio" 
                }
            }
        ))

        this.isVideoCall = false ;

        this.inCall = true ;

        this.createPeerConnection();

        // get local media 
        const mediaConstraints = {
                                'video': false,
                                'audio': true
                            };
        let localStream ;
        try {
            localStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
        } catch (e) {
            console.log(e)
            this.handleGetUserMediaError(e);
        }
        // attach stream to local html for display
        // this.$refs.localCamRef.srcObject = localStream ;
        // localStream.getTracks().forEach(track => this.newPeerConnection.addTrack(track, localStream));
        for (const track of localStream.getTracks()){
                await this.newPeerConnection.addTrack(track,localStream);
        }

        this.localStream = localStream ;
        this.updateLocalStream = !this.updateLocalStream ;

    },

    async onReceiveOffer (offer) {
        // as callee ,pretty much same as making a call, except changing 
        // createoffer to create answer

        // give alert,if user accept the call, then continue,otherwise refuse the call
        // const yesNo = await confirm('Please confirm to continue');
        // if (yesNo === false){
        //   console.log("rejected")
        //   return ;
        // } 

        this.inCall = true ;

        this.createPeerConnection();

        if(this.localStream){
          this.localStream.getTracks().forEach(track => {
              track.stop();
            });
        }

        // get local media 

        try {
            let remote_desc = await new RTCSessionDescription(offer);
            await this.newPeerConnection.setRemoteDescription(remote_desc)
        } catch (e) {
            console.log(e) ;
        }

        if(this.newPeerConnection.signalingState != "stable"){
            console.log(" ***** signaling is not stable")
        }

        let mediaConstraints ;

        if (this.isVideoCall === true){
            mediaConstraints = {
                                'video': true,
                                'audio': true,
                            };
        } else {
            mediaConstraints = {
                                'video': false,
                                'audio': true,
                            };
        }
        
        try {
            const localStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
            // attach stream to local html for display
            // this.$refs.local_video.srcObject = localStream  ;
        
            for (const track of localStream.getTracks()){
                await this.newPeerConnection.addTrack(track,localStream);
            }

            this.localStream = localStream;
            this.updateLocalStream = !this.updateLocalStream ;

            // this.$refs.video_1.srcObject = localStream  ;

            const answer = await this.newPeerConnection.createAnswer();
            await this.newPeerConnection.setLocalDescription(answer)
            // sent it over to peer via signaling channel
            this.sock_conn.send(JSON.stringify(
                {
                    type : "message",
                    to   : { 
                      ip : this.otherUserIP,
                      name: this.otherUserName,
                    },
                    from : { 
                            ip : this.myIP,
                            name: this.myUserName,
                    },
                    data : {
                        type : "answer" ,
                        data : answer
                    }
                }
            ));
        } catch (e) {
            console.log(e)
        }
    },

    async onReceiveAnswer (answer) {
        // create remote SDP based on answer, and add to peerconnection instance
        try {
            await this.newPeerConnection.setRemoteDescription(new RTCSessionDescription(answer));
        } catch (e) {
            console.error('error adding remote SDP ');
        }
    },

    onReceiveRemoteIceCandidate (candidate) {
        // add remote ice candidate to peerconnection instance 
        let remoteIceCandidate = new RTCIceCandidate(candidate);
        console.log("remote ice candidate: ",remoteIceCandidate)
        
        this.newPeerConnection.addIceCandidate(candidate);
    },

    onConnectionStateChange (event) {
        console.log(event);
        if (this.newPeerConnection.connectionState === 'connected'){
            console.log("peer udp connected")
        }
    },


    onClickAnswerCall (e){
        e.preventDefault;
    },

    onMessage(data) { 
        /**
         * inner data visauble to peers only
         * structure :  
         * data = {
         *   "type" : "offer/answer/candidate"/text,
         *   "data" :  databody of coresponding type above
         * }
         */
        console.log(data);
        switch (data.type) {
            case "offer" : // this peer as a callee 
                this.onReceiveOffer(data.data)
                break;
            case "answer" :
                this.onReceiveAnswer(data.data)
                break;

            case "candidate" : 
                this.onReceiveRemoteIceCandidate(data.data);
                break;

            case "text" : 
                this.onRecieveText(data.data);
                break;

            case "media_type": 
                if(data.data === "video"){
                  this.isVideoCall = true ;
                } else {
                  this.isVideoCall = false ;
                }
                break;

            default :
                console.log("type not found, should be 'offer' or 'answer'  ");
                break
        }
    },

    async onRecieveText(text) {
      /**
       * textMsgs structure : 
       * 
       *  username0: [
       *              {thisUserName: textdata},
       *              {otherUserName: textdata},
       *               .
       *               .
       *               .
       *             ],
       * 
       *  username1: [
       *              {thisUserName: textdata},
       *              {otherUserName: textdata},
       *               .
       *               .
       *               .
       *             ],
       */
      // get text arrray of the contact 
      // append the text message to the array
      let textArr = [];
      if (!this.textMsgs[this.incomingMsgUser.ip+'/'+this.incomingMsgUser.name]){
        textArr.push({
            id: 0,
            type: "reply",
            data : text 
          })
        this.textMsgs[this.incomingMsgUser.ip+'/'+this.incomingMsgUser.name] = textArr ;
      } else {
        textArr = this.textMsgs[this.incomingMsgUser.ip+'/'+this.incomingMsgUser.name];
        textArr.push({
          id: textArr.length,
          type : "reply",
          data : text 
        })
        this.textMsgs[this.incomingMsgUser.ip+'/'+this.incomingMsgUser.name] = textArr ;
      }

      this.msgList2Child =  this.textMsgs[this.incomingMsgUser.ip+'/'+this.incomingMsgUser.name];
      this.otherUserName =  this.incomingMsgUser.name ;
      this.otherUserIP =  this.incomingMsgUser.ip ;
      
    },

    async register() {
      // to do: need to input something before going forward...
      console.log("connecting... to server",this.inputName);
      if(this.isLogin) {
        alert(`you already registered, your username is ${this.username}`);
        return;
      }
      this.myIP = await this.vBindMyIP;
      this.myUserName = await this.inputName;
      this.username = await this.inputName;
      this.inputName = '';
      this.vBindMyIP = '';
      console.log(this.username, this.inputName);
      // establish websocket connection
      this.sock_conn.send(JSON.stringify({
                        type: "login",
                        from: {
                                  ip: this.myIP,
                                  name: this.myUserName
                                },
                        to : {
                                  ip: this.myIP,
                                  name : this.myUserName
                                }
                    }));
    },

    logout(username) {
      // to do: need to input something before going forward...
      console.log("logout... from server",username);
      // establish websocket connection
      this.sock_conn.send(JSON.stringify({
                        "type": "logout",
                        to   : { 
                      ip : this.otherUserIP,
                      name: this.otherUserName,
              },
              from : { 
                      ip : this.myIP,
                      name: this.myUserName,
              },
                    }));
    },

    initWebSocket() {
          // 是否要判斷conn是否存在？
          // const wsuri = "ws://localhost:6464";
          // if(this.sock_conn){
          //   console.log("sockect connection existed");
          //   return;
          // }
          this.sock_conn = new WebSocket(wsuri);
          this.sock_conn.onmessage = this.websocketOnMessage;
          this.sock_conn.onopen = this.websocketOnOpen;
          this.sock_conn.onerror = this.websocketOnError;
          this.sock_conn.onclose = this.websocketOnClose;
    },

    websocketOnMessage(e) {
          console.log(e);
          console.log(e.data)
          const message = JSON.parse(e.data);

          /**
           * the message structure we receive from server 
           * message {
           *      "type" :  "login"/"message" ,
           *      "from" :  "server" / "peer",
           *      "to"   :   '',
           *      "success"   : true/false
           *      "data" :  {
           *                   "type" : "offer"/"answer"/"candidate",
           *                   "data" :  databody of corresponding type above
           *                 }
           * }
           */

          switch (message.type) {
              case "login" :

                  if (message.success === false) {
                      this.isLogin = false;
                      alert("name taken, please try a different name")
                      return ;
                  } else {
                      this.isLogin = true;
                  }
        
                  this.contactList = message.data ;
                  console.log(this.contactList)

                  break;

              case "message" :
                  this.incomingMsgUser = message.from ;
                  this.msgList2Child = this.textMsgs[this.incomingMsgUser.ip+'/'+this.incomingMsgUser.name];
                  this.otherUserName =  this.incomingMsgUser.name ;
                  this.otherUserIP =  this.incomingMsgUser.ip ;
                  console.log("message: ", message);
                  this.onMessage(message.data);
                  break;

              default :
                  console.log("command type not found")
                  break;
          }

      },

    websocketOnOpen() {
        this.isConnected = true;
        console.log("on open, connection established")
    },

    websocketOnError() {
        // this.initWebSocket();
    },

    websocketOnClose(e) {
        console.log('disconnected from signaling server', e);
    },
  
  }

}
</script>


<style scoped>

:root {
  --chat-bg-color : rgba(230, 219, 219, 0.6);
  --chat-scroll-bar-color : rgba(131, 125, 125, 0.6);
  --contact-list-bg-color: rgba(39, 56, 117,0.6);
}


#grid-container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 20% 80%;
  background-color: rgb(207, 210, 212);
  overflow-y: hidden;
  overflow-x: hidden;
  position: absolute;
}

#grid-container #side-panel {
  width: 100%;
  height: 100% ;
  display: grid ;
  grid-template-rows: 5% 30% 65%;
  justify-items: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

#grid-container #side-panel #profile {
  width: 100%;
  height: 100%;
  display: grid ;
  grid-template-rows: 40% 30% 30% ;
  align-items: center;
  justify-items: center;
  background-color: var(--chat-bg-color);
}

#grid-container #side-panel #profile  > #profile_img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px solid #343534;
}

@media only screen and (max-width: 900px) {

  #grid-container #side-panel #profile  > #profile_img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 2px solid #b2b9b2;;
  }

}

#input_username {
  width: 100%;
  height: 100%;
  display:grid;
  grid-template-rows: 33.3% 33.3% 33.3%;
}

#input_username > .IP {
  width: 100%;
  height: 100%;
}

#input_username > .usrname {
  width: 100%;
  height: 100%;
}

#input_username > .btn {
  width: 50%;
  height: 100%;
  justify-self: center;
}

#add_friend {
  width: 100%;
  height: 100%;
  display:grid;
  grid-template-rows: 33.3% 33.3% 33.3%;
}

#add_friend > .IP {
  width: 100%;
  height: 100%;
}

#add_friend > .usrname {
  width: 100%;
  height: 100%;
}

#add_friend > .btn {
  width: 50%;
  height: 100%;
  justify-self: center;
}


#grid-container #side-panel  #search-bar {
  height: 100%;
  width: 100%;
  /* border: 1px solid rgba(0, 0, 0, 0.3) */
}

#grid-container #side-panel #search-bar {
  display: grid ;
  width: 100%;
  height: 100%;
  /* background-color:rgb(199, 207, 207); */
  grid-template-columns: 100%;
  align-items: center ;
  justify-items: center;
}

#grid-container #side-pane, #search-bar #searchIcon {
  display: flex;
}

/* @media only screen and (max-width: 900px) {

  #grid-container #side-panel #search-bar {
    display: grid ;
    width: 100%;
    height: 100%;
    background-color:rgb(199, 207, 207);
    grid-template-columns: auto;
    align-items: center ;
    justify-items: center;
  }

  #grid-container #side-pane, #search-bar #searchIcon {
    display: none;
  }
} */

#grid-container #side-pane, #search-bar #inputArea  {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  align-items: center;
  justify-items: center;
  background-color: #b2b9b2;
}

/* #grid-container #side-pane, #search-bar #inputArea > input  {
  display: flex;
  width: 100%;
  height: 100%;
} */

#grid-container #side-pane, #search-bar #inputArea > p  {
  display: flex;
  /* width: 100%;
  height: 100%; */
  margin: auto;
}

.IP {
  border: 1px solid grey;
}

.usrname {
  border: 1px solid grey;
}

.btn {
  border: 1px solid grey;
  background-color: grey;
}

#grid-container #side-panel #contact-list {
  display: flex;
  width: 100% ;
  height: 100%;
  /* grid-template-columns: repeat(1);
  grid-auto-rows: auto ; */
  flex-direction: column;
  background-color: var(--contact-list-bg-color);
  align-items: center;
  overflow-y: scroll;
}

#grid-container #side-panel #contact-list::-webkit-scrollbar {
  width: 0 ! important;
} 

#grid-container #side-panel #contact-list {
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
} 

#grid-container #side-panel #contact-list  .card   {
  width:100%;
  display: grid;
  grid-template-rows: 60% 20%  20%;
  align-items: center;
  justify-items: center;
}

#grid-container #side-panel #contact-list  .card > .cont_ip {
  max-width: 100%;
  width: max-content;
}

#grid-container #side-panel #contact-list  .card > img {
  /* max-width: 100%; */
  /* max-height: 100%; */
  width: 40px;
  height: 40px;
  border-radius: 50%;
  /* margin-right: 10px; */
}

#grid-container #side-panel #contact-list  .card > .name {
  max-width: 100%;
  width: max-content;
  word-wrap:break-word;
}


#grid-container .rightSide {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 80% 20%;
  overflow: hidden;
}

#grid-container .rightSide_emty {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color:  rgba(54, 52, 46,1);
  overflow-x: hidden;
  overflow-y: scroll;
}

#wakeup  {
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color:  rgba(54, 52, 46,1);
}

#SonicAttack {
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color:  rgba(54, 52, 46,1);
}

#SonicAttack .important {
  color: white;
  font-size: 1.2em;
  margin-left: 1em;
  margin-bottom: 0.5em;
}

#SonicAttack .linktoyoutube {
  color: white;
  font-size: 0.9em;
  margin-left: 1em;
  margin-bottom: 0.5em;
}

#wakeup .important {
  color: red;
  font-size: 1em;
  text-transform: uppercase;
  margin-left: 1em;
  margin-bottom: 0.5em;
}

#wakeup .important span {
  color: blue;
  font-size: 1em;
  text-transform: uppercase;
  margin-bottom: 0.5em;
}

#wakeup .txt {
  color: red;
  font-size: 1em;
  margin-left: 1em;
  margin-bottom: 0.2em;
}

#grid-container .rightSide_emty > .textCont {
  width: 100%;
  color: white;
  margin-top: 1vw;
  margin-left: 1vw;
  margin-right: 1vw;
}

#grid-container .rightSide_emty img {
  width: 100%;
}

#grid-container .rightSide_emty > .video_container {
    position: relative;
    overflow: hidden;
    width: 100%;
    padding-top: 56.25%;
}

#grid-container .rightSide_emty > .video_container > .tu_video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
}

#grid-container .rightSide > .messageComp {
  width: 100%;
  height: 100%;
  position: relative;
}


@media (min-width: 700px) {

  #grid-container .rightSide > .messageComp > #hangup {
    position: absolute;
    bottom: 5%;
    right: 35%;
    z-index: 1;
  }

  #grid-container .rightSide > .messageComp > #answer {
    position: absolute;
    bottom: 5%;
    left: 5%;
    z-index: 1;
  }
}

@media (max-width: 700px) {

  #hangup {
    position: absolute;
    bottom: 35%;
    right: 5%;
    z-index: 1;
  }

  #answer {
    position: absolute;
    bottom: 35%;
    left: 5%;
    z-index: 1;
  }  

}






#grid-container .rightSide #input-area {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns:  8%  84%  8% ;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.3);
}

#grid-container .rightSide #input-area  #chatMethods {
  width: 100%;
  height: 100%;
  display: grid;
  border: 1px solid rgba(0, 0, 0, 0.3);
  grid-template-rows: auto auto auto;
  align-items: center;
  justify-items: center;
}

#grid-container .rightSide #input-area  #chatMethods .audioCall {
  width: 100%;
  height: 100%;
  display: grid;;
}

#grid-container .rightSide #input-area  #chatMethods .videoCall {
  width: 100%;
  height: 100%;
  display: grid;
  /* border: 1px solid rgba(0, 0, 0, 0.3); */
}

#grid-container .rightSide #input-area  #chatMethods .sendFile {
  width: 100%;
  height: 100%;
  display: grid;
}

#grid-container .rightSide #input-area  #textArea {
  width: 100%;
  height: 100%;
  display: grid;
  /* border: 1px solid rgba(0, 0, 0, 0.3); */
}

#grid-container .rightSide #input-area #sentButton {
  display: grid;
  /* border: 1px solid rgba(0, 0, 0, 0.3); */
}

</style>
