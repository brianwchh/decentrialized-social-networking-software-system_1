import * as actionTypes from './actionTypes'
import { updateObject } from "../utility";
import { authResetStateAction } from './actions';

const initialState = {
    status : actionTypes.LOGIN_STATUS_LOGOUT ,
    myUserName: null,
    userID    : null,
    userImage : null
}

const sharedReducer = (state,data) => {
    return state
}

const auth_set_login_status = (state,data) => {
    return updateObject(state,data)
}

const auth_set_token_status = (state,data) => {
    return updateObject(state,data)
}

const authSaveMyUserName = (state,data) => {
    return updateObject(state,data)
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_SET_LOGIN_STATUS : 
            console.log(`action.type = ${action.type}`)
            console.log(action.data)
            return auth_set_login_status(state,action.data);

        case actionTypes.AUTH_SET_TOKEN_STATUS : 
            console.log(`action.type = ${action.type}`)
            console.log(action.data)
            return auth_set_token_status(state,action.data);
        case actionTypes.AUTH_SAVE_MY_USERNAME : 
            return authSaveMyUserName(state, action.data);
        // case actionTypes.AUTH_CLEAR_STATE: 
        //     return sharedReducer(state,action.data);
        // case actionTypes.AUTH_LOGIN : 
        //     return sharedReducer(state,action.data)

        default : 
            return sharedReducer(state,action.data);
    }
}

export default reducer ;