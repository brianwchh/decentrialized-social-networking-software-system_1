import React from 'react'
import './Profile.css'

import Item from '../sharedComponents/Item/Item'

function Profile() {
    return (
        <div className='profileMenuRoot'>
            <Item style={{color:'black'}} to='/#' itemName='Profile'/>
        </div>
    )
}

export default Profile
