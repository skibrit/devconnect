import React from "react";
import {connect} from "react-redux";
import {Route,Redirect} from "react-router-dom";

const privateRoute = ({component:Component,isAuthenticated,isLoading,...rest})=> (
    <Route {...rest} render={(props)=>{
        return (isAuthenticated && !isLoading?<Component {...props}/>:<Redirect to="/login"/>)
    }}/>
);

const mapStateToProps = (state)=>({
    isAuthenticated:state.authStates.isAuthenticated,
    isLoading:state.authStates.isLoading
});

export default connect(mapStateToProps) (privateRoute);