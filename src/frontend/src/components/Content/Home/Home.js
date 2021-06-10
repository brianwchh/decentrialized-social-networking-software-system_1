import React, {useState,useCallback,useEffect,useRef} from 'react'
import './Home.css'
import CheckIcon from '@material-ui/icons/Check';
import VodPlayer from '../VodPlayer/VodPlayer'

function Home(props) {

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
  
    let videoPlayerWindow = ''

    if (playVideo === true) {

        console.log("re-rendering .... ")
        console.log(playerHeight,"  ", window.playerWidth)

        videoPlayerWindow = (
                                <div className='imageWrapper' 
                                    ref={playerWrapperRef}
                                    key = {keyCnt}
                                >
                                    <VodPlayer 
                                        m3u8url = 'http://localhost:3000/hls/sample1_360p.m3u8' 
                                        controls= {true}
                                        autoPlay = {true}
                                        
                                    />
                                </div>
                            )
    } else {
        
        videoPlayerWindow = (
                                <div className='imageWrapper' ref={playerWrapperRef}>
                                    <p className="banFromSocialMedia">Ban Trump from social media :) LOL</p>
                                    <div className='image'>
                                        <img 
                                            src="Home/banTrump.png" 
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
        <div className='Home'>

            <div className='Banner'>
                <div className="imageWrapper">
                    <img src='/Home/banner.jpg' alt='' />
                </div>
                <div className="textArea">
                    <p className='header1'>
                        <span>SOCIAL MEDIA REVOLUTION</span>
                    </p>
                    <p className='header2'>
                        <span>replace social media apps with your own website</span>
                    </p>

                    <div className="bulletPoint firstRow">
                        <div className="iconWrapper">
                            <CheckIcon style={{ color: 'whitesmoke', fontSize: "20px" }} />
                        </div>
                        <p className="buletText">
                            <span>peer to peer communication & encryption</span>
                        </p>
                    </div>
                    <div className="bulletPoint ">
                        <div className="iconWrapper">
                            <CheckIcon style={{ color: 'whitesmoke', fontSize: "20px" }} />
                        </div>
                        <p className="buletText">
                            <span>store privacy at home</span>
                        </p>
                    </div>
                    <div className="bulletPoint">
                        <div className="iconWrapper">
                            <CheckIcon style={{ color: 'whitesmoke', fontSize: "20px" }} />
                        </div>
                        <p className="buletText">
                        <span className="emphas" >NO</span> <span>Censorship</span>
                        </p>
                    </div>
                    <div className="bulletPoint">
                        <div className="iconWrapper">
                            <CheckIcon style={{ color: 'whitesmoke', fontSize: "20px" }} />
                        </div>
                        <p className="buletText">
                            <span className="emphas">NO</span> <span>data collection</span>
                        </p>
                    </div>
                    <div className="bulletPoint ">
                        <div className="iconWrapper">
                            <CheckIcon style={{ color: 'whitesmoke', fontSize: "20px" }} />
                        </div>
                        <p className="buletText">
                            <span className="emphas" >decentralized </span> <span>as human nature</span>
                        </p>
                    </div>
                    <div className="bulletPoint ">
                        <div className="iconWrapper">
                            <CheckIcon style={{ color: 'whitesmoke', fontSize: "20px" }} />
                        </div>
                        <p className="buletText">
                            <span>your website, your garden, your business, your kingdom</span>
                        </p>
                    </div>
                    <div className="bulletPoint ">
                        <div className="iconWrapper">
                            <CheckIcon style={{ color: 'whitesmoke', fontSize: "20px" }} />
                        </div>
                        <p className="buletText">
                            <span>we teach you how to build such open system</span>
                        </p>
                    </div>

                    <div className="click2Watch">
                            watch video
                    </div>

                </div>
            </div> 

            {/* social media pig */}
            <div className='socialMeidaPig' >
                <div className="left">
                    <img src='/Home/pig.jpg' alt='' />
                </div>
                <div className="right">
                    <div className="textContainer">
                        <p className="header1">
                            <span>We give pig free food for their meat</span>
                        </p>
                        <p className="header1">
                            <span>Big-tech companies give us free social media for </span>
                        </p>
                        <p className="header1">
                            <span>our privacy, control, money ... </span>
                        </p>
                        <p className="header2 header2-1">
                            <span>there is no free meal</span>
                        </p>
                        <p className="header2">
                            <span style={{color: 'red'}}>freedom is never free</span>
                        </p>
                        <p className="header2 header2-2">
                            <span>spend more time with our own</span>
                        </p>
                        <p className="header2">
                            <span>websites</span>
                        </p>
                        <p className="header2">
                            <span>it brings us real gold</span>
                        </p>
                    </div>
                    <div className="imageWrapper">
                        {/* <img src='/Home/warren-wong-kMRMcUcO81M-unsplash.jpg' alt='' /> */}
                    </div>
                </div>
            </div>

            {/* what is good about this ecosystem */}
            <div className="ecosystem">
                <div className="imageWrapperMain">
                    <img src='/Home/randy-tarampi-U2eUlPEKIgU-unsplash.jpg' alt='' />
                </div>
                <p className="header1">
                    <span>Business opportunity for all</span>
                </p>
                <div className="websiteOwner">
                    <p className="top">website owner</p>
                    <div className='contentWrapper'>
                        <div className="imageWrapper">
                            {/* <img src='/Home/johan-godinez-dDYRYivNzbI-unsplash.jpg' alt='' /> */}
                        </div>

                        <div className="bulletPoint ">
                            <div className="iconWrapper">
                                <CheckIcon style={{ color: 'whitesmoke', fontSize: "15px" }} />
                            </div>
                            <p className="buletText">
                                <span>with talent,for instance,exellent blogs, or videos, you can bring feeds to your website, no platform takes the major income of the advertisement from you.</span>
                            </p>
                        </div>
                        <div className="bulletPoint ">
                            <div className="iconWrapper">
                                <CheckIcon style={{ color: 'whitesmoke', fontSize: "15px" }} />
                            </div>
                            <p className="buletText">
                                <span>run your onw ecommerce website,the more connections you have,the more opportunity you have,besides your connection is one of the source,you can also do SEO promotion as normal webstie does</span>
                            </p>
                        </div>
                        <div className="bulletPoint ">
                            <div className="iconWrapper">
                                <CheckIcon style={{ color: 'whitesmoke', fontSize: "15px" }} />
                            </div>
                            <p className="buletText">
                                <span>there are many more opportunities for you to start from small business</span>
                            </p>
                        </div>
                        <div className="bulletPoint ">
                            <div className="iconWrapper">
                                <CheckIcon style={{ color: 'whitesmoke', fontSize: "15px" }} />
                            </div>
                            <p className="buletText">
                                <span>no longer be a pig on any platform</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="webDesigner">
                    <p className="top">web developer</p>
                    <div className='contentWrapper'>
                        <div className="imageWrapper">
                            {/* <img src='/Home/markus-spiske-1LLh8k2_YFk-unsplash.jpg' alt='' /> */}
                        </div>
                        <div className="bulletPoint ">
                            <div className="iconWrapper">
                                <CheckIcon style={{ color: 'whitesmoke', fontSize: "15px" }} />
                            </div>
                            <p className="buletText">
                                <span>more job opportunities, everyone around you is your potential customer</span>
                            </p>
                        </div>
                        <div className="bulletPoint ">
                            <div className="iconWrapper">
                                <CheckIcon style={{ color: 'whitesmoke', fontSize: "15px" }} />
                            </div>
                            <p className="buletText">
                                <span>provide peer to peer encryption solution</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className='vpsProvider'>
                    <p className="top">VPS provider</p>
                    <div className='contentWrapper'>
                        <div className="imageWrapper">
                            {/* <img src='/Home/nathan-anderson-xV3CHzfhkjE-unsplash.jpg' alt='' /> */}
                        </div>
                        <div className="bulletPoint ">
                            <div className="iconWrapper">
                                <CheckIcon style={{ color: 'whitesmoke', fontSize: "15px" }} />
                            </div>
                            <p className="buletText">
                                <span>VPS(virtual private server) will embrace great opportunities (ps: in layman's term, server is just another name for computer without display)</span>
                            </p>
                        </div>
                        <div className="bulletPoint ">
                            <div className="iconWrapper">
                                <CheckIcon style={{ color: 'whitesmoke', fontSize: "15px" }} />
                            </div>
                            <p className="buletText">
                                <span>micro cloud data center and home data center will be all over the place</span>
                            </p>
                        </div>
                    </div>
                </div>
                <p className="future">
                    <span>Everyone will have a website, just like 20 years ago people believe everyone would have at least one computer</span>
                </p>
                <div className="flower">
                    <img src='/Home/marc-schulte-Xxf_Hsq62lA-unsplash.jpg' alt='' />
                </div>
            </div>
        
            {/*******************   comparison ************************************/}
            <div className="comparison">
                <div className="topBar">
                    <div className="centralized">
                        <span>centralized social media</span>
                    </div>
                    <p className="vs">VS</p>
                    <div className="decentralized">
                        <span>decentralized website ecosystem</span>
                    </div>
                </div>

                <div className="imageWrapper-centralized">
                    <img src="Home/centralized_system.png" alt="" />
                </div>

                <div className="contentWrapper1">
                    <div className="contentTopBar">
                        <p><span>Centralized social media</span> <span style={{color:'red'}}>Cons</span></p>
                    </div>
                    <div className="bulletPoint ">
                        <div className="iconWrapper">
                            <CheckIcon style={{ color: 'rgb(192, 166, 20)', fontSize: "25px" }} />
                        </div>
                        <p className="buletText">
                            <span>as shown above, all user data has to go thru the central data center before reaching your peer</span>
                        </p>
                    </div>
                    <div className="bulletPoint ">
                        <div className="iconWrapper">
                            <CheckIcon style={{ color: 'rgb(192, 166, 20)', fontSize: "25px" }} />
                        </div>
                        <p className="buletText">
                            <span>user privacy has to be stored in social media company's central data base, so privacy is not guaranteed, they know what you know, but you don't know what they know</span>
                        </p>
                    </div>
                    <div className="bulletPoint ">
                        <div className="iconWrapper">
                            <CheckIcon style={{ color: 'rgb(192, 166, 20)', fontSize: "25px" }} />
                        </div>
                        <p className="buletText">
                            <span>AI may collect and analyze your data, and predict your behavior based on the data you have submitted to their database volutarily, that's why you receive so many advertisement that appeels to you</span>
                        </p>
                    </div>
                    <div className="bulletPoint ">
                        <div className="iconWrapper">
                            <CheckIcon style={{ color: 'rgb(192, 166, 20)', fontSize: "25px" }} />
                        </div>
                        <p className="buletText">
                            <span>are you so enjoying having private conversation in some rich guy's room that is free of rental?</span>
                        </p>
                    </div>
                </div>

                <div className="contentWrapper2">
                    <div className="contentTopBar">
                        <p><span>DeCentralized social media</span> <span style={{color: 'greenyellow'}}>Pros</span></p>
                    </div>

                    <div className="bulletPoint ">
                        <div className="iconWrapper">
                            <CheckIcon style={{ color: 'rgba(116, 115, 112, 0.8)', fontSize: "25px" }} />
                        </div>
                        <p className="buletText">
                            <span>as shown in below diagram, the connection is fully peer to peer, just like you knock on someone's door directly, no middleman is needed for passing your conversation back and forth</span>
                        </p>
                    </div>

                    <div className="bulletPoint ">
                        <div className="iconWrapper">
                            <CheckIcon style={{ color: 'rgba(116, 115, 112, 0.8)', fontSize: "25px" }} />
                        </div>
                        <p className="buletText">
                            <span>you own everything, the private cloud server and home server, so no one can easily collect your data, privacy is guaranteed</span>
                        </p>
                    </div>

                    <div className="bulletPoint ">
                        <div className="iconWrapper">
                            <CheckIcon style={{ color: 'rgba(116, 115, 112, 0.8)', fontSize: "25px" }} />
                        </div>
                        <p className="buletText">
                            <span>front end server is served as front gate to your home,by which people can find you with your public IP address, private data is stored at home server,if you are concerned about the security of cloud server, which you can't see every day</span>
                        </p>
                    </div>
                    
                </div>

                <div className="imageWrapper-decentralized">
                    <img src="Home/decentralized.png" alt="" />
                </div>

            </div>
        
            <div className="videoPlayerWrapper">
                <div className="playerWrapper">
                    {videoPlayerWindow}
                </div>
                <div className="contentWrapper">
                    <p className="header1">
                        <span>DeCensorship</span> <span style={{color: 'red'}}>&</span> <span>DeCentralization</span>
                    </p>
                    <p className="vodDemoNotes">
                        <span>PS: for Video On Demand demostration purpose</span>
                    </p>
                </div>
            </div>

        </div>
    )
}

export default Home
