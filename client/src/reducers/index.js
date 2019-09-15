import {combineReducers} from "redux";
import alertStates from "./alertReducer";
import userStates from "./userReducer";
import authStates from "./auth";
import profileStates from "./profile";
import globalStates from "./globalReducer";
export default combineReducers({
    alertStates,
    userStates,
    authStates,
    profileStates,
    globalStates
})