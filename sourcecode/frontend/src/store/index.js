import Vue from 'vue'
import Vuex from 'vuex'
import {module_auth} from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth: module_auth,
  }
})
