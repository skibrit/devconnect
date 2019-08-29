import React from "react";
import './home.scss';
import LandingPage from "../landing/landing";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

const Home = ({isAuthenticated,isLoading})=>{
    if(isAuthenticated && !isLoading){
        return(
            <Redirect to="/dashboard"/>
        )
    }
    return(
        <div id='home'>
            <LandingPage/>
        </div>
    )
};

const mapStateToProps = state => ({
   isAuthenticated:state.authStates.isAuthenticated,
    isLoading:state.authStates.isLoading
});

export default connect(mapStateToProps,null)(Home);