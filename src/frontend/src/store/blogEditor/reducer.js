import * as actionTypes from './actionTypes'
import { updateObject } from "../utility";
import { authResetStateAction } from './actions';



const initialState = {
    editor : [] ,
}



const sharedReducer = (state,data) => {
    return updateObject(state,data)
}

const createEditor = (currentState,data) => {

    console.log("hello crateEditor in reducer")
    console.log(currentState.editor)

    if (currentState.editor.length == 0){
        

        return updateObject(currentState,{editor: window.editor})
    }

    

    return currentState
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.EDITOR_CREATE : 
            return createEditor(state,action.data);

        default : 
            return sharedReducer(state,action.data);
    }
}

export default reducer ;