import React,{useEffect,useState} from 'react'
import SmallDeviceView from './SmallDeviceView/SmallDeviceView'
import LargeDeviceView from './LargeDeviceView/LargeDeviceView'
import './ChatView.css'

function ChatView(props) {

    let chatView = '' ;
    const [windowWidth,setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {

        window.addEventListener("resize", getWindowSize);

        return () => {
            window.removeEventListener('resize', getWindowSize)
        }
    }, [])

    const getWindowSize = () => {
        setWindowWidth(window.innerWidth) ;
    }

    chatView = ((windowWidth < 600)? <SmallDeviceView /> : <LargeDeviceView />)

    return ( 
        <div className='chatViewRoot'>
            {chatView}
        </div>
    )
}

export default ChatView
