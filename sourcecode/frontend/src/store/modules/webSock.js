import * as actionTypes from './actionTypes'
import updateObject from './utility'

let state =  {
    sock_conn: '',
    isConnectedToServer: false,
};


const websocketOnMessage= (e) => {
    console.log(e);
    console.log(e.data)
    const message = JSON.parse(e.data);

    /**
     * the message structure we receive from server 
     * message {
     *      "type" :  "login"/"message" ,
     *      "from" :  "server" / "peer",
     *      "to"   :   '',
     *      "success"   : true/false
     *      "data" :  {
     *                   "type" : "offer"/"answer"/"candidate",
     *                   "data" :  databody of corresponding type above
     *                 }
     * }
     */

    switch (message.type) {
        case "login" :

            if (message.success === false) {
                this.isLogin = false;
                alert("name taken, please try a different name")
                return ;
            } else {
                this.isLogin = true;
            }
  
            this.contactList = message.data ;
            console.log(this.contactList)

            break;

        case "message" :
            this.incomingMsgUser = message.from ;
            console.log("message: ", message);
            this.onMessage(message.data);
            break;

        default :
            console.log("command type not found")
            break;
    }

}

const websocketOnOpen = ()=> {
    state.isConnectedToServer = true;
    console.log("on open, connection established")
};

const websocketOnError= () =>  {
    // this.initWebSocket();
};

const websocketOnClose = (e) => {
    console.log('disconnected from signaling server', e);
};



// state.sock_conn = new WebSocket(wsuri);
// state.sock_conn.onmessage = websocketOnMessage;
// state.sock_conn.onopen = websocketOnOpen;
// state.sock_conn.onerror = websocketOnError;
// state.sock_conn.onclose = websocketOnClose;


// sock_conn.send(JSON.stringify(
//     {
//         type : "message",
//         to   : { 
//                 ip : this.otherUserIP,
//                 name: this.otherUserName,
//         },
//         from : { 
//                 ip : this.myIP,
//                 name: this.myUserName,
//         },
//         data : {
//             type : "text" ,
//             data : this.inputText
//         }
//     }
// ));


const getters = {
    // getIsLogin: () => {
    //     return state.isLogin ;
    // },
    // getLoging: () => {
    //     return state.loging
    // }
};

// action gets or post data to backend
const actions = {
    async send ({commit,state},payload) {
        console.log(payload);
        // send data to signaling server .... 
        // state.sock_conn.send(JSON.stringify({
            
        // }))

        // update the state accordingly if any 
        await commit(actionTypes.WSS_SEND);

        // const res 
        // try {
        //     res = await axios.get('http:127.0.0.1:8000/user')
        // } catch (err) {
        //     console.log(err)
        // }
        // // use commit to set the state accordingly, same as dispatch an action in redux
        // commit(actionTypes.AUTH_LOGIN_SUCCESS,state,{isLogin:true}) // same as dispatch(action(){this action returns {actiontype,action_data}})
    } ,
    
};

// commit the result according to the result from action
// mutate takes action.type and action.data and the current state 
// to update the state accordingly
// reducers ---> update the state based on current state and action type and data
const mutations = {
    [actionTypes.AUTH_START] () {
        console.log("in mutations auth start")
        state = updateObject(state,{
            loging: true
        })
        console.log("state updated")
    },
    [actionTypes.AUTH_LOGIN_SUCCESS] ( data) {
        // updateObject(state,data)
        console.log(data)
    },
};

export default {
    state,
    getters,
    actions,
    mutations
}