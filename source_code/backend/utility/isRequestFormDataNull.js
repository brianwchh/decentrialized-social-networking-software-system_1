/**
    checkList is a array of keys soppursed to be in form data
 */

const {getSafeProperty} = require('./getSafeProperty')

const isDebug = true ;

const isRequestFormDataNull = (checkList,payload)=> {
    let errList = []
    for(let i=0; i<checkList.length; i++){
        if (getSafeProperty(()=>payload[checkList[i]], undefined) === undefined){
            if (isDebug === true){
                errList.push(`@isRequestFormDataNull.js, ${checkList[i]} not found in form data`)
            } else {
                errList.push(`${checkList[i]} not found in form data`)
            }
        } 
        else if(payload[checkList[i]] === null || payload[checkList[i]] === "" ){
            if (isDebug === true){
                errList.push(`@isRequestFormDataNull.js, ${checkList[i]} is null`)
            } else {
                errList.push(`${checkList[i]} is null`)
            }
        }
    }

    return errList ;

}

exports.isRequestFormDataNull = isRequestFormDataNull ;