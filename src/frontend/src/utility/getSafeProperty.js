

function getSafeProperty(fn, defaultVal) {
    try {
        return fn();
    } catch (e) {
        return defaultVal;
    }
}

export default getSafeProperty
