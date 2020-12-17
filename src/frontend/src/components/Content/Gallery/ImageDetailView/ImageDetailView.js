import React, {useState,useEffect,useRef} from 'react'
import './ImageDetailView.css'
import getSafeProperty from '../../../../utility/getSafeProperty'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';

function ImageDetailView(props) {

    const [ImageArray, setImageArray] = useState([])
    const [SelectedId, setSelectedId] = useState(0)
    const imageThumbNailsRef = useRef(null)
    const imageDetailRef = useRef(null)


    let state = {
        reachRightEnd : 0 ,
        previousValuesForScrollLeft0 : null,
        previousValuesForScrollLeft1 : null,
        previousValuesForScrollLeft2 : null,
    }

    useEffect(
        () => {
            // on component mount 

            addEventListener2Component();
            addEventListener2ImgeDetail();
            // SelectedIdRef.current = SelectedId ;
            window.imageIdSelted = Number(0)

            if (props.location.myparams) {

                const ImageArray = getSafeProperty(()=>props.location.myparams.ImageArray, 'undefined')
                if (ImageArray  !== 'undefined') {
                    setImageArray(ImageArray)
                }
            }

            setSelectedId(props.match.params.imageId)

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

            console.log ("ImageArray.length : ",ImageArray.length)

            const imageWidth = imageThumbNailsRef.current.scrollWidth / ImageArray.length
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


            console.log ("ImageArray.length : ",ImageArray.length)
            window.ImageArrayLength = ImageArray.length ;

        },

    [ImageArray])

    async function incrementToGlobal (b) {

        var tempValue = Number(window.imageIdSelted) + Number(b) 

        console.log(window.ImageArrayLength)

        if (window.ImageArrayLength) {     // strange bug, why ImageArray.length always returns 0 when the image list is rendered correctly
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


    const addEventListener2Component = (e) => {
        imageThumbNailsRef.current.addEventListener('wheel', handleOnWheel)
    }
    
    const removeEventListenerFromComponent = (e) => {
        if (imageThumbNailsRef.current) {
            imageThumbNailsRef.current.removeEventListener('wheel',handleOnWheel)
        }
    }

    const addEventListener2ImgeDetail = (e) => {
        imageDetailRef.current.addEventListener('wheel', handleSwitchImgOnWheel)
    }
    
    const removeEventListener2ImgeDetail = (e) => {
        if (imageDetailRef.current) {
            imageDetailRef.current.removeEventListener('wheel',handleSwitchImgOnWheel)
        }
    }

    const handleOnclickToSelect = (e,id) => {
        setSelectedId(id)
    }

    const handleOnClickForward = (e) => {
        let SelectedId_val = SelectedId + 1 ;
        if (SelectedId_val > ImageArray.length-1) {
            SelectedId_val = ImageArray.length-1;
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

    return (
        <div className='imageDetalViewRoot'>
            <input type='checkbox' id='imageDetalViewRootCheckbox' />
            <div className='imageDetail' ref={imageDetailRef} >
                <img src={ImageArray[SelectedId]} />
                <div className='arrowForwardIconWrapper' onClick={handleOnClickForward} > 
                    <ArrowForwardIcon style={{ color: 'rgb(255,255,255)', fontSize: "20px" }} />
                </div>
                <div className='arrowBackIconWrapper' onClick={handleOnClickBack} > 
                    <ArrowBackIcon style={{ color: 'rgb(255,255,255)', fontSize: "20px" }}  />
                </div>
                <label className='icoMenuWrapper' for='imageDetalViewRootCheckbox'>
                    <MenuOpenIcon style={{ color: 'rgb(255,255,255)', fontSize: "30px"}}  />
                </label>
            </div>
            <div className='imageThumbNails' ref={imageThumbNailsRef}>
                    {ImageArray.map((image,id) => (
                        <div className='album' 
                            key={id}
                        >
                            <img src={ImageArray[id]} 
                                onClick={(e)=>{handleOnclickToSelect(e,id)}}     
                                style={
                                    (SelectedId == id)? {borderStyle: 'solid', borderWidth: '2px', borderColor:'red' } : {}
                                }
                            />
                        </div>   
                    ))}
            </div>
        </div>
    )
}

export default ImageDetailView
