import React,{useState} from 'react'
import Panel from '../Panel/Panel'
import ChatArea from '../ChatArea/ChatArea'
import './SmallDeviceView.css'
import { connect } from 'react-redux';

function SmallDeviceView(props) {
    

    return (
        <div className='smallDeviceViewRoot'>
            <div className='panelWrapper' style={{display:(props.isShowPanel === true)? 'block' : 'none' }}>
                <Panel /> 
            </div>
            <div className='chatAreaWrapper' style={{display:(props.isShowPanel === true)? 'none' : 'block' }}>
                <ChatArea /> 
            </div>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        isShowPanel: state.websocket.isShowPanel,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        // authLoginAction : (userName,password) => dispatch(authLoginAction(userName,password))
    };
  };

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (SmallDeviceView)
