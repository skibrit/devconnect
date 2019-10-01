import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import {
  getCurrentUserProfile,
  getUserProfile,
  changeAvatar
} from "../../../actions/profile";
import { convertToLocalString } from "../../../utils/DateUtill";
import { fileChooser } from "../../../utils/FileUtil";
import "./profileView.scss";
import Spinner from "../../layouts/spinner/spinner";
import ImageLoader from "../../layouts/Image/Image";
import GithubRepose from "./githubRepo";
import { useAlert } from "react-alert";

const ProfileView = ({
  profile: { isLoading, profile },
  getCurrentUserProfile,
  getUserProfile,
  changeAvatar,
  location: { pathname },
  isAuthenticated,
  user,
  history
}) => {
  const [selectedFile, setSelectedFile] = useState(
    profile && profile.user && profile.user.avatar
  );

  useEffect(
    () => {
      const arr = pathname.split("/");
      console.log(arr);
      if (arr[2]) {
        getUserProfile(arr[2].trim());
      } else {
        getUserProfile(user._id);
      }
      if (!isLoading) {
        console.log(isLoading);
        console.log(profile);
        setSelectedFile(profile && profile.user && profile.user.avatar);
      }
    },
    [isLoading, getUserProfile]
  );

  const alert = useAlert();

  const fileChooserHandler = async e => {
    let el = document.querySelector("#profile-pic-chooser");
    try {
      let { base64, fileData } = await fileChooser(el);
      changeAvatar(fileData);
      setSelectedFile(base64);
      el.value = "";
    } catch (err) {
      console.log(err);
      el.value = "";
      alert.show(err.toString());
    }
  };

  const socialLinkOpenHandler = e => {
    e.preventDefault();
    console.log(e.currentTarget.href);
    window.open(e.currentTarget.href);
  };

  return (
    <Fragment>
      {!profile
        ? <Spinner />
        : <div className="section profile-view">
            <div className="profile-view-wrapper">
              <div className="profile-left-wrapper">
                <div className="profile-photo-wrapper">
                  <div className="profile-photo-inner-wrapper">
                    <ImageLoader
                      src={selectedFile}
                      alt="profile-photo"
                      className="profile-photo"
                    />
                    {isAuthenticated &&
                      user &&
                      user._id == profile.user._id &&
                      <div
                        className="change-photo-btn"
                        onClick={fileChooserHandler}
                      >
                        <h4 className="btn-text">Change Photo</h4>
                        <input
                          type="file"
                          id="profile-pic-chooser"
                          accept="image/gif, image/jpeg, image/jpg, image/png, image/tiff"
                        />
                      </div>}
                  </div>
                </div>
                {(profile.website || profile.githubUserName) &&
                  <div className="profile-left-column-row">
                    <div className="profile-left-column-row-wrapper">
                      <h3 className="profile-left-column-row-title">
                        Portfolio
                      </h3>
                      <div className="profile-left-column-row-content">
                        {profile.website &&
                          <div className="content-row">
                            <h4>Website Link</h4>
                          </div>}
                        {profile.githubUserName &&
                          <div className="content-row">
                            <h4>Github Link</h4>
                          </div>}
                      </div>
                    </div>
                  </div>}
                <div className="profile-left-column-row">
                  <div className="profile-left-column-row-wrapper">
                    <h3 className="profile-left-column-row-title">Skills</h3>
                    <div className="profile-left-column-row-content">
                      {profile.skills.map((skill, i) => {
                        return (
                          <div key={i} index={i} className="content-row">
                            <h4>
                              {skill}
                            </h4>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                {profile.social &&
                  (profile.social.youtube ||
                    profile.social.twitter ||
                    profile.social.facebook ||
                    profile.social.linkedin ||
                    profile.social.instragram) &&
                  <div className="profile-left-column-row">
                    <div className="profile-left-column-row-wrapper">
                      <div className="user-social-media">
                        {profile.social.facebook &&
                          <a
                            href={"http://" + profile.social.facebook}
                            className="social-media-link"
                            onClick={socialLinkOpenHandler}
                          >
                            <img
                              src={require("../../../assets/images/social-icons/facebook.png")}
                            />
                          </a>}
                        {profile.social.linkedin &&
                          <a
                            href={"http://" + profile.social.linkedin}
                            className="social-media-link"
                            onClick={socialLinkOpenHandler}
                          >
                            <img
                              src={require("../../../assets/images/social-icons/linkedin.png")}
                            />
                          </a>}
                        {profile.social.youtube &&
                          <a
                            href={"http://" + profile.social.youtube}
                            className="social-media-link"
                            onClick={socialLinkOpenHandler}
                          >
                            <img
                              src={require("../../../assets/images/social-icons/youtube.png")}
                            />
                          </a>}
                        {profile.social.instragram &&
                          <a
                            href={"http://" + profile.social.instragram}
                            className="social-media-link"
                            onClick={socialLinkOpenHandler}
                          >
                            <img
                              src={require("../../../assets/images/social-icons/instagram.png")}
                            />
                          </a>}
                        {profile.social.twitter &&
                          <a
                            href={"http://" + profile.social.twitter}
                            className="social-media-link"
                            onClick={socialLinkOpenHandler}
                          >
                            <img
                              src={require("../../../assets/images/social-icons/twitter.png")}
                            />
                          </a>}
                      </div>
                    </div>
                  </div>}
              </div>
              <div className="profile-center-wrapper">
                <div className="profile-view-action-wrapper">
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      console.log(history);
                      history.goBack();
                    }}
                  >
                    <i className="fas fa-arrow-left" />
                  </button>
                </div>
                <h2 className="user-title">
                  {profile.user.name}
                </h2>
                <h3 className="user-status">
                  {profile.status}
                </h3>

                <div className="profile-center-content-wrapper">
                  <div className="profile-center-row">
                    <div className="profile-center-row-wrapper">
                      <h4 className="profile-center-row-title">About</h4>
                      <div className="profile-center-row-content">
                        <div className="content-row row">
                          <div className="col-md-3 content-title">Name</div>
                          <div className="col-md-9 content-value">
                            {profile.user.name}
                          </div>
                        </div>
                        <div className="content-row row">
                          <div className="col-md-3 content-title">Email</div>
                          <div className="col-md-9 content-value">
                            {profile.user.email}
                          </div>
                        </div>
                        <div className="content-row row">
                          <div className="col-md-3 content-title">Phone</div>
                          <div className="col-md-9 content-value">
                            01680136160
                          </div>
                        </div>
                        <div className="content-row row">
                          <div className="col-md-3 content-title">
                            Profession
                          </div>
                          <div className="col-md-9 content-value">
                            {profile.status}
                          </div>
                        </div>
                        <div className="content-row row">
                          <div className="col-md-3 content-title">Company</div>
                          <div className="col-md-9 content-value">
                            {profile.company || "N/A"}
                          </div>
                        </div>
                        <div className="content-row row">
                          <div className="col-md-3 content-title">Location</div>
                          <div className="col-md-9 content-value">
                            {profile.location || "N/A"}
                          </div>
                        </div>
                        <div className="content-row row">
                          <div className="col-md-3 content-title">Bio</div>
                          <div className="col-md-9 content-value">
                            {profile.bio || "N/A"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="profile-center-row">
                    <div className="profile-center-row-wrapper">
                      <h4 className="profile-center-row-title">Experiences</h4>
                      <div className="profile-center-row-content">
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th>Company</th>
                              <th>Title</th>
                              <th>Years</th>
                              <th>Location</th>
                            </tr>
                          </thead>
                          <tbody>
                            {profile.experiences.map(exp => {
                              const {
                                _id,
                                title,
                                company,
                                from,
                                to,
                                current,
                                location
                              } = exp;
                              return (
                                <tr key={_id} index={_id}>
                                  <td>
                                    {title}
                                  </td>
                                  <td>
                                    {company}
                                  </td>
                                  <td>
                                    {convertToLocalString(from)} -{" "}
                                    {current
                                      ? "Present"
                                      : convertToLocalString(to)}
                                  </td>
                                  <td>
                                    {location}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="profile-center-row">
                    <div className="profile-center-row-wrapper">
                      <h4 className="profile-center-row-title">Education</h4>
                      <div className="profile-center-row-content">
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th>School</th>
                              <th>Degree</th>
                              <th>Field of Study</th>
                              <th>Years</th>
                            </tr>
                          </thead>
                          <tbody>
                            {profile.education.map(edu => {
                              const {
                                _id,
                                degree,
                                school,
                                fieldOfStudy,
                                from,
                                to,
                                current,
                                location
                              } = edu;
                              return (
                                <tr key={_id} index={_id}>
                                  <td>
                                    {degree}
                                  </td>
                                  <td>
                                    {school}
                                  </td>
                                  <td>
                                    {fieldOfStudy}
                                  </td>
                                  <td>
                                    {convertToLocalString(from)} -
                                    {current
                                      ? "Present"
                                      : convertToLocalString(to)}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  {profile.githubUserName &&
                    <div className="profile-center-row">
                      <div className="profile-center-row-wrapper">
                        <h4 className="profile-center-row-title">
                          Github Repos
                        </h4>
                        <div className="profile-center-row-content">
                          <GithubRepose username={profile.githubUserName} />
                        </div>
                      </div>
                    </div>}
                </div>
              </div>
            </div>
          </div>}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  profile: state.profileStates,
  isAuthenticated: state.authStates.isAuthenticated,
  user: state.authStates.user
});

const mapDispatchToProps = {
  getCurrentUserProfile,
  getUserProfile,
  changeAvatar
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(ProfileView)
);
