import React from 'react'
import './MySubscription.css'

import Item from '../sharedComponents/Item/Item'
import DropDown from '../sharedComponents/DropDown/DropDown'


function MySubscription() {

    return (
        <div className='mySubscriptionRoot'>
{            <DropDown menuName='Subscriptions' style={{color:'black'}} to='/subscription'>
                <div className='blog item'>
                    <Item style={{color:'white'}} to='/subscription' itemName='Subscriptions'/>
                </div>
                <div className='newblog item'>
                    <Item style={{color:'white'}} to='/newsubscription' itemName='add subscription'/>
                </div>
            </DropDown>}
        </div>
    )
}

export default MySubscription;