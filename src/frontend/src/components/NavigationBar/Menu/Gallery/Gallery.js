import React from 'react'
import './Gallery.css'

import Item from '../sharedComponents/Item/Item'

function Gallery() {
    return (
        <div className='galleryMenuRoot'>
            <Item style={{color:'black'}} to='/gallery' itemName='Gallery'/>
        </div>
    )
}

export default Gallery
