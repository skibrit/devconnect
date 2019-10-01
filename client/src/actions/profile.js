import {
  GET_PROFILE,
  GET_PROFILE_ERROR,
  CLEAR_PROFILE,
  GET_ALL_PROFILES,
  GET_ALL_PROFILES_ERROR,
  GET_GITHUB_REPOSE,
  GITHUB_REPOSE_FETCH_ERROR
} from "./constants";
import { setAlert } from "./alert";
import { logout } from "./auth";
import axios from "axios";

export const getCurrentUserProfile = () => async dispatch => {
  try {
    let url = "/api/profile/me";
    let response = await axios.get(url);
    dispatch({
      type: GET_PROFILE,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: GET_PROFILE_ERROR,
      payload: { status: err.response.status, msg: err.response.statusText }
    });
  }
};

export const getUserProfile = userID => async dispatch => {
  try {
    let url = `/api/profile/user/${userID}`;
    let response = await axios.get(url);
    dispatch({
      type: GET_PROFILE,
      payload: response.data
    });
  } catch (err) {
    if (err.response) {
      dispatch({
        type: GET_PROFILE_ERROR,
        payload: { status: err.response.status, msg: err.response.statusText }
      });
    }
  }
};

export const getAllProfiles = () => async dispatch => {
  try {
    let response = await axios.get("/api/profile");
    dispatch({
      type: GET_ALL_PROFILES,
      payload: response.data
    });
    dispatch({
      type: CLEAR_PROFILE,
      payload: {}
    });
  } catch (err) {
    console.log(err);
    if (err.response) {
      dispatch({
        type: GET_ALL_PROFILES_ERROR,
        payload: { status: err.response.status, msg: err.response.statusText }
      });
    }
  }
};

//this function fetch github repos of a user based on their github username
export const getGithubRepose = gitUsername => async dispatch => {
  try {
    let response = await axios.get(`/api/profile/github/${gitUsername}`);
    dispatch({
      type: GET_GITHUB_REPOSE,
      payload: response.data
    });
  } catch (err) {
    console.log(err);
    if (err.response) {
      dispatch({
        type: GITHUB_REPOSE_FETCH_ERROR,
        payload: { status: err.response.status, msg: err.response.statusText }
      });
    }
  }
};

//this function allows user to delete their profile
export const deleteProfile = history => async dispatch => {
  try {
    await axios.delete("/api/profile");
    dispatch({
      type: CLEAR_PROFILE,
      payload: {}
    });
    console.log("Profile Deleted");

    dispatch(logout());

    history.push("/login");
  } catch (errors) {
    console.log(errors);
    if (errors.response) {
      dispatch({
        type: CLEAR_PROFILE,
        payload: {}
      });
    }
  }
};

//this function create or update user profile
export const manageProfile = (
  formData,
  history,
  shouldUpdate = false
) => async dispatch => {
  try {
    let config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    console.log(formData);
    let response = await axios.post("/api/profile", formData, config);
    console.log(response);
    dispatch({
      type: GET_PROFILE,
      payload: response.data
    });
    history.push("/dashboard");
  } catch (err) {
    let errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: CLEAR_PROFILE,
      payload: {}
    });
  }
};

//this function let user add new experiences or education
export const addExperience_Education = (formData, type) => async dispatch => {
  try {
    let config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    let response = await axios.post(`/api/profile/${type}`, formData, config);
    dispatch({
      type: GET_PROFILE,
      payload: response.data
    });
  } catch (err) {
    let errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

//this function allows user to delete previously added experience or education
export const deleteExperience_Education = (id, type) => async dispatch => {
  try {
    let response = await axios.delete(`/api/profile/${type}/${id}`);
    dispatch({
      type: GET_PROFILE,
      payload: response.data
    });
  } catch (err) {
    console.log(err);
  }
};

//this function allows user to change their avatar
export const changeAvatar = avatar => async dispatch => {
  try {
    var bodyFormData = new FormData();
    bodyFormData.append("avatar", avatar);
    let response = await axios.post(`/api/profile/changeAvatar`, bodyFormData);
    console.log(response);
  } catch (err) {
    let errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    console.log(errors);
  }
};
