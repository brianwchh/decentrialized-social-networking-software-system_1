import Vue from 'vue'
import Vuex from 'vuex'
import {module_auth} from './modules/auth'
import {module_cart} from './modules/cart'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth: module_auth,
    cart: module_cart
  }
})
