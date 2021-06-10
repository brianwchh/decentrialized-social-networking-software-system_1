import React from 'react'
import './ContentList.css'
import CourseCard from '../../Home/CourseCard/CourseCard'

function ContentList(props) {


    return (
        <div className='contentListRoot'>
            {props.Courses.map((item,index) => (
                    <div className='courseItem' 
                        key={index}
                    >
                        <CourseCard 
                            course_img={item.course_img}
                            title={item.title}
                            brief_intro={item.brief_intro}
                            click4more={props.openRecommendedCourseDetailIframeCallBack}
                            index={index}
                        />
                    </div>   
            ))}
        </div>
    )
}

export default ContentList


