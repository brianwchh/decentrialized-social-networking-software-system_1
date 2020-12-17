import React, {useRef} from 'react'
import './App.css'

import NavigationBar from './components/NavigationBar/NavigationBar'
import Footer from './components/Footer/Footer'
import Router from './components/Content/Router'
import { BrowserRouter } from 'react-router-dom';

function App() {

    
    
    return (
        <div className='appRoot'>
            <div className='navigationNcontent'>

                <BrowserRouter >

                        <div className='navigationWrapper'>
                            <NavigationBar />
                        </div>

                        <div 
                            className='contentWrapper'
                        >
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

export default App
