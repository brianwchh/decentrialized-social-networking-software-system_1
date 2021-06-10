import React,{useState,useCallback,useEffect} from 'react'
import './TeacherSection.css'
import TeacherList from './TeacherList/TeacherList'
import TeacherPreViewIframe from './TeacherPreViewIframe/TeacherPreViewIframe'
import {Link} from 'react-router-dom'
import CourseCategory from '../CourseCategory/CourseCategory'

const MemorizedTeacherListComponent = React.memo(({openTeacherDetailIframeCallBack,selectedTeacherArray})=>(<TeacherList selectedTeacherArray={selectedTeacherArray} parentCallBack={openTeacherDetailIframeCallBack} />))

function TeacherSection(props) {

    const teacherArray = [
        {
            name : '梅豔芳',
            id   :  0 ,
            profile_image : 'TeacherList/music.jpg', 
            profile_video : '' ,
            about : '物理老師' ,
            category_id : 1 
        },
        {
            name : '梅豔芳',
            id   :  1 ,
            profile_image : 'TeacherList/music1.jpg',
            profile_video : '' ,
            about : '數學老師' ,
            category_id : 2 
        },
        {
            name : 'Anita Mui',
            id   :  2 ,
            profile_image : 'TeacherList/music3.bmp', 
            profile_video : '' ,
            about : '英語老師' ,
            category_id : 3
        },
        {
            name : '梅豔芳',
            id   :  3 ,
            profile_image : 'TeacherList/music5.jpg',
            profile_video : '' ,
            about : '化學老師' ,
            category_id : 4 
        },
        {
            name : '梅豔芳',
            id   :  4 ,
            profile_image : 'TeacherList/music6.jpg', 
            profile_video : '' ,
            about : '廚師' ,
            category_id : 5 
        },
        {
            name : '梅豔芳',
            id   :  5 ,
            profile_image : 'TeacherList/anita.jpg', 
            profile_video : '' ,
            about : '演員' ,
            category_id : 6 
        },  
        {
            name : '梅豔芳',
            id   :  5 ,
            profile_image : 'TeacherList/music9.jpeg', 
            profile_video : '' ,
            about : '演員' ,
            category_id : 6 
        },       
    ]


    const [isTeacherIframeDisplayed,setIsTeacherIframeDisplayed] = useState(false)
    const [selectedTeacherArrayId, setSelectedTeacherArrayId] = useState(0)
    const [selectedTeacherList,setSelectTeacherList] = useState([])
    // const [selectedRecommendedCourseArray,setSelectedRecommendedCourseArray] = useState([])


    useEffect(() => {
        setSelectTeacherList(teacherArray)
        // setSelectedRecommendedCourseArray(props.allCourses)
        return () => {
            
        }
    }, [])

    const handleOnClickClose = (e) => {
        console.log("hello close the iframe")
        setIsTeacherIframeDisplayed(false)
    } 

    /*

    */
    const openTeacherDetailIframeCallBack = useCallback((slectedArrayId) => {
        console.log(slectedArrayId)
        setSelectedTeacherArrayId(slectedArrayId)
        setIsTeacherIframeDisplayed(true)
    }, []);


    let teacherDetailIframe = '' ;

    if (isTeacherIframeDisplayed === true) {
        teacherDetailIframe = ( <div className='iframeStyle' >
                                    <div className='transparentBar'>

                                    </div>
                                    <div className='iframeBody'>
                                        <TeacherPreViewIframe  
                                            TeacherArray={selectedTeacherList} 
                                            selectedTeacherArrayId={selectedTeacherArrayId} 
                                            handleOnClickClose = {handleOnClickClose}
                                        />
                                    </div>
                                </div>)
    } else {
        teacherDetailIframe = ''
    }

    const handleFilterTeacherList = (category_id) => {
        if (category_id == 0) {
            setSelectTeacherList(teacherArray)
            return 
        }

        let selectedList = [];
        for(let i=0; i<teacherArray.length; ++i){
            if (teacherArray[i].category_id == category_id){
                selectedList.push(teacherArray[i])
            }
        }
        
        setSelectTeacherList(selectedList)
    }

    return (
        <div className='teacherSectionRoot'>
            <div className='teacherPoolTitleWrapper section_title'>
                    <Link to='/teacher' className='title'>
                        <span>Instructor</span>
                    </Link>
                    <div className='dropDownMenuWrapper'>
                        <div>
                            <CourseCategory categories= {props.CourseCategories} ckeckboxID='TeacherSection' handleFilterCategory = {handleFilterTeacherList} />
                        </div>
                    </div>
            </div>

            <div className='videosWrapper'>
                <MemorizedTeacherListComponent 
                    openTeacherDetailIframeCallBack = {openTeacherDetailIframeCallBack} 
                    selectedTeacherArray = {selectedTeacherList}
                />
            </div>

            {/* iframe style floating component */}
            {teacherDetailIframe}
        </div>
    )
}

export default TeacherSection
