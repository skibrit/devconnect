import {SET_ALERT,REMOVE_ALERT} from "./constants";
import uuid from "uuid";

export const setAlert = (msg,alertType) => dispatch => {
    let id = uuid.v4();
    dispatch({
        type:SET_ALERT,
        payload:{
            id,
            msg,
            alertType
        }
    });

    //trigger remove alert after 3 sec
    setTimeout(()=>{
        dispatch({
            type:REMOVE_ALERT,
            payload:id
        })
    },5000)
};