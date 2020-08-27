'use strict'

import {debug_} from '../../../../global_config'
import {user_login_url} from '../../../../ipconfig'
import axios from 'axios'

const auth_actions = {
    async login (context, payload) {

        console.log('auth login action');

        const {username,password} = payload ;

        context.commit('SET_LOGGING_STATUS', 'loggining')
        
        const config = {
            headers: { 
              'Content-Type': 'application/json', 
            },
          } 
  
        if (debug_ === true) {
        console.log(formDataJson);
        }

        const formDataObj = {
            username : username ,
            password : password
        }

        try {

        const res = await axios.post(user_login_url,
                                    JSON.stringify(formDataObj),
                                    config  
                                    );

        if(debug_ === true){
            console.log('res.data,res : ', res.data.res);
        }

        context.commit('SET_LOGGING_STATUS', 'sucess')
        // get token from server and save it locally
        const token = res.data.res.token;
        localStorage.setItem('token', token);
        
        } catch (err) {
            console.log(err);
            context.commit('SET_LOGGING_STATUS', 'failed')
        }

    },

}

export { auth_actions };