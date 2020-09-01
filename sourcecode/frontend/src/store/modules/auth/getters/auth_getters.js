'use strict' ;
import {state} from '../mutations/auth_mutations'

export const  auth_getters = {
    getLoginStatus :  () => {return state.login_status},
    getToken : () => {return state.token},
    getTokenStatus : () => {return state.isTokenValid},
}

export const auth_getters_strings = {
    GET_LOGIN_STATUS : 'getLoginStatus' ,
    GET_TOKEN : 'getToken' ,
    GET_TOKEN_STATUS : 'getTokenStatus'
}