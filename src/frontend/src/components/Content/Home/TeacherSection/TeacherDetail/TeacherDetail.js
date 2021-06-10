import React, {useState,useEffect,useRef} from 'react'
import './TeacherDetail.css'
import getSafeProperty from '../../../../../utility/getSafeProperty'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import VodPlayer from '../../../VodPlayer/VodPlayer'

function TeacherDetail(props) {

    const [TeacherArray, setTeacherArray] = useState([])
    const [SelectedId, setSelectedId] = useState(0)
    const imageThumbNailsRef = useRef(null)
    const [playVideo,setPlayVideo] = useState(false)
    const playerWrapperRef = useRef(null)
    const [playerWidth,setPlayerWidth] = useState()
    const [playerHeight,setPlayerHeight] = useState()


    let state = {
        reachRightEnd : 0 ,
        previousValuesForScrollLeft0 : null,
        previousValuesForScrollLeft1 : null,
        previousValuesForScrollLeft2 : null,
    }

    let videoBlogOfTeacher = '' ;

    useEffect(
        () => {
            // on component mount 
            videoBlogOfTeacher = (
                <div className='imageWrapper' ref={playerWrapperRef}>
                    <img 
                        src={TeacherArray.length == 0 ? '' : TeacherArray[SelectedId].profile_image} 
                        onClick={handleClick2Play}
                    />
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

            addEventListener2Component();
            addEventListener2ImgeDetail();
            // SelectedIdRef.current = SelectedId ;
            window.imageIdSelted = Number(0)

            console.log(props.TeacherArray)

            if (props.TeacherArray) {

                const TeacherArray = getSafeProperty(()=>props.TeacherArray, 'undefined')
                if (TeacherArray  !== 'undefined') {
                    setTeacherArray(TeacherArray)
                }
            }

            setSelectedId(props.selectedTeacherArrayId)

            return () => {
                // component unmount 
                removeEventListenerFromComponent();
                removeEventListener2ImgeDetail();
            }
        },

        [])

    
    useEffect(
        () => {
            // console.log(SelectedId)

            // SelectedIdRef.current = SelectedId ;
            // state.imageIdSeleted = SelectedId ;
            // window.imageIdSelted = Number(SelectedId) ;
            // console.log("window.imageIdSelted, ", window.imageIdSelted)

            setPlayVideo(false)

            console.log ("TeacherArray.length : ",TeacherArray.length)

            const imageWidth = imageThumbNailsRef.current.scrollWidth / TeacherArray.length
            const width2Set = imageWidth * SelectedId ;
            if (width2Set + window.innerWidth < imageThumbNailsRef.current.scrollWidth) {
                imageThumbNailsRef.current.scrollLeft =  width2Set - window.innerWidth / 2 ;
            } else {
                imageThumbNailsRef.current.scrollLeft = imageThumbNailsRef.current.scrollWidth - window.innerWidth ;
            }

        },

    [SelectedId])

    useEffect(
        () => {


            console.log ("TeacherArray.length : ",TeacherArray.length)
            window.ImageArrayLength = TeacherArray.length ;

        },

    [TeacherArray])

    async function incrementToGlobal (b) {

        var tempValue = Number(window.imageIdSelted) + Number(b) 

        console.log(window.ImageArrayLength)

        if (window.ImageArrayLength) {     // strange bug, why TeacherArray.length always returns 0 when the image list is rendered correctly
            if (tempValue > window.ImageArrayLength-1){
                tempValue = window.ImageArrayLength-1 
            } else if (tempValue < 0) {
                tempValue = 0 
            }
        }

        console.log(tempValue)

        window.imageIdSelted = Number(tempValue) ;
        setSelectedId(window.imageIdSelted)

        return window.imageIdSelted
    }

    const handlePlayerWinderResized = (e) => {
        // console.log(`${playerWrapperRef.current.offsetHeight} vs ${playerWrapperRef.current.clientHeight}`)
        // console.log(`${playerWrapperRef.current.offsetWidth} vs ${playerWrapperRef.current.clientWidth}`)
        const componentHeight = getSafeProperty(()=>playerWrapperRef.current.offsetHeight, 'undefined')
        if(componentHeight != 'undefined'){
            setPlayerHeight(componentHeight)
        }
        const componentWidth = getSafeProperty(()=>playerWrapperRef.current.offsetWidth, 'undefined')
        if(componentWidth != 'undefined'){
            setPlayerHeight(componentWidth)
        }  
    }

    const addEventListener2Component = (e) => {

        imageThumbNailsRef.current.addEventListener('wheel', handleOnWheel)
        window.addEventListener('resize', handlePlayerWinderResized )
    }
    
    const removeEventListenerFromComponent = (e) => {
        if (imageThumbNailsRef.current) {
            imageThumbNailsRef.current.removeEventListener('wheel',handleOnWheel)
        }
    }

    const addEventListener2ImgeDetail = (e) => {
        playerWrapperRef.current.addEventListener('wheel', handleSwitchImgOnWheel)
    }
    
    const removeEventListener2ImgeDetail = (e) => {
        if (playerWrapperRef.current) {
            playerWrapperRef.current.removeEventListener('wheel',handleSwitchImgOnWheel)
        }
    }

    const handleOnclickToSelect = (e,id) => {
        setSelectedId(id)
    }

    const handleOnClickForward = (e) => {
        let SelectedId_val = SelectedId + 1 ;
        if (SelectedId_val > TeacherArray.length-1) {
            SelectedId_val = TeacherArray.length-1;
        }
        setSelectedId(SelectedId_val )
    }

    const handleOnClickBack = (e) => {
        let SelectedId_val = SelectedId - 1 ;
        if (SelectedId_val < 0) {
            SelectedId_val = 0;
        }
        setSelectedId(SelectedId_val )
    }

    const handleSwitchImgOnWheel = async(e) => {
        e.preventDefault();

        if (e.deltaY > 0) {
            await incrementToGlobal(1)
        } else {
            await incrementToGlobal(-1)
        }
    }

    function handleOnWheel(e){

        // console.log(state.reachRightEnd, state.previousValuesForScrollLeft0,
        //     state.previousValuesForScrollLeft1,state.previousValuesForScrollLeft2)

        if (e.deltaY < 0) {
            // scroll up 
            if(window.scrollY == 0) {
                e.preventDefault(); // disable parent scroll 
                
                imageThumbNailsRef.current.scrollLeft -= imageThumbNailsRef.current.scrollWidth * 0.02 ;
                // if (imageThumbNailsRef.current.scrollLeft <=0) {
                //     imageThumbNailsRef.current.scrollLeft = 0 ;
                // }
                // reset if scroll left 
                state.reachRightEnd = 0 ;
                state.previousValuesForScrollLeft0 = 0 ;
                state.previousValuesForScrollLeft1 = 0 ;
                state.previousValuesForScrollLeft2 = 0 ;

            }
            //if parent scrolly != equal to 0 , scroll parent first
        } else {
            //scroll down , scroll child first , then propagate to parent scroll
            if (state.reachRightEnd == 0 ){ // scroll right , never can reach maximum
                // find a signal indicating reaching the right edge.
                e.preventDefault(); // disable parent scroll 
                imageThumbNailsRef.current.scrollLeft += imageThumbNailsRef.current.scrollWidth * 0.02;
                
                state.previousValuesForScrollLeft2 = state.previousValuesForScrollLeft1;
                state.previousValuesForScrollLeft1 = state.previousValuesForScrollLeft0;
                state.previousValuesForScrollLeft0 = imageThumbNailsRef.current.scrollLeft ;
                if (state.previousValuesForScrollLeft0 == state.previousValuesForScrollLeft1 &&
                    state.previousValuesForScrollLeft1 == state.previousValuesForScrollLeft2 && 
                    state.previousValuesForScrollLeft1 >  10
                    ){
                        state.reachRightEnd = 1 ;
                    }
            }
        }

        // console.log(imageThumbNailsRef.current.scrollLeft, imageThumbNailsRef.current.scrollWidth)
        

    }

    const handleClick2Play = (e) => {
        setPlayerWidth(playerWrapperRef.current.clientWidth)
        setPlayerHeight(playerWrapperRef.current.clientHeight)
        setPlayVideo(true)
    }


    if (playVideo === true) {

        videoBlogOfTeacher = (
                                <div className='imageWrapper' ref={playerWrapperRef}>
                                    <VodPlayer 
                                        m3u8url = 'http://localhost/hls/360p.m3u8' 
                                        controls= {true}
                                        autoPlay = {true}
                                        width = {playerWidth}
                                        height = {playerHeight}
                                    />
                                </div>
                            )
    } else {
        
        videoBlogOfTeacher = (
                                <div className='imageWrapper' ref={playerWrapperRef}>
                                    <div className='image'>
                                        <img 
                                            src={TeacherArray.length == 0 ? '' : TeacherArray[SelectedId].profile_image} 
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
        <div className='teacherDetailRoot'>
            <input type='checkbox' id='imageDetalViewRootCheckbox' />
            <div className='imageDetail'  >
                {videoBlogOfTeacher}
                <div className='info'>
                    <p className='name'><span>{TeacherArray.length == 0 ? '' : TeacherArray[SelectedId].name}</span></p>
                    <hr />
                    <p className='description'><span> {TeacherArray.length == 0 ? '' : TeacherArray[SelectedId].about} </span></p>
                </div>
                <div className='arrowForwardIconWrapper' onClick={handleOnClickForward} > 
                    <ArrowForwardIosIcon style={{ color: 'rgb(55,55,55)', fontSize: "40px" }} />
                </div>
                <div className='arrowBackIconWrapper' onClick={handleOnClickBack} > 
                    <ArrowBackIosIcon style={{ color: 'rgb(55,55,55)', fontSize: "40px" }}  />
                </div>
                <label className='icoMenuWrapper' for='imageDetalViewRootCheckbox'>
                    <MenuOpenIcon style={{ color: 'rgb(55,55,55)', fontSize: "30px"}}  />
                </label>
            </div>

            <div className='imageList' ref={imageThumbNailsRef}>
                    {TeacherArray.map((item,id) => (
                        <div className='album' 
                            key={id}
                        >
                            <img src={item.profile_image} 
                                onClick={(e)=>{handleOnclickToSelect(e,id)}}     
                                style={
                                    (SelectedId == id)? {borderStyle: 'solid', borderWidth: '2px', borderColor:'red' } : {}
                                }
                            />
                            <p className='profileName'>
                                <span>{item.name}</span>
                            </p>
                        </div>   
                    ))}
            </div>
        </div>
    )
}

export default TeacherDetail
