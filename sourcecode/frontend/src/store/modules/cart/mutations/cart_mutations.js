'use strict'

import {debug_} from '../../../../global_config'

export let state = {
    cartItems : [] ,
    cartItemCnt : 0 ,
    addressArray: [],
    order_id  : '',
    order_arry: [],
}

// redux's reducer is better, into different branches depending on different action type
export const cart_mutations = {
    
    UPDATE_CART_ITEMS(state,cartItems) {
        state.cartItems = cartItems ;
        const arrLen = cartItems.length;
        let i=0;
        let cartItemsCnt = 0;
        for(i=0; i< arrLen; ++i){
            cartItemsCnt += cartItems[i].item_cnt ;
        }
        state.cartItemCnt = cartItemsCnt ;
        if(debug_) {
            console.log("cart_mutations.js : state.cartItems : ", state.cartItems);
        }
    },

    UPDATE_ADDRESS(state,addressArray) {
        state.addressArray = addressArray ;
        
        if(debug_) {
            console.log("cart_mutations.js : state.addressArray : ", state.addressArray);
        }
    },

    SET_ORDER_ID(state,order_id) {
        state.order_id = order_id ;
        
        if(debug_) {
            console.log("cart_mutations.js : state.order_id : ", state.order_id);
        }
    },

    UPDATE_ORDER_ARRAY(state,order_arry){
        state.order_arry = order_arry ;
    }

}

// export const cart_mutation_strings = {
//     SET_LOGGING_STATUS : 'SET_LOGGING_STATUS',
//     UPDATE_TOKEN : 'UPDATE_TOKEN',
//     UPDATE_TOKEN_VALIDILITY : 'UPDATE_TOKEN_VALIDILITY'
// }

// export const login_status_values = {
//     LOGGING : 'logging',
//     SUCCEED : 'succeed',
//     FAILED :  'failed' ,
//     LOGOUT : 'logout' ,
// }