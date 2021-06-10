import React,{useState,useRef,useEffect} from 'react'
import './CoursePlayWindowAndList.css'
import VodPlayer from '../../VodPlayer/VodPlayer'


function CoursePlayWindowAndList(props) {

    const [playerWidth,setPlayerWidth] = useState()
    const [playerHeight,setPlayerHeight] = useState()
    const [playVideo,setPlayVideo] = useState(false)
    const [keyCnt,setKeyCnt] = useState(0)

    const playerWrapperRef = useRef(null)
    let videoBlogOfTeacher = '' ;


    const handleClick2Play = (e) => {
        window.playerWidth = playerWrapperRef.current.clientWidth ;
        window.playerHeight = playerWrapperRef.current.clientHeight
        setPlayVideo(true)
    }

    if (playVideo === true) {

        console.log("re-rendering .... ")
        console.log(playerHeight,"  ", window.playerWidth)

        videoBlogOfTeacher = (
                                <div className='imageWrapper' 
                                    ref={playerWrapperRef}
                                    key = {keyCnt}
                                >
                                    <VodPlayer 
                                        m3u8url = 'http://localhost/hls/360p.m3u8' 
                                        controls= {true}
                                        autoPlay = {true}
                                        
                                    />
                                </div>
                            )
    } else {
        
        videoBlogOfTeacher = (
                                <div className='imageWrapper' ref={playerWrapperRef}>
                                    <div className='image'>
                                        <img 
                                            src="/meihua.jpg" 
                                            onClick={handleClick2Play}
                                        />
                                    </div>
                                    <svg width="56" height="56" 
                                        viewBox="0 0 56 56" 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        class="playerSymbol"
                                        onClick={handleClick2Play}
                                    >
                                        <g fill="#FFF" fill-rule="evenodd">
                                            <path d="M28 53c13.807 0 25-11.193 25-25S41.807 3 28 3 3 14.193 3 28s11.193 25 25 25zm0 3C12.536 56 0 43.464 0 28S12.536 0 28 0s28 12.536 28 28-12.536 28-28 28z"></path>
                                            <path d="M37.232 27.91L22 36.82V19z"></path>
                                        </g>
                                    </svg>
                                </div>
                            )
    }

    return (
        <div className="coursePlayAndWindowRoot">
            <div className="playerWrapper">
                {videoBlogOfTeacher}
            </div>

        </div>
    )
}

export default CoursePlayWindowAndList
