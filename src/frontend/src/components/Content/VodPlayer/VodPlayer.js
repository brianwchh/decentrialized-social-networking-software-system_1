import React ,{useEffect,useState,useRef} from 'react'
import Hls from 'hls.js'
import './VodPlayer.css'

function VodPlayer(props) {

    const videoRef = useRef();
    const playerWrapperRef = useRef(null)
    const [playerWidth,setPlayerWidth] = useState(200)
    const [playerHeight,setPlayerHeight] = useState(200)

    useEffect(() => {

        setPlayerWidth(playerWrapperRef.current.clientWidth) ;
        setPlayerHeight(playerWrapperRef.current.clientHeight);
        
        // on component creaction
        // const m3u8url = 'http://localhost:3000/hls/sample1_360p.m3u8';
        // const m3u8url = props.m3u8url ;
        const m3u8url = 'https://decensormedia.org/hls/sample1_360p.m3u8'

        const Hls_config = {
            autoStartLoad: true,
            startPosition: -1,
            debug: false,
            capLevelOnFPSDrop: false,
            capLevelToPlayerSize: false,
            defaultAudioCodec: undefined,
            initialLiveManifestSize: 1,
            maxBufferLength: 30,
            maxMaxBufferLength: 600,
            maxBufferSize: 60 * 1000 * 1000,
            maxBufferHole: 0.5,
            highBufferWatchdogPeriod: 2,
            nudgeOffset: 0.1,
            nudgeMaxRetry: 3,
            maxFragLookUpTolerance: 0.25,
            liveSyncDurationCount: 3,
            liveMaxLatencyDurationCount: Infinity,
            liveDurationInfinity: false,
            liveBackBufferLength: Infinity,
            enableWorker: true,
            enableSoftwareAES: true,
            manifestLoadingTimeOut: 10000,
            manifestLoadingMaxRetry: 1,
            manifestLoadingRetryDelay: 1000,
            manifestLoadingMaxRetryTimeout: 64000,
            startLevel: undefined,
            levelLoadingTimeOut: 10000,
            levelLoadingMaxRetry: 4,
            levelLoadingRetryDelay: 1000,
            levelLoadingMaxRetryTimeout: 64000,
            fragLoadingTimeOut: 20000,
            fragLoadingMaxRetry: 6,
            fragLoadingRetryDelay: 1000,
            fragLoadingMaxRetryTimeout: 64000,
            startFragPrefetch: false,
            testBandwidth: true,
            progressive: false,
            lowLatencyMode: true,
            fpsDroppedMonitoringPeriod: 5000,
            fpsDroppedMonitoringThreshold: 0.2,
            appendErrorMaxRetry: 3,
            // loader: customLoader,
            // fLoader: customFragmentLoader,
            // pLoader: customPlaylistLoader,
            // xhrSetup: XMLHttpRequestSetupCallback,
            // fetchSetup: FetchSetupCallback,
            // abrController: AbrController,
            // bufferController: BufferController,
            // capLevelController: CapLevelController,
            // fpsController: FPSController,
            // timelineController: TimelineController,
            enableWebVTT: true,
            enableIMSC1: true,
            enableCEA708Captions: true,
            stretchShortVideoTrack: false,
            maxAudioFramesDrift: 1,
            forceKeyFrameOnDiscontinuity: true,
            abrEwmaFastLive: 3.0,
            abrEwmaSlowLive: 9.0,
            abrEwmaFastVoD: 3.0,
            abrEwmaSlowVoD: 9.0,
            abrEwmaDefaultEstimate: 500000,
            abrBandWidthFactor: 0.95,
            abrBandWidthUpFactor: 0.7,
            abrMaxWithRealBitrate: false,
            maxStarvationDelay: 4,
            maxLoadingDelay: 4,
            minAutoBitrate: 0,
            emeEnabled: false,
            widevineLicenseUrl: undefined,
            drmSystemOptions: {},
            // requestMediaKeySystemAccessFunc: requestMediaKeySystemAccess,
        };
        
        let hls = '';
        
        // step 1, see if supported 
        if (Hls.isSupported()){

        console.log('hello hls.js')
        hls = new Hls(Hls_config);

        // step 2, bind Hls instance with video element
        hls.detachMedia();
        hls.attachMedia(videoRef.current)
        // MEDIA_ATTACHED event is fired by hls object once MediaSource is ready
        hls.on(Hls.Events.MEDIA_ATTACHED, () => {
            console.log('video and hls.js are now bound together !');
            // step 3, load a manifest 
            hls.loadSource(m3u8url);
            hls.on(Hls.Events.FRAG_PARSED, (event, data)=>{
            // console.log(`manifest loaded, found ${hls.levels.length} quality level`)
            // console.log(data)
            // step 4. play 
            videoRef.current.play();
            })
            // step 5. error handling 
            hls.on(Hls.Events.ERROR, function (event, data) {
            if (data.fatal) {
                switch (data.type) {
                case Hls.ErrorTypes.NETWORK_ERROR:
                    // try to recover network error
                    console.log('fatal network error encountered, try to recover');
                    hls.startLoad();
                    break;
                case Hls.ErrorTypes.MEDIA_ERROR:
                    console.log('fatal media error encountered, try to recover');
                    hls.recoverMediaError();
                    break;
                default:
                    // cannot recover
                    hls.destroy();
                    break;
                }
            }
            });

            // hls.on(Hls.Events.)
        })
        

        } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')){
        videoRef.current.src = m3u8url ;
        } else {
        alert('please use a modern browser to play the video')
        }

        // make player window size fully responsive 
        const updatePlayerSize = () => {

            setPlayerWidth(playerWrapperRef.current.clientWidth) ;
            setPlayerHeight(playerWrapperRef.current.clientHeight);

        }
        
        window.addEventListener('resize', updatePlayerSize)


        return () => {

            window.removeEventListener('resize', updatePlayerSize)

            if (hls){
                hls.destroy();
            }
        }
    }, [])
    

    return (
        <div  className='vodPlayerRoot' ref={playerWrapperRef}>
                <video 
                    className='videoPlayer'
                    controls = {props.controls}
                    preload = 'auto'
                    ref={videoRef}
                    width={playerWidth}
                    height={playerHeight}
                    autoPlay = {props.autoPlay}
                />
        </div>
    )
}

export default VodPlayer



