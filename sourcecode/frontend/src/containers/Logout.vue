<template>
  <div> 
      <h1> you have logged out successfully </h1>
  </div>
</template>

<script>

import {mapActions} from 'vuex' ;

export default {
  name: 'Logout',
  components: {
    
  },

  data: () => ({
      showpassword1: '',
      showpassword2: ''
  }),

  created () {
    console.log("loging out ...")
    this.logout();
    this.$router.push({name:'Login'})
  },

  methods: {
    ...mapActions({
        logout: 'logout'
      }),

  }

}
</script>
