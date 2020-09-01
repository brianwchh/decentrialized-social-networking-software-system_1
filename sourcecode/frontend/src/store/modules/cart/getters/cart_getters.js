'use strict' ;
import {state} from '../mutations/cart_mutations'

export const  cart_getters = {
    getCartItems :  () => {return state.cartItems},
    getCartItemNumber : () => {return state.cartItemCnt},
    getAddressArray : () => {return state.addressArray},
    getOrderId : () => {return state.order_id},
    getOrderArray : () => {return state.order_arry},
}

// export const cart_getters_strings = {
//     GET_LOGIN_STATUS : 'getLoginStatus' ,
//     GET_TOKEN : 'getToken' ,
//     GET_TOKEN_STATUS : 'getTokenStatus'
// }