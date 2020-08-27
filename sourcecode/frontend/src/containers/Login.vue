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
          v-model="name"
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
          :rules="emailRules"
          label="password"
          @click:append="showpassword = !showpassword"
          placeholder="please input your password here"
          required
        ></v-text-field>
      </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary">Login</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>

      </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex' ;

export default {
  name: 'Login',
  components: {
    
  },

   data: () => ({
      showpassword: '',
      password: '',
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 30) || 'Name must be less than 30 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
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

    computed : {
      // ...mapGetters(['getLoginStatus']),
      ...mapGetters({isLogin: 'getLoginStatus'}),
    },

    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },

}
</script>
