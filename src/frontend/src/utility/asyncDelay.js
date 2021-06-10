

/**
 * 
 * @param {*} timeInSec : T in seconds
 * 
 * @param {*} return : not return value
 */
const asyncDelay = async (timeInSec) => {

    return new Promise ((resolve,reject)=>{
        return setTimeout(()=>{

            return resolve() ;
            
        }, timeInSec * 1000 )
    })

}

export  default asyncDelay 

