import React,{useState,useEffect} from 'react'
import './Menu.css'

import Home from './Home/Home'
import Profile from './Profile/Profile'
import About from './ProjectRepo/ProjectRepo'
import CourseMenu from  './Course/CourseMenu'
import ContactUs from './ContactUs/ContactUs'
import PeersChatMenu from './PeersChatMenu/PeersChatMenu'
import Blog from './Blog/Blog'
import Gallery from './Gallery/Gallery'
import MySubscription from './MySubscription/MySubscription.js'
import ProjectRepo from './ProjectRepo/ProjectRepo'


function Menu() {

    const [toggleChatMenu,setToggleChatMenu] = useState(false)

    const handleOnClick2ToggleChatMenu = () => {
        setToggleChatMenu(!toggleChatMenu)
    }

    return (
        <div className='menuRoot'>
            <div className='home munuItem' onClick={handleOnClick2ToggleChatMenu}>
                <Home />
            </div>
            <div className='peersChat munuItem'>
                <PeersChatMenu toggleChatMenu = {toggleChatMenu} />
            </div>
            <div className='course munuItem expandItem' onClick={handleOnClick2ToggleChatMenu}>
                <CourseMenu />
            </div>
            <div className='profile munuItem expandItem' onClick={handleOnClick2ToggleChatMenu}>
                <Profile />
            </div>
            <div className='about munuItem expandItem' onClick={handleOnClick2ToggleChatMenu}>
                <Blog />
            </div>
            
            <div className='contactUs munuItem expandItem' onClick={handleOnClick2ToggleChatMenu}>
                {<MySubscription />}
            </div>

            <div className='contactUs munuItem' onClick={handleOnClick2ToggleChatMenu}>
                <Gallery />
            </div>

            <div className='contactUs munuItem' onClick={handleOnClick2ToggleChatMenu}>
                <ProjectRepo />
            </div>

        </div>
    )
}

export default Menu
