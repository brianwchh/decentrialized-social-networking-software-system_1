'use strict'

import {state,auth_mutations} from './mutations/auth_mutations' ;
import {auth_actions} from './actions/auth_actions';
import {auth_getters} from './getters/auth_getters' ;

const module_auth = {
    state: () => { return state} ,
    mutations : auth_mutations ,
    actions : auth_actions ,
    getters:  auth_getters
}


export { module_auth } ;