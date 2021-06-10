import React from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './DropDownList.css'

function DropDownList(props) {
    return (
        <div className='dropDownListRoot' >
            <input type='checkbox' id={props.menuName + props.ckeckboxID} />

            <div className='aTagAndIcon' >
                <p className='aTag' style={props.style}>
                    <span>{props.menuName}</span>
                </p>
                <label className='iconWrapper' htmlFor={props.menuName + props.ckeckboxID} style={props.style} onClick={props.cb}>
                    <ExpandMoreIcon style={{ color: 'white', fontSize: "20px" }} />
                </label>
            </div>

            <div className='menuContent' >
                {props.children}
            </div>
        </div>
    )
}

export default DropDownList
