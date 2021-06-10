import React from 'react'
import './CourseCategoryItem.css'

function CourseCategoryItem(props) {
    return (
        <div className='courseCategoryItemRoot'>
            <a  >
                <span style={props.style} >{props.itemName}</span>
            </a>
        </div>
    )
}

export default CourseCategoryItem
