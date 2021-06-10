/**
 * 
 * @param {*} fn 
 * @param {*} defaultVal 
 * 
 * example :
 * const insertId = getSafeProperty(()=>data.res.insertId, 'undefined')
    if (insertId  == 'undefined') {
        alert('registeration failed, inserId is undefined')
    }
 */

function getSafeProperty(fn, defaultVal) {
    try {
        return fn();
    } catch (e) {
        return defaultVal;
    }
}

export default getSafeProperty
