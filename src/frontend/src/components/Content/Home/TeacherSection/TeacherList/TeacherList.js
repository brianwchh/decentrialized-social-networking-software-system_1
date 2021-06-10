import React, {useState,useEffect,useRef} from 'react'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import './TeacherList.css'
import TeacherCard from '../TeacherCard/TeacherCard'

function TeacherList(props) {

    const albumRef = useRef(null)

    const selectedTeacherArray =  props.selectedTeacherArray


    useEffect(() => {
        
        albumRef.current.scrollLeft = 0;
        return () => {
            
        }
    }, [])
    
    const handleOnClickForward = (e) => {

        const total_width = albumRef.current.scrollWidth ;
        // const windowWidth = window.innerWidth
        const imageWidth = total_width / selectedTeacherArray.length;
        // if (windowWidth <= 800) {
            // small device, one image per row
            albumRef.current.scrollLeft += imageWidth;
            if (albumRef.current.scrollLeft % imageWidth != 0){
                albumRef.current.scrollLeft = Math.ceil((albumRef.current.scrollLeft / imageWidth)) * imageWidth
            }
        // }

        // console.log(imageWidth, albumRef.current.scrollLeft, total_width)
    }

    const handleOnClickBack = (e) => {
        
        const total_width = albumRef.current.scrollWidth ;
        const windowWidth = window.innerWidth
        const imageWidth = total_width / selectedTeacherArray.length;
        // if (windowWidth <= 800) {
            // small device, one image per row
            albumRef.current.scrollLeft -= imageWidth;
            if (albumRef.current.scrollLeft % imageWidth != 0){
                albumRef.current.scrollLeft = Math.ceil((albumRef.current.scrollLeft / imageWidth)) * imageWidth
            }
        // }

        // console.log(imageWidth , albumRef.current.scrollLeft, total_width)
    }

    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const handleOnTouchStart = (e) => {
        console.log("hello onTouchStart ... ",e.targetTouches[0].clientX)
        setTouchStart(e.targetTouches[0].clientX);
    }

    const handleOnTouchMove = (e) => {
        // console.log("hello onTouchMove ... ",e.targetTouches[0].clientX)
        setTouchEnd(e.targetTouches[0].clientX);
    }

    const handleOnTouchEnd = (e) => {
        console.log("hello onTouchEnd ... ", touchStart - touchEnd)
        if (touchStart - touchEnd > 6) {
            // do your stuff here for left swipe
            handleOnClickForward();
        }
    
        if (touchStart - touchEnd < -6) {
            // do your stuff here for right swipe
            handleOnClickBack();
        }
    }


    return (
        <div className='teacherListRoot' 
            ref={albumRef}
            onTouchStart={handleOnTouchStart}
            onTouchEnd={handleOnTouchEnd}
            onTouchMove={handleOnTouchMove}
        >
            {selectedTeacherArray.map((Teacher,index) => (
                <div className='album' 
                    key={index}
                >
                    <TeacherCard 
                        profile_image={Teacher.profile_image}
                        name={Teacher.name}
                        index = {index}
                        parentCallBack={props.parentCallBack}
                    />
                 </div>   
            ))}

            <div className='arrowForwardIconWrapper' onClick={handleOnClickForward}> 
                <ArrowForwardIosIcon style={{ color: 'rgb(55,55,55)', fontSize: "30px" }} />
            </div>
            <div className='arrowBackIconWrapper' onClick={handleOnClickBack} > 
                <ArrowBackIosIcon style={{ color: 'rgb(55,55,55)', fontSize: "30px" }}  />
            </div>
        </div>
    )
}

export default TeacherList
