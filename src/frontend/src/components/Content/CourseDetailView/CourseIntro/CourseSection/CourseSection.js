import React,{useState, useEffect} from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import './CourseSection.css'

function CourseSection(props) {


    const [isExpandSection,setIsExpandSection] = useState(false)

    useEffect(() => {
        if (props.isExpandAll == true){
            setIsExpandSection(true)
        } else {
            setIsExpandSection(false)
        }
        return () => {
        
        }
    }, [props.isExpandAll])

    const expandSection = () => {
        setIsExpandSection(!isExpandSection)
    }

    return (
        <div className="courseSectionRoot">
            <div className="sectionNameAndDuration">
                <div className="icon" onClick={expandSection}>
                    <ExpandMoreIcon style={{ color: 'rgb(100,100,100)', fontSize: "20px" }} />
                </div>
                <div className="sectionName"> {props.section.sectionName}</div>
                <div className="duration">{props.section.durationInfo}</div>
            </div>
            <div className="sectionItems" style={{display: isExpandSection == true ? 'block':'none'}}>
                {
                    props.section.sectionItems.map((item,index)=>(
                        <div className="item" key={index}>
                            <div className="icon">
                                <PlayCircleOutlineIcon style={{ color: 'rgb(150,150,150)', fontSize: "20px" }} />
                            </div>
                            <div className="lessionName">{item.itemName}</div>
                            
                            {
                                item.preview == true ? <div className="preview" >
                                                            <LockOpenIcon style={{ color: 'rgb(100,100,100)', fontSize: "15px" }} />
                                                       </div> : 
                                                       <div className="preview" >
                                                           <LockIcon style={{ color: 'rgb(100,100,100)', fontSize: "15px" }} />
                                                       </div>
                            }
                            <div className="duration">{item.itemDuration}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CourseSection
