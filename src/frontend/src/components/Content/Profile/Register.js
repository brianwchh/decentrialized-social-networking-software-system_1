import React, { useState } from 'react'
import './Register.css'
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import {config_json} from '../../../global_config'
import {userEndPoint} from '../../../ipconfig'
import axios from "axios";
import getSafeProperty from '../../../utility/getSafeProperty'
import handleError from '../../../utility/handleError';

function Register(props) {

    const [User,setUser] = useState({userName: '',
                                     email: '',
                                     password: '',
                                     passwordRepeat: '',
                                     isSuper: false
                                    })

    const handleOnSubmitForm = (e) => {
        e.preventDefault()

        if (User.userName ==='' ||
            User.email ==='' ||
            User.password === '' ||
            User.passwordRepeat === ''
        ) {
            alert('null input detected')
            return ;
        }

        if (User.password !== User.passwordRepeat) {
            alert('password not equal to passwordRepeat !')
            return ;
        }

        // props.register(User.userName,User.email,User.password, User.passwordRepeat,User.isSuper)

        const formDataObj = {
            username : User.userName ,
            email : User.email,
            password : User.password,
            repeat_password: User.passwordRepeat,
            isSuper: User.isSuper
        }
        
        axios
            .post(`${userEndPoint}/?action=registration`,
                    JSON.stringify(formDataObj),
                    config_json  
                )
            .then( res => {

                console.log(res)
                const isSuccess = getSafeProperty(()=>res.data.isSuccess, undefined)
                if (isSuccess === true){
                    props.history.push('/profile/login')
                }
            })
            .catch(error => {
                handleError(error,'Register.js','handleOnSubmitForm')
            })

    }

    const handleOnChange = (e) => {
        e.preventDefault()
        const name = e.target.name ;
        const value = e.target.value ;
        setUser( {...User , ...{[name] : value}})
    }

    return (
        <div className='registerRoot'>
            <form className='form' onSubmit={handleOnSubmitForm} autoComplete="off">
                <p className='registerName'>
                    <span>注冊</span>
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
                                placeholder='請輸入名字'
                                onChange = {handleOnChange}
                            /> 
                        </div>

                        <div className='wrapper'>
                            <div className='iconWrapper'>
                                <EmailIcon style={{ color: 'green', fontSize: "35px" }} />
                            </div>
                            <input 
                                type='email' 
                                value={User.email} 
                                name='email' 
                                placeholder='請輸入電郵'
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

                        <div className='wrapper'>
                            <div className='iconWrapper'>
                                <LockIcon style={{ color: 'green', fontSize: "35px" }} />
                            </div>
                            <input 
                                type='password' 
                                value={User.passwordRepeat} 
                                name='passwordRepeat' 
                                placeholder='確認密碼'
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


export default Register;