import React from "react";
import {connect} from "react-redux";
import './dashboard.scss';

const DashBoard = ({isAuthenticated,isLoading})=>{
    return(
        <div id='dashboard' className="section">
            <div className='page-title-wrapper'>
                <h2 className='page-title'>Dashboard</h2>
            </div>
        </div>
    )
};

const mapStateToProps = state => ({
    isAuthenticated:state.authStates.isAuthenticated,
    isLoading:state.authStates.isLoading
});

export default connect(mapStateToProps,null)(DashBoard);