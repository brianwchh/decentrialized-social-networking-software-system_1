<template>
<div>
    <v-app-bar
      app
      dense
      dark
      color="black"
    >

        <v-app-bar-nav-icon class="white--text" @click=" drawer = !drawer " ></v-app-bar-nav-icon>
        <!-- <v-app-bar-nav-icon class="white--text" @click="drawer=!drawer" ></v-app-bar-nav-icon> -->

        <v-toolbar-title class="text-uppercase white--text">
            <span style="font-size:1.5vw;color:blue;">p2p</span>
            <span style="font-size:1.5vw;color:white;">Chat</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <span style="font-size:1.5vw;" class="text-uppercase white--text">A social network <span class="text-uppercase font-weight-dark blue--text"> revolution</span></span> 
        <v-spacer></v-spacer>
        <div style="height:100%;display:flex; flex-direction: column;">
          <p style="margin:0;font-size:1vw;">{{signal_server_ip}}</p>
          <p style="margin:0;font-size:1vw;">helping us helps yourselves</p>
        </div>
        <!-- <v-btn text color="blue accent-1">
          <v-icon>mdi-account-plus</v-icon>
        </v-btn> -->
      
    </v-app-bar>

    <v-navigation-drawer 
      color="indigo " 
      v-model="drawer" 
      app
      expand-on-hover
      mini-variant
    >
      <v-list>
        <v-list-item 
          v-for="link in link_array"
          :key="link.text"
          router :to="link.route"
        >
          <v-list-item-action>
            <v-list-item-icon>
              <v-icon class="white--text" v-text="link.icon"></v-icon>
            </v-list-item-icon>
          </v-list-item-action>
          <v-list-item-title class="white--text" v-text="link.text"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    

  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
import {wsuri} from '../ipconfig'

export default {
    name : 'Navbar',
    componnets : {
    },
    computed: {
      ...mapGetters({
      isLogin :'getIsLogin',
      loging:'getLoging'
      }),

    },
    data : () => {
            return {
                drawer : true,
                loginStatus: false ,
                link_array : [],
                signal_server_ip : '',
                
                links : [

                  {id: 0, showtime: "always", icon: 'mdi-home', text: 'Home', route:'/'},
                  {id: 1, showtime: "always", icon: 'mdi-chat', text: 'Chat', route:'/chat'},
                  {id: 2, showtime: "not_login", icon: 'mdi-account-plus', text: 'Register', route:'/register'},
                  {id: 3, showtime: "not_login", icon: 'mdi-login-variant', text: 'Login', route:'/login'},
                  {id: 4, showtime: "login", icon: 'mdi-logout-variant', text: 'Logout', route:'/logout'},
                  {id: 5, showtime: "login", icon: 'mdi-card-account-details', text: 'Profile', route:'/profile'},
                  {id: 6, showtime: "always", icon: 'mdi-post', text: 'Blog', route:'/blog'},
                  {id: 7, showtime: "always", icon: 'mdi-shopping', text: 'Your Shop', route:'/shop'},
                  {id: 8, showtime: "always", icon: 'mdi-image-album', text: 'Photo album', route:'/photoalbum'},
                  {id: 9, showtime: "always", icon: 'mdi-account-group', text: 'Following', route:'/following'},
                  {id: 10, showtime: "always", icon: 'mdi-github', text: 'project github', route:'/github'},
                ],
            }
    },


    created(){
      // this.link_array = this.links_unlogin;
      this.signal_server_ip = wsuri ;

      let i=0;
      for(i=0; i < this.links.length; i++ ){
        const l = this.links[i] ;
        if (l.showtime === "always" || l.showtime === "not_login"){
          this.link_array.push(l)
        }
      }

      console.log(this.isLogin);
      this.register({
        username:'brian',
        password1: "123"
      });
      console.log(this.loging)
    },
    methods: {
      ...mapActions({register : 'register'}),

      onClickEvent(){
        // console.log("on click event")
        this.loginStatus = !this.loginStatus ;
        console.log(this.loginStatus);
      },

    },

    watch: {
      loginStatus : function() {
        // console.log("**************** loginStatus changed");
        // console.log(this.loginStatus)

        if (this.loginStatus === true) {
          this.link_array = this.links.filter(l => {
            if(l.showtime === "login" || l.showtime === "always"){
              return l ;
            }
          })
        } else {
          this.link_array = this.links.filter(l => {
            if(l.showtime === "not_login" || l.showtime === "always"){
              return l ;
            }
          })
        }
      },

    }

}
</script>

