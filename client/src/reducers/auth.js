import {REGISTER_SUCCESS,REGISTER_FAILED,USER_AUTHENTICATED,USER_AUTH_ERROR} from "../actions/constants";

const defaultStates = {
  token:localStorage.getItem("token"),
  isAuthenticated:false,
  isLoading:true,
  user:null
};

export default (state = defaultStates,action)=>{
    const {type,payload } = action;

    switch (type){
        case USER_AUTHENTICATED:
            return {...state,isAuthenticated:true,isLoading:false,user:payload};
        case REGISTER_SUCCESS:
            localStorage.setItem("token",payload.token);
            return {...state,...payload,isAuthenticated:true,isLoading:false};
        case REGISTER_FAILED:
        case USER_AUTH_ERROR:
            localStorage.removeItem("token");
            return {...state,isAuthenticated:false,isLoading:false};
        default:
            return state;
    }
}
