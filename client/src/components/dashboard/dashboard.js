import React,{useEffect,Fragment} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {getCurrentUserProfile} from "../../actions/profile";
import Spinner from "../layouts/spinner/spinner";
import DashboardAction from "./dashboardActions";
import './dashboard.scss';

const DashBoard = ({authStates:{user},profileStates:{profile,isLoading},getCurrentUserProfile})=>{

    useEffect(()=>{
        getCurrentUserProfile();
    },[]);

    return(
        isLoading? <Spinner/> :
            <Fragment>
                <div id='dashboard' className="section">
                    <div className='page-title-wrapper'>
                        <h2 className='page-title'>Dashboard</h2>
                    </div>
                    <div>
                        <h4><i className="fas fa-user"></i> Welcome {user && user.name}</h4>
                    </div>
                    {profile?
                        <Fragment>
                            <DashboardAction/>
                        </Fragment> :
                        <Fragment>
                            <div className='create-profile-section'>
                                <h5 className="h5">You don't have any profile. Please create One</h5>
                                <Link to="/createProfile" className="btn btn-primary">Create Profile</Link>
                            </div>
                        </Fragment>
                    }
                </div>
            </Fragment>
    )
};

const mapStateToProps = state => ({
    authStates:state.authStates,
    profileStates:state.profileStates
});

const mapDispatchToProps = {
    getCurrentUserProfile
};

export default connect(mapStateToProps,mapDispatchToProps)(DashBoard);