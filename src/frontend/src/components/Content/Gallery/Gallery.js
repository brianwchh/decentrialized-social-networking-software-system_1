import React, {useState,useEffect,useRef} from 'react'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Link} from 'react-router-dom'
import './Gallery.css'

function Gallery(props) {

    const albumRef = useRef(null)

    let state = {
        scrollBarPosition : 0 ,
        reachRightEnd : 0 ,
        previousValuesForScrollLeft0 : null,
        previousValuesForScrollLeft1 : null,
        previousValuesForScrollLeft2 : null,
    }

    const ImageList = {
        Travel : {
            taiwan : [                                         
                '/Gallery/Travel/taiwan/0.jpg   ',         
                '/Gallery/Travel/taiwan/1.1.jpg ',   
                '/Gallery/Travel/taiwan/1.jpg   ',      
                '/Gallery/Travel/taiwan/2.0.jpg ', 
                '/Gallery/Travel/taiwan/2.jpeg  ',  
                '/Gallery/Travel/taiwan/2.1.jpg ',   
                '/Gallery/Travel/taiwan/2.2.jpg ', 
                '/Gallery/Travel/taiwan/3.jpg   ', 
                '/Gallery/Travel/taiwan/4.jpg   ',  
                '/Gallery/Travel/taiwan/5.jpg   ',      
                '/Gallery/Travel/taiwan/6.jpeg  ',      
                '/Gallery/Travel/taiwan/7.png   ',      
                '/Gallery/Travel/taiwan/8.jpg   ',      
                '/Gallery/Travel/taiwan/9.jpg   ',   
                '/Gallery/Travel/taiwan/10.jpg  ',     
                '/Gallery/Travel/taiwan/11.jpg  ',      
                '/Gallery/Travel/taiwan/12.jpg  ',      
                '/Gallery/Travel/taiwan/13.jpg  ',      
                '/Gallery/Travel/taiwan/14.jpg  ',      
                '/Gallery/Travel/taiwan/15.jpg  ',      
                '/Gallery/Travel/taiwan/16.jpg  ',      
                '/Gallery/Travel/taiwan/17.jpg  ',      
                '/Gallery/Travel/taiwan/18.jpg  ',      
                '/Gallery/Travel/taiwan/19.jpg  ',           
                '/Gallery/Travel/taiwan/20.jpg  ',         
                '/Gallery/Travel/taiwan/21.jpg  ',      
                '/Gallery/Travel/taiwan/22.jpeg ',           
                '/Gallery/Travel/taiwan/23.jpg  ',      
                '/Gallery/Travel/taiwan/24.jpg  ',      
                '/Gallery/Travel/taiwan/25.jpeg ',      
                '/Gallery/Travel/taiwan/26.jpg  ',      
                '/Gallery/Travel/taiwan/27.jpg  ',      
                '/Gallery/Travel/taiwan/28.jpeg ',      
                '/Gallery/Travel/taiwan/29.jpg  ',          
                '/Gallery/Travel/taiwan/30.png  ',      
                '/Gallery/Travel/taiwan/31.jpg  ',      
                '/Gallery/Travel/taiwan/32.jpg  ',      
                '/Gallery/Travel/taiwan/33.jpg  ',      
                '/Gallery/Travel/taiwan/34.jpg  ',      
                '/Gallery/Travel/taiwan/35.jpg  ',      
                '/Gallery/Travel/taiwan/36.jpg  ',      
                '/Gallery/Travel/taiwan/37.jpeg ',      
                '/Gallery/Travel/taiwan/38.jpg  ',      
                '/Gallery/Travel/taiwan/39.jpg  ',           
                '/Gallery/Travel/taiwan/40.jpg  ',      
                '/Gallery/Travel/taiwan/41.jpg  ',      
                '/Gallery/Travel/taiwan/42.jpg  ',      
                '/Gallery/Travel/taiwan/43.jpg  ',      
                '/Gallery/Travel/taiwan/44.jpg  ',      
                '/Gallery/Travel/taiwan/45.jpg  ',      
                '/Gallery/Travel/taiwan/46.jpg  ',      
                '/Gallery/Travel/taiwan/47.jpg  ',      
                '/Gallery/Travel/taiwan/48.jpg  ',      
                '/Gallery/Travel/taiwan/49.jpg  ',      
                '/Gallery/Travel/taiwan/50.jpg  ',      
                '/Gallery/Travel/taiwan/51.jpg  ',      
                '/Gallery/Travel/taiwan/52.jpg  ',          
            ] ,
            
            singapore : [
                        '/Gallery/Travel/singapore/0.jpg  ' ,
                        '/Gallery/Travel/singapore/1.jpg  ' , 
                        '/Gallery/Travel/singapore/2.jpg  ' , 
                        '/Gallery/Travel/singapore/3.jpg ' , 
                        '/Gallery/Travel/singapore/4.jpg ' , 
                        '/Gallery/Travel/singapore/5.jpg  ' , 
                        '/Gallery/Travel/singapore/6.jpg  ' , 
                        '/Gallery/Travel/singapore/7.jpg  ' , 
                        '/Gallery/Travel/singapore/8.jpg  ' , 
                        '/Gallery/Travel/singapore/9.jpg  ' , 
                        '/Gallery/Travel/singapore/10.jpg ' , 
                        '/Gallery/Travel/singapore/11.jpeg ' , 
                        '/Gallery/Travel/singapore/12.jpeg ' , 
                        '/Gallery/Travel/singapore/13.jpg ' , 
                        '/Gallery/Travel/singapore/14.jpg ' , 
                        '/Gallery/Travel/singapore/15.jpg ' , 
                        '/Gallery/Travel/singapore/16.jpeg ' , 
            ] ,
            jeju : [
                    '/Gallery/Travel/jeju/0.jpg  ' , 
                    '/Gallery/Travel/jeju/1.jpg  ' , 
                    '/Gallery/Travel/jeju/2.jpg  ' , 
                    '/Gallery/Travel/jeju/3.jpeg ' , 
                    '/Gallery/Travel/jeju/4.jpeg ' , 
                    '/Gallery/Travel/jeju/5.jpg  ' , 
                    '/Gallery/Travel/jeju/6.jpg  ' , 
                    '/Gallery/Travel/jeju/7.jpg  ' , 
                    '/Gallery/Travel/jeju/8.jpg  ' , 
                    '/Gallery/Travel/jeju/9.jpg  ' , 
                    '/Gallery/Travel/jeju/10.jpg ' , 
                    '/Gallery/Travel/jeju/11.jpg ' , 
                    '/Gallery/Travel/jeju/12.jpg ' , 
                    '/Gallery/Travel/jeju/13.jpg ' , 
                                         
            ] ,                                      

            india : [] ,
            malaysia : [],
            
        }
    }


    const AnimalsArray = [
        {
            id :  0 ,
            PlaceName : 'no1',
            CoverImage: '/Gallery/Animals/animals.jpg',
            Link : '/gallery/animals/no1'
        }
    ]

    const PlacesArray =  [
            {
                id :  0 ,
                PlaceName : 'taiwan',
                CoverImage: '/Gallery/Travel/cover_taiwan.jpg',
                Link : {
                                                                     
                            pathname : '/gallery/travel/taiwan',
                            myparams: {id : 1 , 
                                AlbumName: 'taiwan',
                                ImageArray : ImageList.Travel.taiwan ,
                            }
                        },
            },
            
            {
                id :  1 ,
                PlaceName : 'singapore',
                CoverImage: '/Gallery/Travel/cover_sg.jpg',
                Link : {
                                                                     
                    pathname : '/gallery/travel/singapore',
                    myparams: {id : 1 , 
                        AlbumName: 'singapore',
                        ImageArray : ImageList.Travel.singapore ,
                    }
                },
            },
            {
                id :  2 ,
                PlaceName : 'jeju sk',
                CoverImage: '/Gallery/Travel/cover_jeju.jpeg',
                Link : {
                                                                     
                    pathname : '/gallery/travel/jeju',
                    myparams: {id : 1 , 
                        AlbumName: 'jeju',
                        ImageArray : ImageList.Travel.jeju ,
                    }
                },
            },
            {
                id :  3 ,
                PlaceName : 'Dharamshala India',
                CoverImage: '/Gallery/Travel/india.jpg',
                Link : {
                                                                     
                    pathname : '/gallery/travel/india',
                    myparams: {id : 1 , 
                        AlbumName: 'india',
                        ImageArray : ImageList.Travel.india ,
                    }
                },
            },
            {
                id :  4 ,
                PlaceName : 'Malaysia',
                CoverImage: '/Gallery/Travel/KualaLumpur.jpg',
                Link : {
                                                                     
                    pathname : '/gallery/travel/malaysia',
                    myparams: {id : 1 , 
                        AlbumName: 'malaysia',
                        ImageArray : ImageList.Travel.malaysia ,
                    }
                },
            },
        ]
    

    const [AlbumList, setAlbumList] = useState(
                                                [
                                                    {
                                                        id        : 0,
                                                        AlbumName : "Travel",
                                                        CoverImage: "Gallery/Travel/ROCFlag.jpg",
                                                        Link      : {
                                                                     
                                                                    pathname : '/gallery/travel',
                                                                    myparams: {id : 1 , 
                                                                            AlbumName: 'Travel',
                                                                            DataArray : PlacesArray ,
                                                                            ImageList : ImageList ,
                                                                        }
                                                                    
                                                                    },
                                                    },
                                                    {
                                                        id        : 1,
                                                        AlbumName : "Animals",
                                                        CoverImage: "Gallery/Animals/Animals.jpg",
                                                        Link      : {
                                                                     
                                                            pathname : '/gallery/animals',
                                                            myparams: {id : 2 , 
                                                                    AlbumName: 'Animals',
                                                                    DataArray: AnimalsArray ,
                                                                }
                                                            
                                                            }
                                                    },
                                                    {
                                                        id        : 2,
                                                        AlbumName : "Nature",
                                                        CoverImage: "Gallery/Nature/Nature.jpg",
                                                        Link      : {
                                                                     
                                                            pathname : '/gallery/nature',
                                                            myparams: {id : 3 , 
                                                                    AlbumName: 'Travel'
                                                                }
                                                            
                                                            }
                                                    },
                                                    {
                                                        id        : 3,
                                                        AlbumName : "People",
                                                        CoverImage: "Gallery/People/People.jpg",
                                                        Link      : {
                                                                     
                                                            pathname : '/gallery/people',
                                                            myparams: {id : 4 , 
                                                                    AlbumName: 'People'
                                                                }
                                                            
                                                            }
                                                    },
                                                    {
                                                        id        : 4,
                                                        AlbumName : "Sports",
                                                        CoverImage: "Gallery/Sports/Sports.jpg",
                                                        Link      : {
                                                                     
                                                            pathname : '/gallery/sports',
                                                            myparams: {id :  5, 
                                                                    AlbumName: 'Sports'
                                                                }
                                                            
                                                            }

                                                    },
                                                    {
                                                        id        : 5,
                                                        AlbumName : "Portrait",
                                                        CoverImage: "Gallery/Portrait/Portrait.jpg",
                                                        Link      : {
                                                                     
                                                            pathname : '/gallery/portrait',
                                                            myparams: {id : 6 , 
                                                                    AlbumName: 'Portrait'
                                                                }
                                                            
                                                            }
                                                    },
                                                    {
                                                        id        : 6,
                                                        AlbumName : "Architecture",
                                                        CoverImage: "Gallery/Architecture/Architecture.jpg",
                                                        Link      : {
                                                                     
                                                            pathname : '/gallery/architecture',
                                                            myparams: {id : 7 , 
                                                                    AlbumName: 'Architecture'
                                                                }
                                                            
                                                            }
                                                    },
                                                ]
                                            )
     
    
    const handleOnClickForward = (e) => {

        const total_width = albumRef.current.scrollWidth ;
        // const windowWidth = window.innerWidth
        const imageWidth = total_width / AlbumList.length;
        // if (windowWidth <= 800) {
            // small device, one image per row
            albumRef.current.scrollLeft += imageWidth;
            if (albumRef.current.scrollLeft % imageWidth != 0){
                albumRef.current.scrollLeft = Math.ceil((albumRef.current.scrollLeft / imageWidth)) * imageWidth
            }
        // }

        console.log(imageWidth, albumRef.current.scrollLeft, total_width)
    }

    const handleOnClickBack = (e) => {
        
        const total_width = albumRef.current.scrollWidth ;
        const windowWidth = window.innerWidth
        const imageWidth = total_width / AlbumList.length;
        // if (windowWidth <= 800) {
            // small device, one image per row
            albumRef.current.scrollLeft -= imageWidth;
            if (albumRef.current.scrollLeft % imageWidth != 0){
                albumRef.current.scrollLeft = Math.ceil((albumRef.current.scrollLeft / imageWidth)) * imageWidth
            }
        // }

        // console.log(imageWidth , albumRef.current.scrollLeft, total_width)
    }


    function handleOnWheel(e){

        // console.log(state.reachRightEnd, state.previousValuesForScrollLeft0,
        //     state.previousValuesForScrollLeft1,state.previousValuesForScrollLeft2)

        if (e.deltaY < 0) {
            // scroll up 
            if(window.scrollY == 0) {
                e.preventDefault(); // disable parent scroll 
                
                albumRef.current.scrollLeft -= albumRef.current.scrollWidth * 0.02 ;
                // if (albumRef.current.scrollLeft <=0) {
                //     albumRef.current.scrollLeft = 0 ;
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
                albumRef.current.scrollLeft += albumRef.current.scrollWidth * 0.02;
                
                state.previousValuesForScrollLeft2 = state.previousValuesForScrollLeft1;
                state.previousValuesForScrollLeft1 = state.previousValuesForScrollLeft0;
                state.previousValuesForScrollLeft0 = albumRef.current.scrollLeft ;
                if (state.previousValuesForScrollLeft0 == state.previousValuesForScrollLeft1 &&
                    state.previousValuesForScrollLeft1 == state.previousValuesForScrollLeft2 && 
                    state.previousValuesForScrollLeft1 >  10
                    ){
                        state.reachRightEnd = 1 ;
                    }
            }
        }

        // console.log(albumRef.current.scrollLeft, albumRef.current.scrollWidth)
        

    }

    const addEventListener2Component = (e) => {
        albumRef.current.addEventListener('wheel', handleOnWheel)
    }
    
    const removeEventListenerFromComponent = () => {
        if (albumRef.current) {
            albumRef.current.removeEventListener('wheel',handleOnWheel)
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


    return (
        <div className='galleryRoot' 
            ref={albumRef}
        >
            {AlbumList.map(Album => (
                <div className='album' 
                    key={Album.id}
                >
                    <div className='imageWrapper'>
                        <img src={Album.CoverImage} />
                    </div>
                    <div className='albumNameWrapper'>
                        <p className='albumName'> {Album.AlbumName}</p>
                    </div>
                    <div className='clickForMoreWrapper'>
                        <Link className='clickForMore' to={Album.Link}> MORE PHOTOS </Link>
                    </div>
                 </div>   
            ))}

            <div className='arrowForwardIconWrapper' onClick={handleOnClickForward}> 
                <ArrowForwardIcon style={{ color: 'rgb(255,255,255)', fontSize: "20px" }} />
            </div>
            <div className='arrowBackIconWrapper' onClick={handleOnClickBack} > 
                <ArrowBackIcon style={{ color: 'rgb(255,255,255)', fontSize: "20px" }}  />
            </div>
        </div>
    )
}

export default Gallery
