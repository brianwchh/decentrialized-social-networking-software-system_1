
import getSafeProperty from './getSafeProperty'

const isDebug = false 

const handleError = (error,fileName,functionName) => {

    const response = getSafeProperty(()=>error['response'], undefined)
    if (response === undefined ){
        if (isDebug === true ){
            alert(`@${fileName} ${functionName}, response undefined `)
        }
        return 
    }

    const data = getSafeProperty(()=>response['data'], undefined)
    if (data === undefined){
        if (isDebug === true ){
            alert(`@${fileName} ${functionName}, response.data undefined `)
        }
        return
    }
    const status = getSafeProperty(()=>response['status'], undefined)
    if (status === undefined){
        if (isDebug === true ){
            alert(`@${fileName} ${functionName}, response.status undefined `)
        }
        return
    }
    const headers = getSafeProperty(()=>response['headers'], undefined)
    if (headers === undefined){
        if (isDebug === true ){
            alert(`@${fileName} ${functionName}, response.headers undefined `)
        }
        return
    }
    const message = getSafeProperty(()=>response.data['message'], undefined) 
    if (message === undefined ){
        if (isDebug === true ){
            alert(`@${fileName} ${functionName}, response.data.message undefined `)
        }
        return
    }
    const err = getSafeProperty(()=>response.data['error'], undefined) 
    if (err === undefined ){
        if (isDebug === true ){
            alert(`@${fileName} ${functionName}, response.data.error undefined `)
        }
        return
    }

    if (isDebug === true){
        alert(`@${fileName} ${functionName}, error type : ` +  err + '  , ' +  message)
    } else {
        alert(`error type : ` +  err + '  , message: ' +  message)
    }
    

}


export default handleError
