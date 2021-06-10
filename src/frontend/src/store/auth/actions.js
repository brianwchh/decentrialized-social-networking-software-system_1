import axios from "axios";
import * as actionTypes from './actionTypes'
import {
        userEndPoint,
        } from "../../ipconfig"
import {config_json} from '../../global_config'
import getSafeProperty from '../../utility/getSafeProperty'
import getSafePropertyWithAlert from '../../utility/getSafePropertyWithAlert'
import handleError from '../../utility/handleError'
import {me} from '../../components/NavigationBar/Menu/PeersChatMenu/websocket/globalVar'

const fileName = "auth/actions.js"

const authSetLoginStatus = (status) => {

    return {
        type: actionTypes.AUTH_SET_LOGIN_STATUS ,
        data: {
            status: status,
        }
    };
}


const authSaveMyUserName = (name,userID,userImage) => {
    return {
        type: actionTypes.AUTH_SAVE_MY_USERNAME ,
        data: {
            myUserName: name,
            userID    : userID,
            userImage : userImage   
        }
    }; 
}


export const authCheckTokenVaidAction = () => {

    const functionName = "authCheckTokenVaidAction"

    return dispatch => {

        const token = localStorage.getItem('token')

        if (!token) {
            return ;
        }


        const formDataObj = {

        }

        axios
            .post(`${userEndPoint}/?action=validate&token=${token}`,
                                        JSON.stringify(formDataObj),
                                        config_json  
                                        )
            .then( res => {
             
                const isValid = getSafeProperty(()=>res.data.isValid, undefined)

                if ( isValid === true) {

                    const myUserName = getSafePropertyWithAlert(()=>res.data.querySet[0].username,fileName,functionName,"")
                    const myUserID = getSafePropertyWithAlert(()=>res.data.querySet[0].userID,fileName,functionName,"")
                    const userImage = getSafePropertyWithAlert(()=>res.data.querySet[0].userImage,fileName,functionName,"")
                    
                    dispatch(authSaveMyUserName(myUserName,myUserID,userImage))       // 注意出場順序，little bug
                    me.myUserID = myUserID
                    me.myUserName = myUserName
                    me.userImage = userImage
                    dispatch(authSetLoginStatus(actionTypes.LOGIN_STATUS_SUCCEED))

                } else {
                    dispatch(authSetLoginStatus(actionTypes.LOGIN_STATUS_LOGOUT))
                }
            })
            .catch (error => {
                localStorage.removeItem('token')
                handleError(error,fileName,functionName)
                dispatch(authSetLoginStatus(actionTypes.LOGIN_STATUS_LOGOUT)) 
            })
    }
}


export const authLogoutAction = () => {
    const functionName = "authLogoutAction"

    return dispatch => {

        const token = localStorage.getItem('token');

        console.log(token)

        if (!token) {
            dispatch(authSetLoginStatus(actionTypes.LOGIN_STATUS_LOGOUT))
            return ;
        }

        const formDataObj = {

        }

        axios
            .post(`${userEndPoint}/?action=logout&token=${token}`,
                        JSON.stringify(formDataObj),
                        config_json  
                        )
            .then( res => {
                
                    localStorage.removeItem('token')
                    me.myUserID = null
                    me.myUserName = null
                    me.userImage = null 

                    dispatch(authSaveMyUserName(null,null,null))
                    dispatch(authSetLoginStatus(actionTypes.LOGIN_STATUS_LOGOUT))
                
            })
            .catch (error => {
                me.myUserID = null
                me.myUserName = null
                me.userImage = null 

                dispatch(authSaveMyUserName(null,null,null))
                localStorage.removeItem('token')
                
                dispatch(authSetLoginStatus(actionTypes.LOGIN_STATUS_LOGOUT))
                handleError(error,fileName,functionName)
            })
    }
}


export const authLoginAction = (userName,password) => {

    return dispatch => { 
            const formDataObj = {
                username : userName ,
                password : password,
            }

            const functionName = "authLoginAction"
            
            dispatch(authSetLoginStatus(actionTypes.LOGIN_STATUS_LOADING))

            console.log(userEndPoint)

            axios
                .post(`${userEndPoint}/?action=login`,
                        JSON.stringify(formDataObj),
                        config_json  
                    )
                .then( res => {
                    /**
                     data = {
                                querySet : {
                                    username : username
                                },
                                error : ['Bad request'],
                                statusCode : httpStatus.BadRequest,
                                message : ['action not found in query object'],
                                atributes: {}
                            }
                    */

                    const data = getSafePropertyWithAlert(()=>res.data,fileName,functionName)
                    const isSuccess =  getSafePropertyWithAlert(()=>data.isSuccess,fileName,functionName)
                    const token =  getSafePropertyWithAlert(()=>data.token,fileName,functionName)

                    if (isSuccess === true ){
                        // to do : set login status to be success 
                        localStorage.setItem('token',token)

                        const myUserName = getSafePropertyWithAlert(()=>data.querySet[0].username,fileName,functionName)
                        const myUserID = getSafePropertyWithAlert(()=>data.querySet[0].userID,fileName,functionName)
                        const userImage = getSafePropertyWithAlert(()=>data.querySet[0].userImage,fileName,functionName)
                        
                        me.myUserID = myUserID
                        me.myUserName = myUserName
                        me.userImage = userImage 


                        dispatch(authSaveMyUserName(myUserName,myUserID,userImage))

                        dispatch(authSetLoginStatus(actionTypes.LOGIN_STATUS_SUCCEED))
                        
                    }
                    
                })
                .catch(error => {
                    dispatch(authSetLoginStatus(actionTypes.LOGIN_STATUS_LOGOUT))
                    handleError(error,fileName,functionName)
                })

     }
}




