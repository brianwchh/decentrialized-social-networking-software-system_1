import React from 'react'
import './OrderByDropDownItem.css'

function OrderByDropDownItem(props) {
    return (
        <div className='orderByDropDownItemRoot'>
            <a  >
                <span style={props.style} >{props.itemName}</span>
            </a>
        </div>
    )
}

export default OrderByDropDownItem
