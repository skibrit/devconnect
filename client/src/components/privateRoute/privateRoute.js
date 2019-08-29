import React from "react";
import {connect} from "react-redux";
import {Route,Redirect} from "react-router-dom";
import Spinner from "../layouts/spinner/spinner";

const privateRoute = ({component:Component,isAuthenticated,isLoading,...rest})=> (
    <Route {...rest} render={(props)=>{
        if(isLoading){
            return <Spinner/>
        }else{
            return (isAuthenticated?<Component {...props}/>:<Redirect to="/login"/>)
        }
    }}/>
);

const mapStateToProps = (state)=>({
    isAuthenticated:state.authStates.isAuthenticated,
    isLoading:state.authStates.isLoading
});

export default connect(mapStateToProps) (privateRoute);