import React from 'react'
import './Blog.css'

import Item from '../sharedComponents/Item/Item'

function Blog() {
    return (
        <div className='blogMenuRoot'>
            <Item style={{color:'black'}} to='/blog' itemName='Blog'/>
        </div>
    )
}

export default Blog
