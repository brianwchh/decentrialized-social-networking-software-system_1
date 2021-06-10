import React from 'react'
import './Banner.css'
import {Link} from 'react-router-dom'

function Banner() {
    return (
        <div className='bannerRoot'>
            <video 
                className="bannerVideo" 
                role="presentation" 
                crossOrigin="anonymous" 
                playsInline="" 
                preload="auto" 
                muted="muted" 
                loop={true} 
                autoPlay="autoplay" 
                tabIndex="-1" 
            >
                <source src="https://video.wixstatic.com/video/f2ac30_68bfecd4ea394125934809efec593e4d/720p/mp4/file.mp4" type="video/mp4"></source>
                Your browser does not support the video tag.
            </video>

            <div className='floatingPanel'>
                <div className='subPanel'>
                    <p className='lala'>
                        <span>知識</span>
                    </p>
                </div>
                <div className='subPanel'>
                    <p className='lala'>
                        <span>觸手可及</span>
                    </p>
                </div>
                <div className='subPanel_courselist'>
                    <Link to= '/course' className='courseList'>
                        <span>Course list</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Banner
