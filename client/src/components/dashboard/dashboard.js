import React,{useEffect,Fragment} from "react";
import {connect} from "react-redux";
import {getCurrentUserProfile} from "../../actions/profile";
import Spinner from "../layouts/spinner/spinner";
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
                        <h4><i class="fas fa-user"></i> Welcome {user && user.name}</h4>
                    </div>
                    {profile?
                        <Fragment>
                            {/* user has created profile */}
                        </Fragment> :
                        <Fragment>
                            <div className='create-profile-section'>
                                <h5 className="h5">You don't have any profile. Please create One</h5>
                                <button className="btn btn-primary">Create Profile</button>
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