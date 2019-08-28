import {SET_ALERT,REMOVE_ALERT} from "../actions/constants";
const defaultStates = [];

export default (state=defaultStates,action)=>{
    const {type,payload} = action;
    switch (type){
        case SET_ALERT:
            return [...state,payload];
        case REMOVE_ALERT:
            return state.filter(item => item.id!==payload);
        default:
         return state
    }
};