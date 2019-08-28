import {REGISTER_SUCCESS,REGISTER_FAILED,USER_AUTHENTICATED,USER_AUTH_ERROR} from "./constants";
import {setAlert} from "./alert";
import axiox from "axios";
import setAuthToken from "../utils/setAuthToken";


export const authenticateUser = () => async dispatch =>{
    if(localStorage.getItem("token")){
        setAuthToken(localStorage.getItem("token"));
    }
    try{
        let response = await axiox.get("/api/auth");
        dispatch({
            type:USER_AUTHENTICATED,
            payload:response.data
        })
    }catch (err){
        dispatch({
            type:USER_AUTH_ERROR,
            payload:err.response.data
        })
    }
};


export const register = (name,email,password)=> async dispatch =>{
    try{
        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        };
        const body = {name,email,password};
        let response = await axiox.post("/api/registration",body,config);
        dispatch({
            type:REGISTER_SUCCESS,
            payload:response.data
        });
        dispatch(setAlert("Registration successful",'success'));
    }catch (err){
        let errors = err.response.data.errors;
        if(errors){
           errors.forEach(error =>  dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type:REGISTER_FAILED,
            payload:{}
        })
    }
};
