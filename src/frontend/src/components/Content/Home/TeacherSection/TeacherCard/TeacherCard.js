import React from 'react'
import './TeacherCard.css'

function TeacherCard(props) {
    return (
        <div className='teacherCardRoot'>
            <div className='innerBox'>
                <div className='imageWrapper'>
                    <img src={props.profile_image} />
                </div>
                <div className='albumNameWrapper'>
                    <p className='albumName'> {props.name}</p>
                </div>
                <div className='clickForMoreWrapper'>
                    <div className='clickForMore' onClick={(e)=>{props.parentCallBack(props.index)}}> More </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherCard
