import {GET_PROFILE,GET_PROFILE_ERROR,CLEAR_PROFILE} from "../actions/constants";

const defaultStates = {
    profiles:[],
    profile:null,
    isLoading:true,
    errors:null
};

export default (state=defaultStates,action)=>{
   const {type,payload} = action;
   switch (type){
       case GET_PROFILE:
           return {...state,profile:payload,isLoading:false};
       case GET_PROFILE_ERROR:
           return {...state,profile:null,errors:payload,isLoading:false};
       case CLEAR_PROFILE:
           return {...state,profile:null,errors:null,isLoading:true};
       default:
           return state;
   }
}