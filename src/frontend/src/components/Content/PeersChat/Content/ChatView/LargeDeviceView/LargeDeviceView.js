import React from 'react'
import './LargeDeviceView.css'
import Panel from '../Panel/Panel'
import ChatArea from '../ChatArea/ChatArea'

function LargeDeviceView(props) {
    return (
        <div className='largeDeviceViewRoot'>
            <div className='panelWrapper'>
                <Panel />
            </div>
            <div className='chatAreaWrapper'>
                <ChatArea /> 
            </div>
        </div>
    )
}

export default LargeDeviceView
