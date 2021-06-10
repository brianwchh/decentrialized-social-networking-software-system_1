import React,{useEffect,useState,useRef} from 'react'
import VideoCallIcon from '@material-ui/icons/VideoCall';
import PermPhoneMsgIcon from '@material-ui/icons/PermPhoneMsg';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachmentIcon from '@material-ui/icons/Attachment';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import SendIcon from '@material-ui/icons/Send';
import './ChatAreaMyGroup.css'
import { selectMyChatRoomAction } from '../../../../../../../store/websocket/actions';


function ChatAreaMyGroup(props) {

    const [textEditable,setTextEditable] = useState(true)
    const [inputValue,setInputValue] = useState([])
    const inputeditableRef = useRef(null)
    const [profileImg,setProfileImg] = useState('meihua.png')
    const [profileName,setProfileName] = useState("韩梅梅")
    const [sayUsayMe,setSayUsayMe] = useState("IMU")



    const handleOnInput = (e) => {
        // console.log(inputeditableRef.current.innerHTML)
        // console.log(inputeditableRef.current.clientHeight)
    }

    return (
        <div className='chatAreaMyGroupRoot'>
            <div className='contactProfile'>
                <div className='profileImg'>
                    <img src={props.MyChatRoom.image} width='50px'  height='50px' />
                </div>
                <p className='contactName'>
                    {props.MyChatRoom.roomName}
                </p>
                <a className='sayUsayMe'
                    href="#"
                >
                    {sayUsayMe}
                </a>
                <div className='videoCall'>
                    <VideoCallIcon style={{ color: 'white', fontSize: "30px" }} />
                </div>
                <div className='voiceCall'>
                    <PermPhoneMsgIcon style={{ color: 'white', fontSize: "30px" }} />
                </div>
                <div className='more'>
                    <MoreVertIcon style={{ color: 'white', fontSize: "30px" }} />
                </div>
            </div>
            <div className='messageArea'>

            </div>
            <div className='textInput'>
                <div className='sendFileIcon'>
                    <AttachmentIcon style={{ color: 'white', fontSize: "30px" }} />
                </div>
                <div 
                    className='typeTextHere' 
                    contentEditable={textEditable}
                    onInput={handleOnInput}
                    ref={inputeditableRef}
                >

                </div>
                <div className='emoji'>
                    <EmojiEmotionsIcon style={{ color: 'rgb(235, 228, 137)', fontSize: "30px" }} />
                </div>
                <div className='sendIcon'>
                    <SendIcon style={{ color: 'white', fontSize: "30px" }} />
                </div>
            </div>
        </div>

    )
}

export default ChatAreaMyGroup
