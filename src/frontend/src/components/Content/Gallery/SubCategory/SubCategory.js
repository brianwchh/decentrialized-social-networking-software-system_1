import React , {useEffect, useState, useRef} from 'react'
import {Link} from 'react-router-dom'
import './SubCategory.css'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function SubCategory(props) {

    function getSafe(fn, defaultVal) {
        try {
            return fn();
        } catch (e) {
            return defaultVal;
        }
    }

    const [ItemArray, setItemArray] = useState([])
    const [CategoryName, setCategoryName] = useState()
    const [ImageList,setImageList] = useState({}) 

    const categoryItemsRef = useRef(null)

    let state = {
        scrollBarPosition : 0 ,
        rootRef : null,
        reachRightEnd : 0 ,
        previousValuesForScrollLeft0 : null,
        previousValuesForScrollLeft1 : null,
        previousValuesForScrollLeft2 : null,
    }

    useEffect(
        () => {
            // on component mount 
            if (props.location.myparams) {

                const DataArray = getSafe(()=>props.location.myparams.DataArray, 'undefined')
                if (DataArray  !== 'undefined') {
                    setItemArray(DataArray)
                }

                const ImageList = getSafe(()=>props.location.myparams.ImageList, 'undefined')
                if (ImageList !== 'undefined') {
                    setImageList(ImageList)
                }
                
            }

            setCategoryName(props.match.params.category)
            

            return () => {
                // component unmount 

            }
        },

        [])


    useEffect(
        () => {
            console.log("hello data received", ImageList)
        },

    [ImageList])

    const handleOnClickForward = (e) => {

        const total_width = categoryItemsRef.current.scrollWidth ;
        // const windowWidth = window.innerWidth
        const imageWidth = total_width / ItemArray.length;
        // if (windowWidth <= 800) {
            // small device, one image per row
            categoryItemsRef.current.scrollLeft += imageWidth;
            if (categoryItemsRef.current.scrollLeft % imageWidth != 0){
                categoryItemsRef.current.scrollLeft = Math.ceil((categoryItemsRef.current.scrollLeft / imageWidth)) * imageWidth
            }
        // }

        console.log(imageWidth, categoryItemsRef.current.scrollLeft, total_width)
    }

    const handleOnClickBack = (e) => {
        
        const total_width = categoryItemsRef.current.scrollWidth ;
        const windowWidth = window.innerWidth
        const imageWidth = total_width / ItemArray.length;
        // if (windowWidth <= 800) {
            // small device, one image per row
            categoryItemsRef.current.scrollLeft -= imageWidth;
            if (categoryItemsRef.current.scrollLeft % imageWidth != 0){
                categoryItemsRef.current.scrollLeft = Math.ceil((categoryItemsRef.current.scrollLeft / imageWidth)) * imageWidth
            }
        // }

        // console.log(imageWidth , categoryItemsRef.current.scrollLeft, total_width)
    }


    function handleOnWheel(e){

        // console.log(state.reachRightEnd, state.previousValuesForScrollLeft0,
        //     state.previousValuesForScrollLeft1,state.previousValuesForScrollLeft2)

        if (e.deltaY < 0) {
            // scroll up 
            if(window.scrollY == 0) {
                e.preventDefault(); // disable parent scroll 
                
                categoryItemsRef.current.scrollLeft -= categoryItemsRef.current.scrollWidth * 0.02 ;
                // if (categoryItemsRef.current.scrollLeft <=0) {
                //     categoryItemsRef.current.scrollLeft = 0 ;
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
                categoryItemsRef.current.scrollLeft += categoryItemsRef.current.scrollWidth * 0.02;
                
                state.previousValuesForScrollLeft2 = state.previousValuesForScrollLeft1;
                state.previousValuesForScrollLeft1 = state.previousValuesForScrollLeft0;
                state.previousValuesForScrollLeft0 = categoryItemsRef.current.scrollLeft ;
                if (state.previousValuesForScrollLeft0 == state.previousValuesForScrollLeft1 &&
                    state.previousValuesForScrollLeft1 == state.previousValuesForScrollLeft2 
                    ){
                        state.reachRightEnd = 1 ;
                    }
            }
        }

        // console.log(categoryItemsRef.current.scrollLeft, categoryItemsRef.current.scrollWidth)
        

    }

    const addEventListener2Component = (e) => {
        categoryItemsRef.current.addEventListener('wheel', handleOnWheel)
    }
    
    const removeEventListenerFromComponent = () => {
        if (categoryItemsRef.current) {
            categoryItemsRef.current.removeEventListener('wheel',handleOnWheel)
        }
    }

    useEffect(
        () => {
            // on component mount 
            addEventListener2Component();

            // document.getElementById('galleryRoot').addEventListener('wheel',handleOnWheel)

            return () => {
                // component unmount 
                removeEventListenerFromComponent();
                // if(document.getElementById('galleryRoot')){
                //     document.getElementById('galleryRoot').removeEventListener('wheel', handleOnWheel)
                // }
            }
        },

    [])


    let items2Render ;
    if (ItemArray) {
        
        items2Render = ItemArray.map(Place => (
            <div className='categoryItem' 
                key={Place.id}
            >
                <img src={Place.CoverImage} />
                <div className='categoryItemNameWrapper'>
                    <p className='categoryItemName'> {Place.PlaceName} </p>
                </div>
                <div className='clickForMoreWrapper'>
                    <Link className='clickForMore' to= {Place.Link}> MORE PHOTOS </Link>
                </div>
                
            </div>  
        ))
    } 
    
    return (
        <div className='subCategoryRoot'>
            <div className='subCategoryName'>
                { CategoryName ? <p> {CategoryName} </p> : <p> no data receieved from server </p>}
            </div>
            
             <div className='categoryItems' ref={categoryItemsRef}>
                {items2Render}
                    <div className='arrowForwardIconWrapper' onClick={handleOnClickForward}> 
                        <ArrowForwardIcon style={{ color: 'rgb(255,255,255)', fontSize: "20px" }} />
                    </div>
                    <div className='arrowBackIconWrapper' onClick={handleOnClickBack} > 
                        <ArrowBackIcon style={{ color: 'rgb(255,255,255)', fontSize: "20px" }}  />
                    </div>
            </div> 
            
        </div>
    )
}

export default SubCategory
