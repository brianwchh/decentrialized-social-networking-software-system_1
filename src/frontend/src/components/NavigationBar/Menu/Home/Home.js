import React from 'react'
import './Home.css'

import Item from '../sharedComponents/Item/Item'

function Home() {
    return (
        <div className='homeMenuRoot'>
            <Item style={{color:'black'}} to='/' itemName='Home'/>
        </div>
    )
}

export default Home
