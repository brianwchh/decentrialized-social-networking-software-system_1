'use strict'

let state = {
    logging : false ,
    isLogin : false ,
}

// redux's reducer is better, into different branches depending on different action type
const auth_mutations = {
    SET_LOGGING_STATUS(state,status) {
        state.logging = status ;
    },
    SET_ISLOGIN_STATUS(state,status) {
        state.isLogin = status ;
    }
}

export  { auth_mutations, state } ;