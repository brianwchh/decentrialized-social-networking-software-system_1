import React,{useEffect,useState,useRef} from 'react'
import './ChatArea.css'
import { connect } from 'react-redux';
import ChatAreaContact from './ChatAreaContact/ChatAreaContact'
import ChatAreaGroup from './ChatAreaGroup/ChatAreaGroup'
import ChatAreaMyGroup from './ChatAreaMyGroup/ChatAreaMyGroup'


function ChatArea(props) {

    let selectedChatArea = ''

    if (props.isGroupChat == true ){
        selectedChatArea = <ChatAreaGroup />
    } else if (props.isContactChat == true){
        selectedChatArea = <ChatAreaContact selectedContact={props.selectedContact} />
    } else if (props.isMyChatRoom == true) {
        selectedChatArea = <ChatAreaMyGroup selectedChatRoom={props.selectedChatRoom} />
    } else {
        selectedChatArea = '' ;
    }

    return (
        <div className='chatAreaRoot'>
            {selectedChatArea}
        </div>
    )
}


const mapStateToProps = state => {
    return {
        toggleSignal: state.websocket.toggleSignal,
        selectedContact : state.websocket.selectedContact,
        selectedGroup : state.websocket.selectedGroup,
        isGroupChat : state.websocket.isGroupChat,
        isMyChatRoom : state.websocket.isMyChatRoom,
        isContactChat : state.websocket.isContactChat,
        selectedChatRoom: state.websocket.selectedChatRoom
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
        // createWebsocket : () => dispatch(createWebsocketAction())
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
) (ChatArea)