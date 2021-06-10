import React from 'react'
import './CoursePreViewIframe.css'
import {Link} from 'react-router-dom'
import CoursePreViewDetail from './CoursePreViewDetail/CoursePreViewDetail'
import CloseIcon from '@material-ui/icons/Close';

function CoursePreViewIframe(props) {

    return (
        <div className='coursePreViewIframeRoot'>
            {/* iframeTopBar take the upper spacce of the iframe, close the iframe on clicking on the closeicon */}
            <div className='iframeTopBar'>
                <div className='visitMore'>
                    <Link className='visitMoreLink'
                        to=  {{                                                                    
                                pathname : props.CourseArray.length == 0 ? "#" : `/course/${props.CourseArray[props.selectedCourseArrayIndex]["id"]}`
                            }
                        
                        }
                    >
                        visit course page
                    </Link>
                </div>
                {/* <Link 
                    to=  {{                                                                    
                            pathname : CourseArray.length == 0 ? "#" : `/course/${CourseArray[SelectedId]["id"]}`,
                            myparams: {course_id :  CourseArray.length == 0 ? 0 : CourseArray[SelectedId]["id"]
                            }
                        
                        }}
                    style={{marginTop: "30px", marginLeft: "10px", marginRight: "10px", color: "black", fontSize: "x-large", fontWeight: "bold", textDecoration: "none" }}
                >
                    <span>{CourseArray.length == 0 ? '' : CourseArray[SelectedId].title}</span>
                </Link> */}

                <div className='spacer'></div>

                <div className='closeIconWrapper' onClick={props.handleOnClickClose}>
                    <CloseIcon style={{ color: 'rgb(55,55,55)', fontSize: "40px" }} />
                </div>
            </div>
            {/* it takes the whole bottom space of iframe */}
            <div  className='preViewWindow'>
                <CoursePreViewDetail CourseArray = {props.CourseArray} selectedCourseArrayIndex={props.selectedCourseArrayIndex} />    
            </div>
        </div>
    )
}

export default CoursePreViewIframe
