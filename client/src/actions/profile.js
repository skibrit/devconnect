import {GET_PROFILE,GET_PROFILE_ERROR,CLEAR_PROFILE} from "./constants";
import {setAlert} from "./alert";
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

//this function create or update user profile
export const manageProfile = (formData,history,shouldUpdate=false)=> async dispatch => {
  try{
       let config = {
           headers:{
               "Content-Type":"application/json"
           }
       };
       let response = await axios.post("/api/profile",formData,config);
       dispatch({
           type:GET_PROFILE,
           payload:response.data
       });
       history.push("/dashboard");
   }catch (err){
       let errors = err.response.data.errors;
       if(errors){
           errors.forEach(error =>  dispatch(setAlert(error.msg,'danger')));
       }
       dispatch({
           type:CLEAR_PROFILE,
           payload:{status:err.response.status,msg:err.response.statusText}
       })
   }
};
