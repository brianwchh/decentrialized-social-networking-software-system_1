<template>
  <div id="message-container">
    <div id="contact-profile">
      <div id="profile">
        <img src="https://5b0988e595225.cdn.sohucs.com/images/20180108/0ae5a618ed8741ab94dc109cf61ae284.jpeg" alt="" />
        <p>{{contact_name}}</p>
      </div>
      <div id="opinions">
        <form>
          <!-- <input 
            type="text"
            placeholder="say you say me ... "
          > -->
          <textarea rows="1" placeholder="say you say me "> 

          </textarea>
        </form>
      </div>
    </div>

    <div v-if="inCall" id="extended" 
      >
        <div id="cameraArea" >
          <video id="video_0" ref="video_0" autoplay></video>
          <video id="video_1" ref="video_1" autoplay muted></video>
        </div>

        <div id="content">
            <div class="message-wrapper" v-for="msg in msgArr" :key="msg.id">
              <div v-if="msg.type==='reply'" v-bind:class="msg.type">
                <div class="img-div">
                  <img src="https://5b0988e595225.cdn.sohucs.com/images/20180108/0ae5a618ed8741ab94dc109cf61ae284.jpeg" alt="" />
                </div>
                <div class="msgData">
                  <p>
                    {{msg.data}}
                  </p> 
                </div>
              </div>

              <div v-else v-bind:class="msg.type">
                <div class="blank"></div>
                <div class="msgData">
                  <p>
                    {{msg.data}}
                  </p> 
                </div>
                <div class="img-div">
                  <img src="https://5b0988e595225.cdn.sohucs.com/images/20191103/0f67a5b5b70f4416852885e48c14ae6a.jpeg" alt="" />
                </div>
              </div>
          </div> 
        </div>
    </div>  

    <div v-else id="content" >
      <div class="message-wrapper" v-for="msg in msgArr" :key="msg.id">
        <div v-if="msg.type==='reply'" v-bind:class="msg.type">
          <div class="img-div">
            <img src="https://5b0988e595225.cdn.sohucs.com/images/20180108/0ae5a618ed8741ab94dc109cf61ae284.jpeg" alt="" />
          </div>
          <div class="msgData">
            <p>
              {{msg.data}}
            </p> 
          </div>
        </div>
        <div v-else v-bind:class="msg.type">
          <div class="blank"></div>
          <div class="msgData">
            <p>
              {{msg.data}}
            </p> 
          </div>
          <div class="img-div">
            <img src="https://5b0988e595225.cdn.sohucs.com/images/20191103/0f67a5b5b70f4416852885e48c14ae6a.jpeg" alt="" />
          </div>
        </div>
      </div>
    </div>  
  </div> 
  
</template>

<script>

export default {

  name: 'MessageComp',

  props: [
    'contact_name' ,
    'msgArr',
    'inCall',
    'local_stream',
    'remote_stream',
    'updateLocalStream',
    'updateRemoteStream',
  ],

  data () {
    return {

    }
  },

  watch : {
    updateLocalStream : function() {
      
        this.$refs.video_1.srcObject = this.local_stream ;
        console.log("attach local stream ...............")
    },

    updateRemoteStream : function() {
      
        this.$refs.video_0.srcObject = this.remote_stream ;
        console.log("attach remote stream ...............")
    }

  }

}
</script>

<style scoped>
:root {
  --chat-bg-color : rgba(230, 219, 219, 0.6);
  --chat-scroll-bar-color : rgba(131, 125, 125, 0.6);
  --contact-list-bg-color: rgba(39, 56, 117,0.6);
}

#message-container {
  width: 100%;
  height: 100%;
  display: grid ;
  grid-template-rows: 12.5% 87.5%;
  overflow-y: hidden;
  overflow-x: hidden;
}

#message-container  #contact-profile {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 20% 80%;
  background-color: rgba(213, 221, 216, 0.4);
  border: 1px solid rgba(0, 0, 0, 0.3) ;
  justify-items: center;
  /* align-items: center; */
  overflow: hidden;
}

#message-container  #contact-profile #profile {
  width: 100%;
  height: 100%;
  display: grid ;
  grid-template-rows: 80% 20%;
  justify-items: center;
  align-items: center;
  overflow: hidden;
}

#message-container  #contact-profile #profile img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}



@media only screen and (max-width: 900px) {

#message-container  #contact-profile #profile img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

#message-container  #contact-profile #profile  p {
    font-size: 0.8rem;
  }

}

@media only screen and (max-width: 600px) {

  #message-container  #contact-profile #profile img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }

  #message-container  #contact-profile #profile  > p {
    font-size: 0.7rem;
  }

}

#message-container  #contact-profile #opinions {
  width: 100%;
  height: 100%;
  display: grid;
  justify-items: center;
  align-items: center;
}

#message-container  #contact-profile #opinions form  {
  width: 100%;
  height: 100%;
  display: flex;
}

#message-container  #contact-profile #opinions form > textarea  {
  width: 100%;
  height: 100%;
}


@media (min-width: 700px) {

  #extended {
      display: grid; 
      grid-template-columns: 70% 30%; 
      width:100%;
      height:100%;
  }

}

@media (max-width: 700px) {

  #extended {
    display: grid; 
    grid-template-rows: 70% 30%; 
    width:100%;
    height:100%;
  }

}

#cameraArea {
  height:100%;
  width: 100%;
  position: relative;
}

#video_0 {
  height:100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  /* background-color:green; */
}

#video_1 {
  height:35%;
  width: 35%;
  top:0;
  left:0;
  position: absolute;
  z-index: 1;
  /* background-color: rgb(204, 204, 195); */
}


#message-container  #content {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  /* grid-template-columns: 100%; */
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.3) ;
  overflow-y: scroll ;
  overflow-x: hidden;
}

/* #message-container  #content::-webkit-scrollbar {
  width: 0 ! important;
}  */

/* #message-container  #content {
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
}  */

#message-container  #content .message-wrapper {
  width: 100%;
  display: grid;
  grid-template-columns: 100%;
} 

#message-container  #content .message-wrapper .reply {
  width: 100%;
  display: grid;
  grid-template-columns: 10% 50% 40%;
  justify-items: start;
} 

#message-container  #content .message-wrapper .reply > .img-div {
  width: 100%;
  display: grid;
  grid-template-columns: 100%;
  justify-items: center;

} 

#message-container  #content .message-wrapper .reply img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
} 

#message-container  #content .message-wrapper .reply .msgData {
  width: 100%;
  display: grid;
  grid-template-columns: 100%;
} 

#message-container  #content .message-wrapper .reply .msgData > p {
  max-width: 100%;
  width: max-content;
  border-radius: 20px;
  padding: 10px 15px;
  background: #435f7a;
  color: #f5f5f5;
  word-wrap:break-word;
} 

/* send */

#message-container  #content .message-wrapper .send {
  width: 100%;
  display: grid;
  grid-template-columns:  40% 50% 10% ;
} 

#message-container  #content .message-wrapper .send > .img-div {
  width: 100%;
  display: grid;
  grid-template-columns: 100%;
  justify-items: center;

} 

#message-container  #content .message-wrapper .send img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
} 

#message-container  #content .message-wrapper .send .msgData {
  width: 100%;
  display: grid;
  grid-template-columns: 100%;
  justify-items: end;
} 

#message-container  #content .message-wrapper .send .msgData > p {
  max-width: 100%;
  width: max-content;
  background: rgb(58, 138, 79);
  color: #f5f5f5;
  border-radius: 20px;
  padding: 10px 15px;
  word-wrap:break-word;
} 


</style>