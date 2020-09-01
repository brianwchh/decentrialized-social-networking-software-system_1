'use strict'

import {debug_} from '../../../../global_config'

export let state = {
    login_status : '' ,
    token : '',
    isTokenValid: false
}

// redux's reducer is better, into different branches depending on different action type
export const auth_mutations = {
    
    SET_LOGGING_STATUS(state,status) {
        state.login_status = status ;
        if(debug_) {
            console.log("auth_mutations.js : state.login_status : ", state.login_status);
        }
    },

    UPDATE_TOKEN(state,token){
        state.token = token ;
    }, 

    UPDATE_TOKEN_VALIDILITY(state,status){
        state.isTokenValid = status ;
    }

}

export const auth_mutation_strings = {
    SET_LOGGING_STATUS : 'SET_LOGGING_STATUS',
    UPDATE_TOKEN : 'UPDATE_TOKEN',
    UPDATE_TOKEN_VALIDILITY : 'UPDATE_TOKEN_VALIDILITY'
}

export const login_status_values = {
    LOGGING : 'logging',
    SUCCEED : 'succeed',
    FAILED :  'failed' ,
    LOGOUT : 'logout' ,
}