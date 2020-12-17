import React, {useEffect, useState} from 'react'
import './ImageListView.css'
import getSafeProperty from '../../../../utility/getSafeProperty'

function ImageListView(props) {

    const [ImageArray, setImageArray] = useState([])
    const [PlaceName,setPlaceName] = useState()

    useEffect(
        () => {
            // on component mount 
            if (props.location.myparams) {

                const ImageArray = getSafeProperty(()=>props.location.myparams.ImageArray, 'undefined')
                if (ImageArray  !== 'undefined') {
                    setImageArray(ImageArray)
                }
                
            }

            setPlaceName(props.match.params.place)
            

            return () => {
                // component unmount 

            }
        },

        [])




    const handleOnClickOnImage = (e,id) => {
        props.history.push({
                                                                     
            pathname : `/gallery/travel/taiwan/${id}`,
            myparams: { 
                ImageArray : ImageArray,
            }
        })
    }


    return (
        <div className='imageListViewRoot'>
            <div className='albumName'>
                <p> {PlaceName} </p>
            </div>
            <div className='imgArray'>
                {ImageArray.map((image,index) => (
                    <div className='album' 
                        key={index}
                    >
                        <img src={image} onClick={(e) => handleOnClickOnImage(e,index)} />
                    </div>   
                ))}
            </div>
        </div>
    )
}

export default ImageListView
