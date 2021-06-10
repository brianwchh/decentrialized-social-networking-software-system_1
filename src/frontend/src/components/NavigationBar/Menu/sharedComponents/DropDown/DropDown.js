import React from 'react'
import './DropDown.css'

import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Link} from 'react-router-dom'

function DropDown(props) {
    return (
        <div className='dropDownRoot'>

            <input type='checkbox' id={props.menuName + props.ckeckboxID} />

            <div className='aTagAndIcon'>
                <Link to={props.to} style={props.style}>
                    <span>{props.menuName}</span>
                </Link>
                <label className='iconWrapper' htmlFor={props.menuName + props.ckeckboxID}>
                    <ExpandMoreIcon style={{ color: 'rgb(100,100,100)', fontSize: "20px" }} />
                </label>
            </div>

            <div className='menuContent'>
                {props.children}
            </div>
        </div>
    )
}

export default DropDown
