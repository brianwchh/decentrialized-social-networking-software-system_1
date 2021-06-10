import React,{useState,useEffect} from 'react'
import axios from "axios";
import {subscriptionENdPoint} from '../../../ipconfig'

import './NewSubscription.css'
import handleError from '../../../utility/handleError.js'

import getSafeProperty from '../../../utility/getSafeProperty'

const fileName =  "NewSubscription.js"


function NewSubscription(props) {

    const [api_url,setApi_url] = useState()

    const handleOnSubmitForm = (e) => {

        e.preventDefault()

        const functionName = "handleOnSubmitForm"

        const token = localStorage.getItem('token')

        const config = {
            params: {
                token: token
            },
            headers : {
                'Content-Type': 'application/json', 
            }
        }

        const formDataObj = {
            api_url : api_url,
        }

        axios 
        .post(subscriptionENdPoint,
            JSON.stringify(formDataObj),
            config
        )
        .then(res => {
            console.log(res)
            if (res.data.isSuccess === true) {
                props.history.push('/subscription')
            }
        })
        .catch (error => {
            handleError(error,fileName,functionName)
        })

    }

    const handleOnChange = (e) => {
        e.preventDefault()
        const name = e.target.name ;
        const value = e.target.value ;
        setApi_url(value)
    }

    return (
        <div className='newSubscriptionRoot'>
            <form className='form' onSubmit={handleOnSubmitForm} autoComplete="off">

                <div className='inputWrapper'>
                    <input 
                        type='text' 
                        value={api_url} 
                        name='api_url' 
                        placeholder='please input the api_url'
                        onChange = {handleOnChange}
                    /> 
                </div>

                <div className='submit'>
                    <input type='submit' value='submit' />
                </div>
            </form>
        </div>
    )
}



export default NewSubscription
