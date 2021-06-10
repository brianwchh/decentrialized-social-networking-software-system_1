import * as actionTypes from './actionTypes'
import { updateObject } from "../utility";
import * as webSocketState from './webSocketState'

const fileName = "websocket/reducer.js"

const initialState = {
    websocketConn     : null  ,
    toggleSignal      : false ,   // indicating signal for re-render
    selectedContact   : '',
    selectedGroup     : '',
    selectedChatRoom  : '',
    isGroupChat       : false , // true : render contact chat. false : render group chat
    isMyChatRoom      : false ,
    isContactChat     : false ,
    isExpandMenu      : false ,
    newMsgReadyToggle : false ,

    remoteStream_ref  : '',
    localStream_ref   : '',

    mediaCallState : webSocketState.WEBSOCKET_MEDIACALL_STATE_IDLE ,

    allContactList_keyIsIpId : {},

    isShowPanel : true , // used to show panel in small device view
    
}

const creacteWS = (state,data) => {

    console.log("saving websocket connection to store ...")
    console.log(data)

    return updateObject(state,data)
}

const destroyWS = (state,data) => {

    return updateObject(state,data)
}

const sharedReducer = (state,data) => {

    const toggleSignal = !state.toggleSignal ;

    const newData = {...data, ...{toggleSignal: toggleSignal}}
    
    return updateObject(state,newData)

}

const selectContact = (state, data) => {

    const functionName = "selectContact"

    // console.log(` ${fileName} ${functionName} : `)
    // console.log(data)

    let toggleSignal = false ;

    if(state.toggleSignal == true) {
        toggleSignal = false ;
    }  else {
        toggleSignal = true
    }

    const newData = {...data, ...{toggleSignal: toggleSignal}}

    return updateObject(state,newData)
}


const selectGroup = (state, data) => {

    const functionName = "selectGroup"

    // console.log(` ${fileName} ${functionName} : `)
    // console.log(data)

    let toggleSignal = false ;

    if(state.toggleSignal == true) {
        toggleSignal = false ;
    }  else {
        toggleSignal = true
    }

    const newData = {...data, ...{toggleSignal: toggleSignal}}

    return updateObject(state,newData)

}

const setIsExpandMenu = (state, data) => {
    return updateObject(state,data)
}

const setNewMsgToggle = (state, data) => {
    console.log("********setNewMsgToggle in websocket/reducer.js*****************")
    console.log(state)
    console.log(data)
    return updateObject(state,data)
}

const setisInMediaCall = (state,data) => {
    return updateObject(state,data)
}

const setIsCallAccepted = (state, data) => {
    return updateObject(state,data)
}

const setMediaCallState = (state, data) => {
    return updateObject(state,data)
}

const setStreamRef = (state,data) => {
    return updateObject(state, data)
}

const setContactList =(state,data) => {
    return updateObject(state, data)
}

const setIsShowPanel =(state,data) => {
    return updateObject(state, data)
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.WEBSOCKET_CREATE : 
            return creacteWS(state,action.data);
        case actionTypes.WEBSOCKET_DESTROY : 
            return destroyWS(state,action.data);
        case actionTypes.WEBSOCKET_SELECT_CONTACT : 
            return selectContact(state, action.data)
        case actionTypes.WEBSOCKET_SELECT_GROUP : 
            return selectGroup(state, action.data)
        case actionTypes.WEBSOCKET_SET_ISEXPANDMENU : 
            return setIsExpandMenu(state,action.data)
        case actionTypes.WEBSOCKET_NEWMESSAGE : 
            return setNewMsgToggle(state,action.data)
        case actionTypes.WEBRTC_SET_MEDIACALLSTATE : 
            return setMediaCallState(state,action.data)
        case actionTypes.WEBRTC_SET_STREAM_REF : 
            return setStreamRef(state,action.data) 
        case actionTypes.WEBSOCKET_SET_CONTACTLIST : 
            return setContactList(state,action.data)
        case actionTypes.WEBSOCKET_SET_ISSHOWPANEL : 
            return setIsShowPanel(state,action.data)

        default : 
            return sharedReducer(state,action.data);
    }
}

export default reducer ;