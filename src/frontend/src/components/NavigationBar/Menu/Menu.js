import React from 'react'
import './Menu.css'

import Home from './Home/Home'
import PeersChat from './PeersChat/PeersChat'
import Blog from './Blog/Blog'
import Profile from './Profile/Profile'
import Store from './Store/Store'
import  Gallery  from './Gallery/Gallery'

function Menu() {
    return (
        <div className='menuRoot'>
            <div className='home munuItem'>
                <Home />
            </div>
            <div className='peersChat munuItem expandItem'>
                <PeersChat />
            </div>
            <div className='blog munuItem'>
                <Blog />
            </div>
            <div className='store munuItem'>
                <Store />
            </div>
            <div className='gallery munuItem '>
                <Gallery />
            </div>
            <div className='profile munuItem'>
                <Profile />
            </div>
        </div>
    )
}

export default Menu
