import React,{useState,useEffect} from 'react'
import './CourseListView.css'
import SearchIcon from '@material-ui/icons/Search';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import OrderBy from './OrderBy/OrderBy'
import OrderByDropDownItem from './OrderBy/OrderByDropDownItem/OrderByDropDownItem'
import ContentList from './ContentList/ContentList'
import CoursePreViewIframe from '../Home/CoursePreViewIframe/CoursePreViewIframe'
import PageIndexing from './PageIndexing/PageIndexing'

function CourseListView(props) {

    const [searchKeyWords,setSearchKeyWords] = useState()
    const [mouseOvered, setMouseOvered] = useState(false)
    const [showMenu,setShowMenu] = useState(false)
    const [selectedId,setSelectedId] = useState(0);
    const [selectedCourseArray,setSelectedCourseArray] = useState([])
    const [isCourseIframeShown,setIsCourseIframeShown] = useState(false)
    const [selectedCourseArrayIndex,setSelectedCourseArrayIndex] =useState(0)

    const categories = [
        {
            category_id: 0 ,
            category_name : 'All'
        },
        {
            category_id: 1 ,
            category_name : 'IT'
        },
        {
            category_id: 2 ,
            category_name : 'Art'
        },
        {
            category_id: 3 ,
            category_name : 'Music'
        },
        {
            category_id: 4 ,
            category_name : 'lala'
        },
        {
            category_id: 5 ,
            category_name : 'lalala'
        },
        {
            category_id: 6 ,
            category_name : 'management'
        },
    ]    

    const Courses = [
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


    useEffect(() => {
        setSelectedCourseArray(Courses)
        return () => {
            
        }
    }, [])


    const handleOnChange = (e) => {
        e.preventDefault()
        // const name = e.target.name ;
        const value = e.target.value ;
        // setUser( {...User , ...{[name] : value}})
        setSearchKeyWords(value)
    }

    const handleOnMouseOver = (e) => {
        setMouseOvered(true)
    }

    const handleOnMouseLeave = (e) => {
        setMouseOvered(false)
    }

    const handleOnSelection = (id) => {

        setSelectedId(id) ; 
        handleFilterCourseList(categories[id].category_id)  //filter the course by the selected category

        showMenuCallBack();
    }

    const showMenuCallBack  = () => {
        if (showMenu == false) {
            setShowMenu(true)
        } else {
            setShowMenu(false)
        }
    }

    const handleFilterCourseList = (category_id) => {
        if (category_id == 0) {
            setSelectedCourseArray(Courses)
            return 
        }

        let selectedCourseArray = [];
        for(let i=0; i<Courses.length; ++i){
            if (Courses[i].category_id == category_id){
                selectedCourseArray.push(Courses[i])
            }
        }
        
        setSelectedCourseArray(selectedCourseArray)
    }

    const openRecommendedCourseDetailIframeCallBack = (selectedArrayId) => {
        setSelectedCourseArrayIndex(selectedArrayId)
        setIsCourseIframeShown(true)
    }

    const handleOnClickCloseIframe = (e) => {
        setIsCourseIframeShown(false)
    } 

    let courseIframe = '' ;

    if (isCourseIframeShown === true) {
        courseIframe = ( <div className='iframeStyle' >
                                        <div className='transparentBar'>

                                        </div>
                                        <div className='iframeBody'>
                                            <CoursePreViewIframe  
                                                CourseArray={selectedCourseArray} 
                                                selectedCourseArrayIndex={selectedCourseArrayIndex} 
                                                handleOnClickClose = {handleOnClickCloseIframe}
                                            />
                                        </div>
                                </div>)
    } else {
        courseIframe = ''
    }


    return (
        <div className='courseListViewRoot'>
            <div className='wrapper'>
                <div className='topBar'>
                    <div className='search'>
                        <div className='icon'>
                            <SearchIcon style={{ color: 'rgb(255,255,255)', fontSize: "35px" }} />
                        </div>
                        <input 
                            type='text' 
                            value={searchKeyWords}
                            name='searchKeyWords'
                            placeholder='Search'
                            onChange={handleOnChange}
                        />
                        {/* <div className='enter' 
                            onMouseOver={handleOnMouseOver} 
                            onMouseLeave={handleOnMouseLeave}
                        >
                            <KeyboardReturnIcon 
                                style={{ color: mouseOvered == true ? 'red' : 'rgb(255,255,255)', fontSize: "40px" }} 
                            />
                        </div> */}
                    </div>

                    <div className='spacer'>

                    </div>

                    <div className='orderby'>
                        <OrderBy 
                            menuName={categories[selectedId].category_name}  
                            style={{color:'rgb(200,200,200)'}} 
                            showMenuCallBack = {showMenuCallBack}
                            showMenu = {showMenu}
                        >
                            {categories.map((item,index)=>(
                                <div 
                                    className='item' 
                                    key= {index} 
                                    onClick = {()=>{handleOnSelection(index)}}
                                >
                                    <OrderByDropDownItem 
                                        style={{color:'rgb(200,200,200)'}}  
                                        itemName={item.category_name}
                                    />
                                </div>))
                            }
                        </OrderBy>
                    </div>
                </div>
                <div className='contentList'>
                    <ContentList 
                        Courses={selectedCourseArray}
                        openRecommendedCourseDetailIframeCallBack={openRecommendedCourseDetailIframeCallBack}
                    />
                </div>
                <div className='pageIndexWrapper'>
                    <PageIndexing  
                        TotalPageNum={10}
                    />
                </div>
            </div>

            {courseIframe}

        </div>
    )
}

export default CourseListView
