import React from 'react'
import './Item.css'
import {Link} from 'react-router-dom'

function Item(props) {
    return (
        <div className='ComponentRoot'>
            <Link to={props.to} >
                <span style={props.style} >{props.itemName}</span>
            </Link>
        </div>
    )
}

export default Item
