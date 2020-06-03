// import axios from 'axios'
import * as actionTypes from './actionTypes'
import updateObject from './utility'

let state =  {
    loging : false,
    isLogin : false
};

const getters = {
    getIsLogin: () => {
        return state.isLogin ;
    },
    getLoging: () => {
        return state.loging
    }
};

// action gets or post data to backend
const actions = {
    async register ({commit},payload) {
        console.log("I am in aciton register")
        console.log(payload);
        // console.log(commit)
        await commit(actionTypes.AUTH_START);

        // const res 
        // try {
        //     res = await axios.get('http:127.0.0.1:8000/user')
        // } catch (err) {
        //     console.log(err)
        // }
        // // use commit to set the state accordingly, same as dispatch an action in redux
        // commit(actionTypes.AUTH_LOGIN_SUCCESS,state,{isLogin:true}) // same as dispatch(action(){this action returns {actiontype,action_data}})
    } ,
    
    async login ({commit},username, password) {
        console.log(username,password);
        console.log(commit)
    }
};

// commit the result according to the result from action
// mutate takes action.type and action.data and the current state 
// to update the state accordingly
// reducers ---> update the state based on current state and action type and data
const mutations = {
    [actionTypes.AUTH_START] () {
        console.log("in mutations auth start")
        state = updateObject(state,{
            loging: true
        })
        console.log("state updated")
    },
    [actionTypes.AUTH_LOGIN_SUCCESS] ( data) {
        // updateObject(state,data)
        console.log(data)
    },
};

export default {
    state,
    getters,
    actions,
    mutations
}