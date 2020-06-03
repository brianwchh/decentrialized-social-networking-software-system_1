<template>
<v-app>

  <Navbar/>

  <v-content > 
      <router-view ></router-view>
  </v-content>

  <Footer/>

</v-app>

</template>

<script>
import Footer from './components/Footer'
import Navbar from './components/Navbar'

export default {
  name: 'App',

  components: {
    Navbar,
    Footer,
  },

  data : () => {
            return {

            }
  }

};
</script>
