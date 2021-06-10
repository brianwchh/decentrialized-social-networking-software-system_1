
let heartBeatCnt = 1  ;  // private to this file, not accessable globally...... yuk

const heartBeat = {
    getHeartBeatCnt: '',
    incrementHeartBeatCnt: '',
    clearHeartBeatCnt :  '',
}

heartBeat.getHeartBeatCnt =  () => {

    return heartBeatCnt ;
}


heartBeat.incrementHeartBeatCnt = () => {
    heartBeatCnt += 1 ;
}

heartBeat.clearHeartBeatCnt = () => {
    heartBeatCnt = 0 ;
}

exports.heartBeat =  heartBeat