import {combineReducers} from "redux";
import alertStates from "./alertReducer";
import userStates from "./userReducer";
import authStates from "./auth";
export default combineReducers({
    alertStates,
    userStates,
    authStates
})