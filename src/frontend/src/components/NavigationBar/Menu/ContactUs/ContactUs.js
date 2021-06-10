import React from 'react'
import './ContactUs.css'

import Item from '../sharedComponents/Item/Item'

function ContactUs() {
    return (
        <div className='ContactUsMenuRoot'>
            <Item style={{color:'black'}} to='/#' itemName='contact us'/>
        </div>
    )
}

export default ContactUs
