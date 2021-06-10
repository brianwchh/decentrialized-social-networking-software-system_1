import React, {useEffect,useState,useCallback} from 'react'
import './NewlyOpennedCourseSection.css'
import {Link} from 'react-router-dom'
import RecommendedCourses from '../RecommendedCourses/RecommendedCourses'
import CourseCategory from '../CourseCategory/CourseCategory'
import CoursePreViewIframe from '../CoursePreViewIframe/CoursePreViewIframe'

const MemorizedRecommendedCoursesComponent = React.memo(({openRecommendedCourseDetailIframeCallBack,selectedRecommendedCourseArray})=>(<RecommendedCourses selectedRecommendedCourseArray={selectedRecommendedCourseArray} click4more={openRecommendedCourseDetailIframeCallBack} />))


function NewlyOpennedCourseSection(props) {

    const allCourses = [
        {
            title :  '網頁設計',
            price :  '2000NT',
            duration : '30小時',
            brief_intro: '這是關於***的課程，有****和****....',
            category_id: 1,
            course_img: 'Courses/1.jpeg',
            course_intro_video: '',
            id: 0
        },
        {
            title :  '網頁設計',
            price :  '2000NT',
            duration : '30小時',
            brief_intro: '這是關於***的課程，有****和****....',
            category_id: 1,
            course_img: 'Courses/2.jpeg',
            course_intro_video: '',
            id: 1
        },
        {
            title :  '網頁設計',
            price :  '2000NT',
            duration : '30小時',
            brief_intro: '這是關於***的課程，有****和****....',
            category_id: 2,
            course_img: 'Courses/1.jpg',
            course_intro_video: '',
            id: 2
        },
        {
            title :  '網頁設計',
            price :  '2000NT',
            duration : '30小時',
            brief_intro: '這是關於***的課程，有****和****....',
            category_id: 2,
            course_img: 'Courses/2.jpg',
            course_intro_video: '',
            id: 3
        },
        {
            title :  '網頁設計',
            price :  '2000NT',
            duration : '30小時',
            brief_intro: '這是關於***的課程，有****和****....',
            category_id: 3,
            course_img: 'Courses/1.jpeg',
            course_intro_video: '',
            id: 4
        },
        {
            title :  '網頁設計',
            price :  '2000NT',
            duration : '30小時',
            brief_intro: '這是關於***的課程，有****和****....',
            category_id: 4,
            course_img: 'Courses/1.jpg',
            course_intro_video: '',
            id: 5
        },
        {
            title :  '網頁設計',
            price :  '2000NT',
            duration : '30小時',
            brief_intro: '這是關於***的課程，有****和****....',
            category_id: 5,
            course_img: 'Courses/2.jpeg',
            course_intro_video: '',
            id: 6
        },
        {
            title :  '網頁設計',
            price :  '2000NT',
            duration : '30小時',
            brief_intro: '這是關於***的課程，有****和****....',
            category_id: 6,
            course_img: 'Courses/2.jpg',
            course_intro_video: '',
            id: 7
        },
        {
            title :  '網頁設計',
            price :  '2000NT',
            duration : '30小時',
            brief_intro: '這是關於***的課程，有****和****....',
            category_id: 4,
            course_img: 'Courses/2.jpeg',
            course_intro_video: '',
            id: 8
        },
        {
            title :  '網頁設計',
            price :  '2000NT',
            duration : '30小時',
            brief_intro: '這是關於***的課程，有****和****....',
            category_id: 5,
            course_img: 'Courses/1.jpeg',
            course_intro_video: '',
            id: 9
        },
    ]

    const [selectedCourseArray,setSelectedCourseArray] = useState([])
    const [selectedCourseArrayIndex, setSelectedCourseArrayIndex] = useState(0)
    const [isCourseIframeDisplayed,setIsCourseIframeDisplayed] = useState(false)

    useEffect(() => {
        
        setSelectedCourseArray(allCourses)
        setIsCourseIframeDisplayed(false)

        return () => {
            
        }
    }, [])

    const handleOnClickClose = (e) => {
        setIsCourseIframeDisplayed(false)
    } 

    const openRecommendedCourseDetailIframeCallBack = useCallback((selectedArrayId) => {
        setSelectedCourseArrayIndex(selectedArrayId)
        setIsCourseIframeDisplayed(true)
    }, []);

    let recommendedCourseIframe = '' ;

    if (isCourseIframeDisplayed === true) {
        recommendedCourseIframe = ( <div className='iframeStyle' >
                                        <div className='transparentBar'>

                                        </div>
                                        <div className='iframeBody'>
                                            <CoursePreViewIframe  
                                                CourseArray={selectedCourseArray} 
                                                selectedCourseArrayIndex={selectedCourseArrayIndex} 
                                                handleOnClickClose = {handleOnClickClose}
                                            />
                                        </div>
                                    </div>)
    } else {
        recommendedCourseIframe = ''
    }

    const handleFilterCourseList = (category_id) => {
        if (category_id == 0) {
            setSelectedCourseArray(allCourses)
            return 
        }

        let selectedCourseArray = [];
        for(let i=0; i<allCourses.length; ++i){
            if (allCourses[i].category_id == category_id){
                selectedCourseArray.push(allCourses[i])
            }
        }
        
        setSelectedCourseArray(selectedCourseArray)
    }

    return (
        <div className='newlyOpennedCourseSectionRoot'>
                <div className='section_title'>
                    <Link to='/recomendedcourse' className='title'>
                        <span>New course</span>
                    </Link>
                    <div className='dropDownMenuWrapper'>
                        <CourseCategory categories = {props.CourseCategories} handleFilterCategory={handleFilterCourseList}/>
                    </div>
                </div>
                <div className='videosWrapper'>
                    <MemorizedRecommendedCoursesComponent   
                        openRecommendedCourseDetailIframeCallBack = {openRecommendedCourseDetailIframeCallBack}
                        selectedRecommendedCourseArray = {selectedCourseArray}
                    />
                </div>
                {recommendedCourseIframe}
        </div>
    )
}

export default NewlyOpennedCourseSection
