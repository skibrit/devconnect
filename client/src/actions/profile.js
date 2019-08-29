import {GET_PROFILE,GET_PROFILE_ERROR} from "./constants";
import axios from "axios";

export const getCurrentUserProfile = ()=> async dispatch => {
    try{
        let response = await axios.get("/api/profile/me");
        dispatch({
            type:GET_PROFILE,
            payload:response.data
        })
    }catch (err){
        dispatch({
            type:GET_PROFILE_ERROR,
            payload:{status:err.response.status,msg:err.response.statusText}
        })
    }
};