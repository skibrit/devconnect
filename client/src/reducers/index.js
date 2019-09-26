import { combineReducers } from "redux";
import alertStates from "./alertReducer";
import userStates from "./userReducer";
import authStates from "./auth";
import profileStates from "./profile";
import globalStates from "./globalReducer";
import postStates from "./post";
export default combineReducers({
  alertStates,
  userStates,
  authStates,
  profileStates,
  globalStates,
  postStates
});
