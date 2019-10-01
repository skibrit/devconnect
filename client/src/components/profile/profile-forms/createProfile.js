import React, { useState, Fragment, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Link, Redirect, withRouter } from "react-router-dom";
import { setAlert } from "../../../actions/alert";
import { manageProfile } from "../../../actions/profile";
import { Animated } from "react-animated-css";
import scriptLoader from "../../../utils/loadExternalScript";

const CreateProfile = ({
  setAlert,
  createProfile,
  history,
  isAuthenticated,
  profile
}) => {
  let autoComplete;
  let autoCompleteField = useRef(null);

  const handlePlaceChanged = () => {
    const place = autoComplete.getPlace();
    console.log(place);
    setFormData(prevData => {
      return { ...prevData, location: place.formatted_address };
    });
  };

  useEffect(() => {
    const callApi = async () => {
      try {
        await scriptLoader(
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyDfJ2N7azyT5OST0Fy6nj2IRC0yAS_wWVc&libraries=places"
        );
        setTimeout(() => {
          if (window.google) {
            autoComplete = new window.google.maps.places
              .Autocomplete(autoCompleteField.current, { types: ["address"] });
            autoComplete.addListener("place_changed", handlePlaceChanged);
          }
        }, 500);
      } catch (err) {
        console.log(err.message);
      }
    };
    callApi();
  }, []);

  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: 0,
    skills: "",
    bio: "",
    githubUserName: "",
    youtube: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    instragram: ""
  });
  const [showSocialLinkTab, toggleSocialLinkTab] = useState(false);

  const {
    company,
    website,
    location,
    status,
    skills,
    bio,
    githubUserName,
    youtube,
    twitter,
    facebook,
    linkedin,
    instragram
  } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onToggleSocialTab = e => {
    toggleSocialLinkTab(!showSocialLinkTab);
  };

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
  };

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  } else if (profile) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="section">
      <div className="page-title-wrapper">
        <h2 className="page-title">Create Profile</h2>
      </div>
      <form onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <select
            className="form-control"
            id="status"
            name="status"
            value={status}
            onChange={e => onChange(e)}
            required
          >
            <option value={0}>Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Instructor">Instructor</option>
            <option value="Manager">Manager</option>
            <option value="Intern">Intern</option>
            <option value="Student">Student</option>
            <option value="Student">Other</option>
          </select>
          <span className="input-clue">
            Choose your current professional Status
          </span>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="company"
            name="company"
            value={company}
            onChange={e => onChange(e)}
            placeholder="Company"
          />
          <span className="input-clue">
            Could be your company or you work for
          </span>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="website"
            name="website"
            value={website}
            onChange={e => onChange(e)}
            placeholder="Website"
          />
          <span className="input-clue">Could be your or a company website</span>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            value={location}
            onChange={e => onChange(e)}
            placeholder="Location"
            ref={autoCompleteField}
          />
          <span className="input-clue">
            City & States suggested (ex: Boston, MA)
          </span>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="skills"
            name="skills"
            value={skills}
            onChange={e => onChange(e)}
            required
            placeholder="Skills"
          />
          <span className="input-clue">
            Please use comma separated values (ex: HTML5,Javascript,PHP)
          </span>
        </div>
        <div className="form-group">
          <textarea
            className="form-control"
            id="bio"
            name="bio"
            onChange={e => onChange(e)}
            placeholder="Bio"
          />
          <span className="input-clue">Tell us a little about yourself</span>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="githubUserName"
            name="githubUserName"
            value={githubUserName}
            onChange={e => onChange(e)}
            placeholder="Github username"
          />
          <span className="input-clue">
            If you want your latest repos and a github link, include your
            username
          </span>
        </div>

        <div className="form-group optional-btn-wrapper">
          <button
            type="button"
            className="btn btn-light"
            onClick={() => {
              onToggleSocialTab();
            }}
          >
            <i className="fa fa-expand" aria-hidden="true" /> Add Social Link
          </button>
          <span className="btn-clue">Optional</span>
        </div>
        <Animated
          animationIn="fadeIn"
          animationOut="fadeOut"
          isVisible={showSocialLinkTab}
          animateOnMount={false}
        >
          <div className={showSocialLinkTab ? "fade-out" : "fade-in"}>
            <div className="form-group row">
              <label htmlFor="name" className="col-sm-1 social-icon">
                <i className="fab fa-youtube youtube" />
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="youtube"
                  name="youtube"
                  value={youtube}
                  onChange={e => onChange(e)}
                  placeholder="Youtube Link"
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="name" className="col-sm-1 social-icon">
                <i className="fab fa-twitter twitter" />
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="twitter"
                  name="twitter"
                  value={twitter}
                  onChange={e => onChange(e)}
                  placeholder="Twitter Link"
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="name" className="col-sm-1 social-icon">
                <i className="fab fa-facebook-f facebook" />
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="facebook"
                  name="facebook"
                  value={facebook}
                  onChange={e => onChange(e)}
                  placeholder="Facebook Link"
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="name" className="col-sm-1 social-icon">
                <i className="fab fa-linkedin-in linkdin" />
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="linkedin"
                  name="linkedin"
                  value={linkedin}
                  onChange={e => onChange(e)}
                  placeholder="Linkedin Link"
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="name" className="col-sm-1 social-icon">
                <i className="fab fa-instagram instragram" />
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="instragram"
                  name="instragram"
                  value={instragram}
                  onChange={e => onChange(e)}
                  placeholder="Instragram Link"
                />
              </div>
            </div>
          </div>
        </Animated>
        <div className="form-group form-btn-wrapper">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to="/dashboard" type="button" className="btn btn-primary">
            <i className="fas fa-arrow-left" /> Go Back
          </Link>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.authStates.isAuthenticated,
  profile: state.profileStates.profile
});

const mapDispatchAction = {
  setAlert,
  createProfile: manageProfile
};

export default connect(mapStateToProps, mapDispatchAction)(
  withRouter(CreateProfile)
);
