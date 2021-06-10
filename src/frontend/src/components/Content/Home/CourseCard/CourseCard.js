import React from 'react'
import './CourseCard.css'
import {Link} from 'react-router-dom'
import { useHistory } from "react-router-dom";

function CourseCard(props) {
    let history = useHistory();

    const gotoCoursePage = (index) => {
        
        // history.push("/")
        history.push(`/course/${props.index}`)
        // <Route path='/course/:id'  component={CourseDetailView} />
    }


    return (
        <div className='courseCardRoot'>
            {/* <div className='innerBox' onClick={()=>{props.click4more(props.index)}}> */}
            <div className='innerBox' onClick={()=>{gotoCoursePage(props.index)}}>
                <div className='courseImage'>
                    <img src = {props.course_img} />
                </div>
                <div className='coursePriceNinfo'>
                    <p><span>{props.title}</span></p>
                    {/* <p className='more' onClick={()=>{props.click4more(props.index)}}> */}
                    <p className='more' onClick={()=>{gotoCoursePage(props.index)}}>
                        <span>More</span>
                    </p>
                </div>
                <div className='courseBrief'>
                    <p><span>{props.brief_intro}</span></p>
                </div>
            </div>
        </div>
    )
}

export default CourseCard
