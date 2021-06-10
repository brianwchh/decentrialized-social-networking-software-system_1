import React from 'react'
import './TeacherPreViewIframe.css'
import {Link} from 'react-router-dom'
import TeacherDetail from '../TeacherDetail/TeacherDetail'
import CloseIcon from '@material-ui/icons/Close';

function TeacherPreViewIframe(props) {

    return (
        <div className='teacherPreViewIframeRoot'>
            {/* iframeTopBar take the upper spacce of the iframe, close the iframe on clicking on the closeicon */}
            <div className='iframeTopBar'>
                <div className='visitMore'>
                    <Link to='/teacher' className='visitMoreDetailOfTeachers'>
                        <span>點擊了解更多</span>
                    </Link>
                </div>

                <div className='spacer'></div>

                <div className='closeIconWrapper' onClick={props.handleOnClickClose}>
                    <CloseIcon style={{ color: 'rgb(55,55,55)', fontSize: "40px" }} />
                </div>
            </div>
            {/* it takes up the whole bottom space of iframe */}
            <div  className='teacherPoolWrapper'>
                <TeacherDetail TeacherArray = {props.TeacherArray} selectedTeacherArrayId={props.selectedTeacherArrayId} />    
            </div>
        </div>
    )
}

export default TeacherPreViewIframe
