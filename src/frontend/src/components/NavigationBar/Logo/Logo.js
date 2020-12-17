import React from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import './Logo.css'

function Logo(props) {
    return (
        <div className="logoRoot">
                <div className="spanWrapper">
                    <span className="First" style={{color:"black"}}>De</span>
                    <span style={{color:"red"}}>Censor</span>
                    <span style={{color:"black"}}>Media</span>
                </div>
                <label className="menuTag" htmlFor={props.for}> 
                    <MenuIcon fontSize='large' />
                </label>
        </div>
    )
}

export default Logo
