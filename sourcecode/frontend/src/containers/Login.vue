<template>
<v-container 
  class="fill-height "
  fluid
  >
    <v-row 
      align="center"
      justify="center"
    >
    <v-col
      cols="10"
      sm="10"
      md="6"
    >
      <v-card class="elevation-12 grey lighten-4" >
        <v-toolbar
          color="grey lighten-2"
          dark
          flat
        >
          <v-toolbar-title class="indigo--text">Login form</v-toolbar-title>
        </v-toolbar>
      <v-card-text>
      <v-form
        class="grey lighten-4"
      >
        <v-text-field
          prepend-icon="mdi-account-circle"
          v-model="username"
          :counter="30"
          :rules="nameRules"
          label="Username"
          required
          placeholder="please input your username here"
        ></v-text-field>

        <v-text-field
          :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
          prepend-icon="mdi-lock"
          :type="showpassword ? 'text' : 'password'"
          v-model="password"
          :rules="passwordRules"
          label="password"
          @click:append="showpassword = !showpassword"
          placeholder="please input your password here"
          required
        ></v-text-field>
      </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" v-on:click="handle_onClick">Login</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>

      </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapGetters, mapActions} from 'vuex' ;
import {login_status_values} from '../store/modules/auth/mutations/auth_mutations'
import {debug_} from '../global_config'

export default {
  name: 'Login',
  components: {
    
  },

   data: () => ({
      showpassword: '',
      password: '',
      valid: true,
      username: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 30) || 'Name must be less than 30 characters',
      ],
      passwordRules: [
        v => !!v || 'password is required',
        // v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      select: null,
      items: [
        'admin',
        'pet adopter',
        'pet foster',
        'pet shelter',
      ],
      checkbox: false,
    }),

    created () {
    },

    computed : {
      // ...mapGetters(['getLoginStatus']),
      ...mapGetters({getLoginStatus: 'getLoginStatus'}),
    },

    methods: {
                       
      ...mapActions({
        login: 'login'
      }),

      async handle_onClick ( ) {
        const payload = {
          username: this.username,
          password: this.password
        };

        await this.login(payload);

        if(debug_) {
          console.log('this.getLoginStatus: ', this.getLoginStatus);
        }
        
        if(this.getLoginStatus === login_status_values.SUCCEED){
          this.reset_form();
          // alert('login succeed')
          this.$router.push({name: 'Home'})
        } else {
          alert('check the username and password');
        }
      },

      reset_form() {
        this.password = '';
        this.username = '';
      }

      // validate () {
      //   this.$refs.form.validate()
      // },
      // reset () {
      //   if(debug_) {
      //     console.log('reseting the form in login');
      //   }
      //   this.$refs.form.reset()
      // },
      // resetValidation () {
      //   this.$refs.form.resetValidation()
      // },

    },

}
</script>
