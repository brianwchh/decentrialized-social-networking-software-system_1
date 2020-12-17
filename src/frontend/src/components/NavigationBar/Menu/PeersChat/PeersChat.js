import React from 'react'
import './PeersChat.css'
import DropDown from '../sharedComponents/DropDown/DropDown'
import Item from '../sharedComponents/Item/Item'
import ExpandRight from '../sharedComponents/ExpandRight/ExpandRight'
import ExpandLeft from '../sharedComponents/ExpandLeft/ExpandLeft'


function PeersChat() {
    return (
        <div className='peersChatMenuRoot'>
            <DropDown menuName='PeersChat' style={{color:'black'}} to='/peerschat'>
                <div className='blog item'>
                    <Item style={{color:'white'}} to='/blog' itemName='blog'/>
                </div>
                <div className='home item'>
                    <Item style={{color:'white'}} to='/' itemName='home'/>
                </div>
                <div className='more item expand'>
                    <ExpandRight menuName='more' to='#'>
                        <div className='more1 item'>
                            <Item style={{color:'white'}} to='/#' itemName='more1'/>
                        </div>
                        <div className='more2 item'>
                            <Item style={{color:'white'}} to='/#' itemName='more2'/>
                        </div>
                        <div className='more1 item'>
                            <Item style={{color:'white'}} to='/#' itemName='more3'/>
                        </div>
                        <div className='more2 item'>
                            <Item style={{color:'white'}} to='/#' itemName='more4'/>
                        </div>
                        <div className='moremore item expand'>
                            <ExpandLeft  menuName='moreMore' to='#'>
                                <div className='moremore1 item'>
                                    <Item style={{color:'white'}} to='/#' itemName='moremore1'/>
                                </div>
                                <div className='moremore2 item'>
                                    <Item style={{color:'white'}} to='/#' itemName='moremore12'/>
                                </div>
                            </ExpandLeft>
                        </div>
                    </ExpandRight>
                </div>
            </DropDown>
        </div>
    )
}

export default PeersChat

{/* <div className='travel item'>
    <Item style={{color:'white'}} to='/gallery/travel' itemName='Travel'/>
</div>
<div className='portrait item'>
    <Item style={{color:'white'}} to='/gallery/portrait' itemName='Portrait'/>
</div>
<div className='people item'>
    <Item style={{color:'white'}} to='/gallery/people' itemName='People'/>
</div>
<div className='architecture item'>
    <Item style={{color:'white'}} to='/gallery/architecture' itemName='Architecture'/>
</div>
<div className='animals item'>
    <Item style={{color:'white'}} to='/gallery/animals' itemName='Animals'/>
</div>
<div className='nature item'>
    <Item style={{color:'white'}} to='/gallery/nature' itemName='Nature'/>
</div>
<div className='sports item'>
    <Item style={{color:'white'}} to='/gallery/sports' itemName='Sports'/>
</div> */}