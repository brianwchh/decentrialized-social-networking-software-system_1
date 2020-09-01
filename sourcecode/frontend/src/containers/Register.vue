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
        <v-card class="elevation-12 grey lighten-4">
          <v-toolbar
          color="grey lighten-2"
          dark
          flat
          >
            <v-toolbar-title class="indigo--text">Registeer form</v-toolbar-title>
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
            prepend-icon="mdi-email"
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
            placeholder="please input your email here"
          ></v-text-field>

          <v-text-field
            prepend-icon="mdi-email"
            v-model="repeat_email"
            :rules="emailRules"
            label="E-mail"
            placeholder="please retype your email here"
            required
          ></v-text-field>

          <v-text-field
            :append-icon="showpassword1 ? 'mdi-eye' : 'mdi-eye-off'"
            prepend-icon="mdi-lock"
            :type="showpassword1 ? 'text' : 'password'"
            v-model="password"
            :rules="passwordRules"
            label="password"
            @click:append="showpassword1 = !showpassword1"
            placeholder="please input your password here"
            required
          ></v-text-field>

          <v-text-field
            prepend-icon="mdi-lock"
            :append-icon="showpassword2 ? 'mdi-eye' : 'mdi-eye-off'"
            v-model="repeat_password"
            :rules="passwordRules"
            :type="showpassword2 ? 'text' : 'password'"
            label="password"
            placeholder="retype your password here"
            @click:append="showpassword2 = !showpassword2"
            required
          ></v-text-field>

          <v-select
            prepend-icon="mdi-face"
            v-model="user_type"
            :items="items"
            :rules="[v => !!v || 'Item is required']"
            label="Type"
            placeholder="please select your user type"
            required
          ></v-select>
        </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" v-on:click = "onSubmitEvent">Submit</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import {mapGetters,mapActions} from 'vuex' ;
import {user_register_url} from '../ipconfig';
import {debug_} from '../global_config' ;
import axios from 'axios'

export default {
  name: 'Register',
  components: {
    
  },

   data: () => ({
      showpassword1: '',
      showpassword2: '',
      password: '',
      repeat_password: '',
      email: '',
      repeat_email: '',
      valid: true,
      username: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 30) || 'Name must be less than 30 characters',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        v => !!v || 'password is required',
      ],
      user_type: '',
      items: [
        'admin',
        'customer',
        // 'pet adopter',
        // 'pet foster',
        // 'pet shelter',
      ],
      checkbox: false,
    }),

    created() {

    },

    computed : {
      // ...mapGetters(['getLoginStatus']),
      // ...mapGetters({isLogin: 'getLoginStatus'}),
    },

    methods: {

      // validate () {
      //   this.$refs.form.validate()
      // },
      // reset () {
      //   this.$refs.form.reset()
      // },
      // resetValidation () {
      //   this.$refs.form.resetValidation()
      // },

      async onSubmitEvent () {
        // create form data 
        let formData = new FormData();
        formData.append('username',this.username);
        formData.append('password',this.password);
        formData.append('repeat_password',this.repeat_password);
        formData.append('email',this.email);
        formData.append('repeat_email',this.repeat_email);
        if (this.user_type === 'admin'){
          formData.append('isSuper', true);
        } else {
          formData.append('isSuper',false);
        }
        // convert formData to Json format
        let formDataObj = {};
        formData.forEach((value,key) => {
          formDataObj[key] = value ;
        });
        const formDataJson = JSON.stringify(formDataObj);

        const config = {
          headers: { 
            'Content-Type': 'application/json', 
          },
        } 

        if (debug_ === true) {
          console.log(formDataJson);
        }

        try {

          const res = await axios.post(user_register_url,
                                      formDataJson,
                                      config  
                                    );

          if(debug_ === true){
            console.log('res.data,res : ', res.data.res);
          }
          
          const resp = res.data.res ;

          if(resp && resp.insertId){
            // alert('registration successful ! ');
            this.$router.push({name:'Login'});
          } else {
            const err = res.data.err[0];
            console.log(err)
            alert(err.message);
          }

        } catch (err) {
            console.log(err);
            alert('register failed');
        }
        
        
      }

    },

}
</script>
