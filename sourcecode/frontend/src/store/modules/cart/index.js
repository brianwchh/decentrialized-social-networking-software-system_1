'use strict'

import {state,cart_mutations} from './mutations/cart_mutations' ;
import {cart_actions} from './actions/cart_actions';
import {cart_getters} from './getters/cart_getters' ;

const module_cart = {
    state: () => { return state} ,
    mutations : cart_mutations ,
    actions : cart_actions ,
    getters:  cart_getters
}


export { module_cart } ;