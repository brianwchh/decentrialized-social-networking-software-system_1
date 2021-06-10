import React from 'react'
import './Contact.css'

function Contact(props) {
    return (
        <div className='contactRoot'>
            <div className='contactImageWrapper'>
                <img src= {props.profileImg} />
            </div>
            <div className='nameAndNotification'>
                <p className='name'>
                    <span>{props.name}</span>
                </p>
                <p className='unReadMsgCnt'>
                    <span>{props.unReadMsgCnt}</span>
                </p>
            </div>
        </div>
    )
}

export default Contact
