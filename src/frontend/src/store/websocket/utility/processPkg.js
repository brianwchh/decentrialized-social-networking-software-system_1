
const processInnerLayerMsg = (data, socket_conn) => {

    switch (data.TYPE_INNER) {

        case 'API' : 
            /*{
                TYPE_INNER : 'API' 
                PAYLOAD : {
                    uuid4Key : 'xxxooo',
                    return_data     : {
                            res :  ,
                            err :  ,
                    }
                }
            }
            */
                // if key uuid4Key exist, save data.PAYLOAD.data = {res : , err: } in localhost 
            const uuid4Key = data.PAYLOAD.uuid4Key ;
            localStorage.setItem(uuid4Key,data.PAYLOAD.return_data) 

            break ;

        default : 
                console.log("data.TYPE_INNER not found")
    }

}

const proccessOuterLayerMsg = ( msg, socket_conn) => {

    switch (msg.TYPE_OUTER) {

        case 'MSG' :
            processInnerLayerMsg(msg.DATA, socket_conn)
            break ;
        
        case 'HEARTBEAT' : 

            break ;

        default : 
            console.log('TYPE_OUTER not found')

    }

}


exports.proccessOuterLayerMsg = proccessOuterLayerMsg ;



