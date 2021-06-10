import React from 'react'
import './Blog.css'

import Item from '../sharedComponents/Item/Item'
import DropDown from '../sharedComponents/DropDown/DropDown'

function Blog() {

    return (
        <div className='blogMenuRoot'>
            <DropDown menuName='blog' style={{color:'black'}} to='/blog'>
                <div className='blog item'>
                    <Item style={{color:'white'}} to='/blog' itemName='blog list'/>
                </div>
                <div className='newblog item'>
                    <Item style={{color:'white'}} to='/blog/newblog' itemName='new blog'/>
                </div>
                <div className='blog item'>
                    <Item style={{color:'white'}} to='/blog/followme' itemName='follow me'/>
                </div>
            </DropDown>
        </div>
    )
}

export default Blog;