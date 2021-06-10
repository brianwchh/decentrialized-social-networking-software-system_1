import React from 'react'
import './Group.css'

function Group(props) {
    return (
        <div className='groupRoot'>
            <div className='groupImageWrapper'>
                <img src= {props.profileImg}  />
            </div>
            <div className='nameAndNotification'>
                <p className='groupName'>{props.Name}</p>
                <p className='notification'>{props.unReadMsgCnt}</p>
            </div>
        </div>
    )
}

export default Group
