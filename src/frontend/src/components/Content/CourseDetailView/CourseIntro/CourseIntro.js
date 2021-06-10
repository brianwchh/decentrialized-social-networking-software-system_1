import React,{useState} from 'react'
import './CourseIntro.css'

import CheckIcon from '@material-ui/icons/Check';
import CourseSection from './CourseSection/CourseSection'

export default function CourseIntro(props) {

    const courseSectionArray = [
        {
            sectionName: "Course Introduction",
            durationInfo : "6 lectures • total 14min",
            sectionItems: [
                {
                    itemName : "Introduction to the course",
                    preview  : true,
                    itemDuration: "01:02:02"
                },
                {
                    itemName : "Remaster in Progress",
                    preview  : false,
                    itemDuration: "02:04"
                },
                {
                    itemName : "Video Quality",
                    preview  : false,
                    itemDuration: "01:08"
                }
            ]
        },
        {
            sectionName: "Install and Setup",
            durationInfo : "7 lectures • total 33min",
            sectionItems: [
                {
                    itemName : "Python for Windows",
                    preview  : false,
                    itemDuration: "02:19"
                },
                {
                    itemName : "Installing IntelliJ IDEA for Windows",
                    preview  : false,
                    itemDuration: "06:35"
                },
                {
                    itemName : "Python for Linux",
                    preview  : false,
                    itemDuration: "02:19"
                }
            ]
        },
        {
            sectionName: "Steping into the World of Python",
            durationInfo : "25 lectures • total 2hr 30min",
            sectionItems: [
                {
                    itemName : "introduction",
                    preview  : false,
                    itemDuration: "02:19"
                },
                {
                    itemName : "Our first Python Program",
                    preview  : false,
                    itemDuration: "06:35"
                },
                {
                    itemName : "Printing in Python",
                    preview  : false,
                    itemDuration: "02:19"
                }
            ]
        },
        {
            sectionName: "Lists and Tupples",
            durationInfo : "54 lectures • total 4hr 45min",
            sectionItems: [
                {
                    itemName : "introduction to Sequene Types",
                    preview  : false,
                    itemDuration: "02:19"
                },
                {
                    itemName : "Lists",
                    preview  : false,
                    itemDuration: "06:35"
                },
                {
                    itemName : "Immutable Objects",
                    preview  : false,
                    itemDuration: "02:19"
                },
                {
                    itemName : "Mutable Objects",
                    preview  : false,
                    itemDuration: "02:19"
                }
            ]
        }
    ]

    const CollapseAllSections = "Collapse all setions"
    const ExpandAllSections = "Expand all setions"
    const [isExpandAll, setIsExpandAll] = useState(false)

    const CollapseOrExapndAllSection = () => {
        setIsExpandAll(!isExpandAll)
    }

    return (
        <div className="courseIntroRoot">
            <div className="innerWrapper">
                <div className="goal">
                    <p className="whatyoulllearn">What you'll learn</p>
                    <div className="goalItem">
                        <div className="icon">
                            <CheckIcon style={{ color: 'rgb(150,150,150)', fontSize: "20px" }} />
                        </div>
                        <p className="textContent"> Have a fundamental understanding of the Python programming language </p>
                    </div>
                    <div className="goalItem">
                        <div className="icon">
                            <CheckIcon style={{ color: 'rgb(150,150,150)', fontSize: "20px" }} />
                        </div>
                        <p className="textContent"> Acquire the pre-requisite Python skills to move into specific branches - Machine Learning, Data Science, etc.. </p>
                    </div>
                    <div className="goalItem">
                        <div className="icon">
                            <CheckIcon style={{ color: 'rgb(150,150,150)', fontSize: "20px" }} />
                        </div>
                        <p className="textContent"> Understand how to create your own Python programs. </p>
                    </div>
                    <div className="goalItem">
                        <div className="icon">
                            <CheckIcon style={{ color: 'rgb(150,150,150)', fontSize: "20px" }} />
                        </div>
                        <p className="textContent"> Understand both Python 2 and Python 3. </p>
                    </div>
                </div>
                <div className="content">
                    <p className="courseContent">Course content</p>
                    <div className="courseBriefLen">
                        <p className="courseDuration">22 sections • 435 lectures • 61h 9m total length </p>
                        <div className="collapseAll" onClick={CollapseOrExapndAllSection}>
                            {isExpandAll==true? CollapseAllSections:ExpandAllSections}
                        </div>
                    </div>

                    {courseSectionArray.map((item,index)=>(
                        <div className="section" key={index}>
                            <CourseSection 
                                section={item}
                                isExpandAll = {isExpandAll}
                            />
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}



