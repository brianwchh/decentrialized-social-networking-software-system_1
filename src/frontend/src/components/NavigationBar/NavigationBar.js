import React from 'react'
import './NavigationBar.css'
import Logo from './Logo/Logo'
import Menu from './Menu/Menu'

function NavigationBar() {
    return (
        <div className='navigationBarRoot'>
            <input className='ckeckbox' type='checkbox' id='checkBoxForMenuTag' />
            <div className='logoWrapper'>
                <Logo  for='checkBoxForMenuTag'/>
            </div>
            <div className='menuWrapper'>
                <Menu />
            </div>
        </div>
    )
}

export default NavigationBar



