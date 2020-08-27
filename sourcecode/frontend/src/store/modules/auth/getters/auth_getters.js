'use strict' ;
import {state} from '../mutations/auth_mutations'

const  auth_getters = {
    getLoginStatus :  () => {return state.isLogin},
}

export {auth_getters};