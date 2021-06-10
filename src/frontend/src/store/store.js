import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import authReducer from "./auth/reducer";
import webSocketReducer from  './websocket/reducer'

const rootReducer = combineReducers({
  auth: authReducer,
  websocket: webSocketReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store ;