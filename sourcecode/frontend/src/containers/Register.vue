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
            v-model="name"
            :counter="30"
            :rules="nameRules"
            label="Username"
            required
            placeholder="please input your username here"
          ></v-text-field>

          <v-text-field
            prepend-icon="mdi-email"
            v-model="email1"
            :rules="emailRules"
            label="E-mail"
            required
            placeholder="please input your email here"
          ></v-text-field>

          <v-text-field
            prepend-icon="mdi-email"
            v-model="email2"
            :rules="emailRules"
            label="E-mail"
            placeholder="please retype your email here"
            required
          ></v-text-field>

          <v-text-field
            :append-icon="showpassword1 ? 'mdi-eye' : 'mdi-eye-off'"
            prepend-icon="mdi-lock"
            :type="showpassword1 ? 'text' : 'password'"
            v-model="password1"
            :rules="emailRules"
            label="password"
            @click:append="showpassword1 = !showpassword1"
            placeholder="please input your password here"
            required
          ></v-text-field>

          <v-text-field
            prepend-icon="mdi-lock"
            :append-icon="showpassword2 ? 'mdi-eye' : 'mdi-eye-off'"
            v-model="password2"
            :rules="emailRules"
            :type="showpassword2 ? 'text' : 'password'"
            label="password"
            placeholder="retype your password here"
            @click:append="showpassword2 = !showpassword2"
            required
          ></v-text-field>

          <v-select
            prepend-icon="mdi-face"
            v-model="select"
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
  name: 'Register',
  components: {
    
  },

   data: () => ({
      showpassword1: '',
      showpassword2: '',
      password1: '',
      password2: '',
      email1: '',
      email2: '',
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

    computed : mapGetters(['getIsLogin']),

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
