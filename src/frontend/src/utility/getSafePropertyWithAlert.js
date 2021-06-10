import getSafeProperty from './getSafeProperty'
const isdebug = false

/**
 *  example : getSafePropertyWithAlert(()=>object.property, "filename.js", "functionName()","please add more information" )
 * 
 * @param {*} getPropertyFunction 
 * @param {*} expressionString 
 * @param {*} fileName 
 * @param {*} inSideFunctionName 
 * @param {*} extra_msg 
 */
const getSafePropertyWithAlert = (getPropertyFunction,fileName,inSideFunctionName,extra_msg="") => {


    if(typeof getPropertyFunction !== 'function')
    {
        if (isdebug === true){
            alert(`@ file ${fileName}, inside function :${inSideFunctionName} getSafePropertyWithAlert, 1st parameter: getPropertyFunction is not a function, please check the code`)
        }
        
        return ;
    }

    const propertyValue = getSafeProperty(getPropertyFunction, undefined)
    if (propertyValue  == undefined) {
        if (isdebug === true){
            alert(`@ file ${fileName}, inside function :${inSideFunctionName} getSafePropertyWithAlert,  ${String(getPropertyFunction)}  is undefined, ${extra_msg}`)
        }
        return ;
    }

    return propertyValue
}

export default getSafePropertyWithAlert
