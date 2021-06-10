import React,{useRef,useState} from 'react'
import './OrderBy.css'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function OrderBy(props) {

    return (

        <div className='orderByRoot'>

            <div className='aTagAndIcon'>
                <a  style={props.style}>
                    <span>{props.menuName}</span>
                </a>
                <div className='iconWrapper'  onClick={()=>{props.showMenuCallBack()}} >
                    <ExpandMoreIcon style={{ color: props.style.color, fontSize: "20px" }} />
                </div>
            </div>

            <div className='menuContent' style={{display: props.showMenu==true? 'block' : 'none'}} >
                {props.children}
            </div>
        </div>
    )
}

export default OrderBy
