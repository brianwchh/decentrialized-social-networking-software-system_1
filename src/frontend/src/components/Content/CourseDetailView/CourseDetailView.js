import React,{useState} from 'react'
import './CourseDetailView.css'
import CoursePlayWindowAndList from './CoursePlayWindowAndList/CoursePlayWindowAndList'
import CourseIntro from './CourseIntro/CourseIntro'
import Discussion from './Discussion/Discussion'
import Assessment from './Assessment/Assessment'
import CourseEvaluation from './CourseEvaluation/CourseEvaluation'


function CourseDetailView(props) {

    const [showIntroPage,setShowIntroPage] = useState(true)
    const [showDiscussionPage,setShowDiscussionPage] = useState(false)
    const [showEvaluationPage,setShowEvaluationPage] = useState(false)
    const [showAssessmentPage,setShowAssessmentPage] = useState(false)


    const onClickSelectIntro = () => {
        setShowIntroPage(true)
        setShowDiscussionPage(false)
        setShowEvaluationPage(false)
        setShowAssessmentPage(false)
    }

    const onClickSelectDiscussion = () => {
        setShowIntroPage(false)
        setShowDiscussionPage(true)
        setShowEvaluationPage(false)
        setShowAssessmentPage(false)
    }

    const onClickSelectEvaluation = () => {
        setShowIntroPage(false)
        setShowDiscussionPage(false)
        setShowEvaluationPage(true)
        setShowAssessmentPage(false)
    }

    const onClickSelectAssessment = () => {
        setShowIntroPage(false)
        setShowDiscussionPage(false)
        setShowEvaluationPage(false)
        setShowAssessmentPage(true)
    }

    let selectedPage = '' ;

    if (showIntroPage == true) {
        selectedPage = <CourseIntro />
    } else if (showDiscussionPage == true) {
        selectedPage = <Discussion />
    } else if (showEvaluationPage == true) {
        selectedPage = <CourseEvaluation />
    } else if (showAssessmentPage == true) {
        selectedPage = <Assessment />
    }

    return (
        <div className="courseDetailViewRoot">
            <div className="coursePlayWindowAndList">
                <CoursePlayWindowAndList />
            </div>

            <div className="buyCourse">
                <div className="itemAndPrice">
                    <div className="otherItems">

                    </div>
                    <div className="price">
                        <p className="priceName" >price</p>
                        <p className="priceValue"> NT$2000 </p>
                    </div>
                </div>
                <div className="buyWrapper">
                    <div className="buttonAndItems">
                        <div className="rate"></div>
                        <div className='order'>
                            <p className='orderName'> order </p>
                        </div>
                    </div>
                    <div className="reserved">

                    </div>
                </div>
            </div>

            <div className="ResourseOrAccessment">
                <div className="selectionBarWrapper">
                    <div className="selectionBar">
                        <div className="item" onClick={onClickSelectIntro} >
                            <div className="itemNameWrapper">
                                <p className="itemName">Intro</p>
                            </div>
                            <div className="underline" style={{backgroundColor: showIntroPage? 'red':'rgb(211, 211, 211)'}}></div>
                        </div>
                        <div className="item" onClick={onClickSelectDiscussion} >
                            <div className="itemNameWrapper">
                                <p className="itemName">discussion</p>
                            </div>
                            <div className="underline" style={{backgroundColor: showDiscussionPage? 'red':'rgb(211, 211, 211)'}} ></div>
                        </div>
                        <div className="item" onClick={onClickSelectEvaluation} >
                            <div className="itemNameWrapper">
                                <p className="itemName">feedback</p>
                            </div>
                            <div className="underline" style={{backgroundColor: showEvaluationPage? 'red':'rgb(211, 211, 211)'}} ></div>
                        </div>
                        <div className="item" onClick={onClickSelectAssessment} >
                            <div className="itemNameWrapper">
                                <p className="itemName">assessment</p>
                            </div>
                            <div className="underline" style={{backgroundColor: showAssessmentPage? 'red':'rgb(211, 211, 211)'}} ></div>
                        </div>
                    </div>
                </div>
                <div className="selectedPage">
                    {selectedPage}
                </div>
            </div>
        </div>
    )
}

export default CourseDetailView



