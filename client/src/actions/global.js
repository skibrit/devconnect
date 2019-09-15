import {OPEN_MODAL,CLOSE_MODAL} from "./constants";


export const openModal = (modalName)=>dispatch=>{
    dispatch({
        type:OPEN_MODAL,
        payload:modalName
    })
};

export const closeModal = (modalName)=>dispatch=>{
    dispatch({
        type:CLOSE_MODAL,
        payload:modalName
    })
};