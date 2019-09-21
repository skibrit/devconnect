import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import "./profileList.scss";
import Profile from "./profile";
import { getAllProfiles, getUserProfile } from "../../../actions/profile";

const ProfileList = ({
  profile: { profileList, isLoading },
  getAllProfiles,
  getUserProfile
}) => {
  const [layOutType, toggleLayout] = useState("card");

  useEffect(
    () => {
      getAllProfiles();
    },
    [getAllProfiles]
  );

  const createProfileList = () => {
    // let profileList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return profileList.map(profile => {
      const { _id } = profile;
      return (
        <Profile
          key={_id}
          index={_id}
          profile={profile}
          layOut={layOutType}
          getUserProfileHandler={getUserProfile}
        />
      );
    });
  };

  return (
    <div className="section">
      <div className="page-title-wrapper">
        <h2 className="page-title">Developers</h2>
        <div className="layout-btn-wrapper">
          <div className="layout-btn-inner-wrapper">
            <div
              className={
                layOutType == "card" ? "layout-btn active-layout" : "layout-btn"
              }
              onClick={() => toggleLayout("card")}
            >
              <img
                src={require("../../../assets/images/layout-btns/gridSelected.png")}
              />
            </div>
            <div
              className={
                layOutType == "row" ? "layout-btn active-layout" : "layout-btn"
              }
              onClick={() => toggleLayout("row")}
            >
              <img
                src={require("../../../assets/images/layout-btns/rowIcon.png")}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="devList-wrapper">
        <div className="devList-inner-wrapper">
          <ul className="devList">
            {createProfileList()}
          </ul>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  profile: state.profileStates
});

const mapDispatchToProps = {
  getAllProfiles,
  getUserProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileList);
