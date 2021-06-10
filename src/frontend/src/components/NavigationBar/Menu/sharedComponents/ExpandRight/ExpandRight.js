import React from 'react'
import './ExpandRight.css'

import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {Link} from 'react-router-dom'

function ExpandRight(props) {
    return (
        <div className='expandRightRoot'>

            <input type='checkbox' id={props.menuName + props.ckeckboxID} />

            <div className='aTagAndIcon'>
                <Link to={props.to}>
                    <span>{props.menuName}</span>
                </Link>
                <label className='iconWrapper' htmlFor={props.menuName + props.ckeckboxID}>
                    <NavigateNextIcon style={{ color: 'rgb(220,220,220)', fontSize: "20px" }} />
                </label>
            </div>

            <div className='menuContent'>
                {props.children}
            </div>
        </div>
    )
}

export default ExpandRight
