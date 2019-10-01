import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = ({ deleteProfileHandler }) => {
  return (
    <div className="dashboard-actions-wrapper">
      <div className="dashboard-action-row">
        <div className="dashboard-action-inner-row">
          <div className="dashboard-action-title-wrapper">
            <h3 className="dashboard-action-title">
              <i className="fas fa-user-alt" /> Profile
            </h3>
          </div>
          <div className="dashboard-action-btn-wrapper">
            <Link to="/profile" className="btn btn-light">
              View Profile
            </Link>
            <Link to="/editProfile" className="btn btn-light">
              Edit Profile
            </Link>
            <button className="btn btn-light" onClick={deleteProfileHandler}>
              Delete Profile
            </button>
          </div>
        </div>
      </div>
      <div className="dashboard-action-row">
        <div className="dashboard-action-inner-row">
          <div className="dashboard-action-title-wrapper">
            <h3 className="dashboard-action-title">
              <i className="far fa-newspaper" /> Posts
            </h3>
          </div>
          <div className="dashboard-action-btn-wrapper">
            <Link to="/myposts" className="btn btn-light">
              My Posts
            </Link>
            <Link to="/createPost" className="btn btn-light">
              <i className="fas fa-plus" /> Add New Post
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardActions;
