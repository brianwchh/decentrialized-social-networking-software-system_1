const rmValFromArray = function (arr, val) {
    let newArr = [];
    for (let i=0; i<arr.length;i++){
        console.log(arr[i], val)
        console.log(typeof arr[i], typeof val)
        if(arr[i].ip !== val.ip && arr[i].name !== val.name){
            newArr.push(arr[i]);
            console.log(arr[i]);
        }
    }
    return newArr;
};

const isValInArray = function (arr, val){
    let isExisted = false;
    for (let i=0; i<arr.length;i++){
        if(arr[i] === val){
            isExisted = true ;
        }
    }
    return isExisted;
}

exports.rmValFromArray = rmValFromArray ;
exports.isValInArray = isValInArray ;


// test 
// const testArr = [
//     "127.0.0.1:8989",
//     "localhost:8989",
//     "192.168.1.1:8989",
// ]
// const testVal = "127.0.0.1:8989"

// console.log(isValInArray(testArr,testVal))