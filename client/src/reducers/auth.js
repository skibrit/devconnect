import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  USER_AUTHENTICATED,
  USER_AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT
} from "../actions/constants";

const defaultStates = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: true,
  user: null
};

export default (state = defaultStates, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: payload
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return { ...state, ...payload, isAuthenticated: true, isLoading: false };
    case REGISTER_FAILED:
    case USER_AUTH_ERROR:
    case LOGIN_FAILED:
    case LOGOUT:
      localStorage.removeItem("token");
      return { ...state, isAuthenticated: false, isLoading: false };
    default:
      return state;
  }
};
