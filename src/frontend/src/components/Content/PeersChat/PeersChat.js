import React, {useState, useEffect} from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import './PeersChat.css'

import { connect } from 'react-redux';
import { 
    createWebsocketAction,
    setIsShowPanelAction
    } from '../../../store/websocket/actions'

import * as actionType  from '../../../store/auth/actionTypes'

import  ChatView from './Content/ChatView/ChatView'

function PeersChat(props) {
    
    const fileName = "PeersChat.js "

    useEffect(() => {

        // console.log(fileName, "props.login_status = ", props.login_status)
        // if (props.login_status == actionType.LOGIN_STATUS_SUCCEED && !props.sock_conn){
        //     props.createWebsocket(props.sock_conn)
        // }

        return () => {
            
        }

    }, [])


    const go2Panel = () => {
        props.setIsShowPanelAction(true) // show  panel of contact and group list
    }

    let chatContent = ''

    // switch, assign chatContent with different element according to different selected items on menu items of peerChatDrawer
    chatContent = (<ChatView  />)


    return (
        <div className='peerChatRoot'>
            {/* drawer  */}
            <input type='checkbox' id="peersChatMenuDrawerChk" />
            <label className='labelForpeersChatMenuDrawerChk' for='peersChatMenuDrawerChk'>
                <MenuIcon style={{ color: 'rgb(100,50,200)', fontSize: "30px" }} />
            </label>
            <div className='peerChatDrawer'>
                <button className='go2Panel' onClick={go2Panel} >Contact&Group List</button>
            </div>
            {/* panel and chat view */}
            <div className='peersChatContent'>
                {chatContent}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        sock_conn: state.websocket.sock_conn,
        login_status: state.auth.status ,
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
        setIsShowPanelAction : (isShowPanel) => dispatch(setIsShowPanelAction(isShowPanel))
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
) (PeersChat)
