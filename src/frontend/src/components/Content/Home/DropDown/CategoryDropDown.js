import React,{useRef} from 'react'
import './CategoryDropDown.css'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function CategoryDropDown(props) {

    return (

        <div className='categoryDropDownRoot'>

            {/* <input type='checkbox' id={props.menuName + props.ckeckboxID} ref={checkboxRef} /> */}

            <div className='aTagAndIcon'>
                <a  style={props.style}>
                    <span>{props.menuName}</span>
                </a>
                {/* <label className='iconWrapper' htmlFor={props.menuName + props.ckeckboxID}>
                    <ExpandMoreIcon style={{ color: 'rgb(100,100,100)', fontSize: "20px" }} />
                </label> */}
                <div className='iconWrapper'  onClick={()=>{props.parentCallBack()}} >
                    <ExpandMoreIcon style={{ color: 'rgb(100,100,100)', fontSize: "20px" }} />
                </div>
            </div>

            <div className='menuContent' style={{display: props.showMenu==true? 'block' : 'none'}} >
                {props.children}
            </div>
        </div>
    )
}

export default CategoryDropDown
