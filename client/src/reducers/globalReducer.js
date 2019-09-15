import {OPEN_MODAL,CLOSE_MODAL} from "../actions/constants";

const defaultState = {
  openModal:[]
};

export default (state=defaultState,action)=>{
    const {type,payload} = action;
    switch (type){
        case OPEN_MODAL:
            return {...state,openModal:[...state.openModal,payload]}
        case CLOSE_MODAL:
            return {...state,openModal:state.openModal.filter(item=>item!=payload)};
        default:
            return state;
    }
};