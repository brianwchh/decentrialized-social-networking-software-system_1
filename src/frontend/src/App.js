import React, {useRef,useEffect,useState} from 'react'
import './App.css'

import NavigationBar from './components/NavigationBar/NavigationBar'
import Footer from './components/Footer/Footer'
import Router from './components/Content/Router'
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    authCheckTokenVaidAction
} from './store/auth/actions'

function App(props) {

    const [scrollDirectionUp,setScrollDirectionUp] = useState(false)

    useEffect(() => {
        window.lastScrollTop = 0 ;
        window.addEventListener("scroll", function dectectScrollDirection() {
            const st = window.pageYOffset || document.documentElement.scrollTop 
            if (st > window.lastScrollTop){
                // scroll down
                setScrollDirectionUp(false)
            } else {
                //scroll up
                setScrollDirectionUp(true)
            }
            window.lastScrollTop = st <= 0 ? 0 : st ; // for mobile or negative scrolling
        },false)

        props.authCheckTokenVaidAction()

        return () => {
            
        }
    }, [])

    return (

        <div className='appRoot'>
            <div className='navigationNcontent'>

                <BrowserRouter >

                    <div className='navigationWrapper' style={{position : props.isExpandMenu == true || scrollDirectionUp == true ? "fixed" : "relative" }}>
                        <NavigationBar />
                    </div>

                    <div className='contentWrapper' style={{paddingTop: props.isExpandMenu == true || scrollDirectionUp == true? "50px" : "0px"}}>
                        <Router />
                    </div>

                </BrowserRouter >

            </div>
            
            <div className='footerWrapper'>
                <Footer />
            </div>

        </div>
        
    )
}


const mapStateToProps = state => {
    return {
        isExpandMenu: state.websocket.isExpandMenu,  // 與peersChat有關的信號
        loginStatus : state.auth.status
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
        authCheckTokenVaidAction : () => dispatch(authCheckTokenVaidAction())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (App)

