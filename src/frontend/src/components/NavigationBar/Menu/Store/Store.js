import React from 'react'
import './Store.css'

import Item from '../sharedComponents/Item/Item'

function Store() {
    return (
        <div className='stroreRoot'>
            <Item style={{color:'black'}} to='/#' itemName='Store'/>
        </div>
    )
}

export default Store
