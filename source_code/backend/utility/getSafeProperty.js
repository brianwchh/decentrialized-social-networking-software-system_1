/**
 * 
 * @param {*} fn 
 * @param {*} defaultVal 
 * 
 * example :
 * const insertId = getSafeProperty(()=>data.res.insertId, undefined )
    if (insertId  == undefined) {
        alert('registeration failed, inserId is undefined')
    }
 */

const getSafeProperty = (fn, defaultVal) => {
    try {
        return fn();
    } catch (e) {
        return defaultVal;
    }
}

exports.getSafeProperty = getSafeProperty
