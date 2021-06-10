import axios from "axios";
import * as actionTypes from './actionTypes'
import {
        } from "../../ipconfig"
import {config_json} from '../../global_config'


const createEditor = () => {
        return {
            type : actionTypes.EDITOR_CREATE,
            data : {
                
            }
        }
    }

export const eidtorCreateAction = () => {
        return dispatch => {
                dispatch(createEditor());
        }
    }