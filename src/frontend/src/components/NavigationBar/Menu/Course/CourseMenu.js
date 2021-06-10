import React from 'react'
import './CourseMenu.css'
import DropDown from '../sharedComponents/DropDown/DropDown'
import Item from '../sharedComponents/Item/Item'
import ExpandRight from '../sharedComponents/ExpandRight/ExpandRight'



function CourseMenu() {
    return (
        <div className='CourseMenuRoot'>
            <DropDown menuName='Courses' style={{color:'black'}} to='/course'>
                <div className='expand item'>
                    <ExpandRight menuName='IT' style={{color:'white'}} to='/course'>
                        <div className='blog item'>
                            <Item style={{color:'white'}} to='/course' itemName='Javacript'/>
                        </div>
                        <div className='newblog item'>
                            <Item style={{color:'white'}} to='/course' itemName='C Language'/>
                        </div>
                        <div className='newblog item'>
                            <Item style={{color:'white'}} to='/course' itemName='Python'/>
                        </div>
                    </ExpandRight>
                </div>
                <div className='expand item'>
                    <ExpandRight menuName='robotics' style={{color:'white'}} to='/course'>
                        <div className='blog item'>
                            <Item style={{color:'white'}} to='/course' itemName='slam'/>
                        </div>
                        <div className='newblog item'>
                            <Item style={{color:'white'}} to='/course' itemName='visual slam'/>
                        </div>
                        <div className='newblog item'>
                            <Item style={{color:'white'}} to='/course' itemName='VR'/>
                        </div>
                        <div className='newblog item'>
                            <Item style={{color:'white'}} to='/course' itemName='AR'/>
                        </div>
                    </ExpandRight>
                </div>
                <div className='expand item'>
                    <ExpandRight menuName='美術設計' style={{color:'white'}} to='/course'>
                        <div className='blog item'>
                            <Item style={{color:'white'}} to='/course' itemName='素描'/>
                        </div>
                        <div className='blog item'>
                            <Item style={{color:'white'}} to='/course' itemName='山水'/>
                        </div>
                        <div className='blog item'>
                            <Item style={{color:'white'}} to='/course' itemName='花鳥'/>
                        </div>
                    </ExpandRight>
                </div>
                <div className='blog item'>
                    <Item style={{color:'white'}} to='/course' itemName='音樂'/>
                </div>
            </DropDown>
        </div>
    )
}

export default CourseMenu
