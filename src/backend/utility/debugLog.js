/**
 * 
 */

const  DEPLOY = true ;

const debugLog = (fileName,functionName,debugMsg) => {
    if (DEPLOY === true){
        console.log(`in function ${functionName} of file ${fileName},${debugMsg}`)
    }
}

exports.debugLog = debugLog


