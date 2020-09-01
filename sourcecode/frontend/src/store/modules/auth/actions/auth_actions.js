'use strict'

import {debug_, config_json} from '../../../../global_config'
import {user_login_url,
    user_validate_token_url,
    user_logout_url} from '../../../../ipconfig'
import axios from 'axios'
import {auth_mutation_strings,login_status_values} from '../mutations/auth_mutations'

const auth_actions = {
    async login (context, payload) {

        console.log('auth login action');
        console.log('login action, payload: ', payload);

        const {username,password} = payload ;

        context.commit(auth_mutation_strings.SET_LOGGING_STATUS, login_status_values.LOGGING) 

        const formDataObj = {
            username : username ,
            password : password
        }

        try {

            const res = await axios.post(user_login_url,
                                        JSON.stringify(formDataObj),
                                        config_json  
                                        );

            if(debug_ === true){
                console.log('res : ', res);
            }

            context.commit(auth_mutation_strings.SET_LOGGING_STATUS, login_status_values.SUCCEED);
            // get token from server and save it locally
            const token = res.data.token;
            localStorage.setItem('token', token);

            // update the token in state 
            context.commit(auth_mutation_strings.UPDATE_TOKEN,token);
        
        } catch (err) {
            console.log(err);
            context.commit(auth_mutation_strings.SET_LOGGING_STATUS, login_status_values.FAILED);
        }

    },

    async logout (context) {

        if (debug_){
            console.log('auth logout action');
        }
        
        const token = localStorage.getItem('token');

        const formDataObj = {
            token : token
        }

        try {

            const res = await axios.post(user_logout_url,
                                        JSON.stringify(formDataObj),
                                        config_json  
                                        );

            if(debug_ === true){
                console.log('res : ', res);
            }

            context.commit(auth_mutation_strings.SET_LOGGING_STATUS, login_status_values.LOGOUT);
            context.commit(auth_mutation_strings.UPDATE_TOKEN,'');
            // get token from server and save it locally

            localStorage.removeItem('token');
        
        } catch (err) {
            console.log('auth_actions.js :', err);
            alert('something wrong while logout');
        }

    },

    async validateToken (context) {

        const token = localStorage.getItem('token');
        const data = {};

        try {

            const res = await axios.post(user_validate_token_url(token),
                                        JSON.stringify(data),
                                        config_json  
                                        );

            if(debug_ === true){
                console.log('validate token res : ', res);
            }

            if(res.data.isLogin === true) {
                context.commit(auth_mutation_strings.UPDATE_TOKEN_VALIDILITY, true) ;
            } else {
                context.commit(auth_mutation_strings.UPDATE_TOKEN_VALIDILITY, false) ;
            }
        
        } catch (err) {
            console.log(err);
            context.commit(auth_mutation_strings.UPDATE_TOKEN_VALIDILITY, false) // logout the user
        }

    }

}

export { auth_actions };