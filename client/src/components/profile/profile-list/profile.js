import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import ImageLoader from "../../layouts/Image/Image";

const profile = ({
  layOut,
  profile: {
    user: { name, avatar, _id },
    status,
    githubUserName,
    social,
    getUserProfileHandler
  }
}) => {
  return (
    <Fragment>
      {layOut == "card"
        ? <li className="dev-Row card-layout">
            <div className="card">
              <div className="view overlay">
                <ImageLoader
                  className="card-img-top"
                  src={avatar}
                  alt="Card image cap"
                />
                <a href="#!">
                  <div className="mask rgba-white-slight" />
                </a>
              </div>

              <div className="card-body">
                <h4 className="card-title">
                  {name}
                </h4>
                <p className="card-text">
                  {status}
                </p>
                <div className="social-link-wrapper">
                  {githubUserName &&
                    <a href="#" className="social-link">
                      <img
                        src={require("../../../assets/images/social-icons/github-logo.png")}
                        alt="github"
                      />
                    </a>}
                  {social &&
                    social.facebook &&
                    <a href="#" className="social-link">
                      <img
                        src={require("../../../assets/images/social-icons/facebook.png")}
                        alt="facebook"
                      />
                    </a>}
                  {social &&
                    social.linkedin &&
                    <a href="#" className="social-link">
                      <img
                        src={require("../../../assets/images/social-icons/linkedin.png")}
                        alt="linkedin"
                      />
                    </a>}
                  {social &&
                    social.youtube &&
                    <a href="#" className="social-link">
                      <img
                        src={require("../../../assets/images/social-icons/youtube.png")}
                        alt="youtube"
                      />
                    </a>}
                </div>
                <Link
                  className="btn btn-light view-profile-btn"
                  to={`profile/${_id}`}
                >
                  <div className="btn-text">View Profile</div>
                </Link>
              </div>
            </div>
          </li>
        : <li className="dev-Row slice-layout">
            <div className="profile-row">
              <div className="left-column">
                <div className="profile-photo-wrapper">
                  <ImageLoader
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ81f3EIV_ML0nJINkoDNjqCXJWU_24FppyDJvVaFBS3O9RaaKj"
                    alt="pro-pic"
                  />
                </div>
              </div>
              <div className="right-column">
                <div className="column-row">
                  <h3 className="user-title">
                    {name}
                  </h3>
                </div>
                <div className="column-row">
                  <h3 className="user-status">
                    {status}
                  </h3>
                </div>

                <div className="social-link-wrapper">
                  {githubUserName &&
                    <a href="#" className="social-link">
                      <img
                        src={require("../../../assets/images/social-icons/github-logo.png")}
                        alt="github"
                      />
                    </a>}
                  {social &&
                    social.facebook &&
                    <a href="#" className="social-link">
                      <img
                        src={require("../../../assets/images/social-icons/facebook.png")}
                        alt="facebook"
                      />
                    </a>}

                  {social &&
                    social.linkedin &&
                    <a href="#" className="social-link">
                      <img
                        src={require("../../../assets/images/social-icons/linkedin.png")}
                        alt="linkedin"
                      />
                    </a>}
                  {social &&
                    social.youtube &&
                    <a href="#" className="social-link">
                      <img
                        src={require("../../../assets/images/social-icons/youtube.png")}
                        alt="youtube"
                      />
                    </a>}
                </div>
                <div className="btn btn-light view-profile-btn">
                  <div className="btn-text">View Profile</div>
                </div>
              </div>
            </div>
          </li>}
    </Fragment>
  );
};

export default profile;
