import React from 'react'
import './ExpandLeft.css'

import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {Link} from 'react-router-dom'

function ExpandLeft(props) {
    return (
        <div className='expandLeftRoot'>

            <input type='checkbox' id={props.menuName + props.ckeckboxID} />

            <div className='aTagAndIcon'>
                <Link to={props.to}>
                    <span>{props.menuName}</span>
                </Link>
                <label className='iconWrapper forLargeDevice' htmlFor={props.menuName + props.ckeckboxID}>
                    <ChevronLeftIcon style={{ color: 'rgb(220,220,220)', fontSize: "20px" }} />
                </label>
                <label className='iconWrapper forSmallDevice' htmlFor={props.menuName + props.ckeckboxID}>
                    <NavigateNextIcon style={{ color: 'rgb(220,220,220)', fontSize: "20px" }} />
                </label>
            </div>

            <div className='menuContent'>
                {props.children}
            </div>
        </div>
    )
}

export default ExpandLeft
