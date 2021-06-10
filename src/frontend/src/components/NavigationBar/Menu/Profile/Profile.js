import React,{useState, useEffect} from 'react'
import './Profile.css'

import Item from '../sharedComponents/Item/Item'
import DropDown from '../sharedComponents/DropDown/DropDown'
import * as actionTypes from '../../../../store/auth/actionTypes'
import { connect } from 'react-redux';
import { 
    authCheckTokenVaidAction,
    authLogoutAction
    } from '../../../../store/auth/actions'

import {
    destroyWebsocketAction
        } from '../../../../store/websocket/actions'

function Profile(props) {

    const handleLogout = (e) => {
        e.preventDefault();
        props.authLogoutAction();
    }

    let children = '' ;


    // useEffect(() => {
        
    //     alert(`loginStatus in profile ${props.loginStatus} ---in useEffect`)
        
    //     return () => {
            
    //     }
    // }, [props.loginStatus])


    if (props.loginStatus === actionTypes.LOGIN_STATUS_SUCCEED) {
        children = (<DropDown menuName='Account' style={{color:'black'}} to='#'> 
                        <div className='logout item' onClick={(e)=>{handleLogout(e)}}>
                            <Item style={{color:'white'}} to='/profile/login' itemName='logout'/>
                        </div>
                    </DropDown>)
    } else {
        children = (<DropDown menuName='Account' style={{color:'black'}} to='#'> 
                        <div className='login item'>
                            <Item style={{color:'white'}} to='/profile/login' itemName='login'/>
                        </div>
                        <div className='register item'>
                            <Item style={{color:'white'}} to='/profile/register' itemName='registration'/>
                        </div>
                    </DropDown>)
    }

    return (
        <div className='profileMenuRoot'>
            {children}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loginStatus: state.auth.status,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        authCheckTokenVaidAction: () => dispatch(authCheckTokenVaidAction()),
        authLogoutAction: () => dispatch(authLogoutAction()),
    };
  };

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (Profile)