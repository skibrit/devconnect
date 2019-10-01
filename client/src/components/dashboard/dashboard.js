import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getCurrentUserProfile, deleteProfile } from "../../actions/profile";
import Spinner from "../layouts/spinner/spinner";
import DashboardAction from "./dashboardActions";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./dashboard.scss";

const DashBoard = ({
  authStates: { user },
  profileStates: { profile, isLoading },
  getCurrentUserProfile,
  deleteProfile,
  history
}) => {
  useEffect(() => {
    getCurrentUserProfile();
  }, []);

  const deleteProfileHandler = () => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteProfile(history)
        },
        {
          label: "No",
          onClick: () => {}
        }
      ]
    });
  };

  return isLoading
    ? <Spinner />
    : <Fragment>
        <div id="dashboard" className="section">
          <div className="page-title-wrapper">
            <h2 className="page-title">Dashboard</h2>
          </div>
          <div className="user-detail-wrapper">
            <div className="user-pic-wrapper">
              <img src={user && user.avatar} alt="photo" />
            </div>
            <div className="user-title-wrapper">
              <h4 className="user-title">
                Welcome {user && user.name}
              </h4>
            </div>
          </div>
          {profile
            ? <Fragment>
                <DashboardAction deleteProfileHandler={deleteProfileHandler} />
              </Fragment>
            : <Fragment>
                <div className="create-profile-section">
                  <h5 className="h5">
                    You don't have any profile. Please create One
                  </h5>
                  <Link to="/createProfile" className="btn btn-primary">
                    Create Profile
                  </Link>
                </div>
              </Fragment>}
        </div>
      </Fragment>;
};

const mapStateToProps = state => ({
  authStates: state.authStates,
  profileStates: state.profileStates
});

const mapDispatchToProps = {
  getCurrentUserProfile,
  deleteProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(DashBoard)
);
