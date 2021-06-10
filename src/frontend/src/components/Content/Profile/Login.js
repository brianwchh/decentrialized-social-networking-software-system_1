import React, { useState , useEffect} from 'react'
import './Login.css'
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/auth/actionTypes'
import {
    authLoginAction
    } from './../../../store/auth/actions'


function Login(props) {

    const [User,setUser] = useState({userName: '',
                                     password: '',
                                    })

    const handleOnSubmitForm = (e) => {
        const functionName = "handleOnSubmitForm"

        e.preventDefault()
        if (!User.userName  ||
            !User.password 
        ) {
            alert('null input detected')
            return ;
        }

        props.authLoginAction(User.userName,User.password)

    }

    const handleOnChange = (e) => {
        e.preventDefault()
        const name = e.target.name ;
        const value = e.target.value ;
        setUser( {...User , ...{[name] : value}})
    }

    useEffect(() => {
        
        if(props.loginStatus === actionTypes.LOGIN_STATUS_SUCCEED){
            props.history.push("/")
        }

        return () => {
            
        }
    }, [props.loginStatus])

    return (
        <div className='loginRoot'>
            <form className='form' onSubmit={handleOnSubmitForm} autoComplete="off">
                <p className='registerName'>
                    <span>登入</span>
                </p>

                <div className='formInputWrapper'>
                    
                    <div className='formInput'>
                        <div className='wrapper'>
                            <div className='iconWrapper'>
                                <AccountBoxIcon style={{ color: 'green', fontSize: "35px" }} />
                            </div>
                            <input 
                                type='text' 
                                value={User.userName} 
                                name='userName' 
                                placeholder='請輸入用戶名或電郵'
                                onChange = {handleOnChange}
                            /> 
                        </div>

                        <div className='wrapper'>
                            <div className='iconWrapper'>
                                <LockIcon style={{ color: 'green', fontSize: "35px" }} />
                            </div>
                            <input 
                                type='password' 
                                value={User.password} 
                                name='password' 
                                placeholder='請輸入密碼'
                                onChange = {handleOnChange}
                            /> 
                        </div>

                    </div>

                </div>

                <div className='submit'>
                    <input type='submit' value='提交' />
                </div>
            </form>
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
        authLoginAction : (userName,password) => dispatch(authLoginAction(userName,password))
    };
  };

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (Login)