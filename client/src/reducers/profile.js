import {
  GET_PROFILE,
  GET_PROFILE_ERROR,
  CLEAR_PROFILE,
  GET_ALL_PROFILES,
  GET_ALL_PROFILES_ERROR,
  GET_GITHUB_REPOSE,
  GITHUB_REPOSE_FETCH_ERROR
} from "../actions/constants";

const defaultStates = {
  profileList: [],
  profile: null,
  isLoading: true,
  errors: null
};

export default (state = defaultStates, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
      return { ...state, profile: payload, isLoading: false };
    case GET_PROFILE_ERROR:
      return { ...state, errors: payload, isLoading: false };
    case CLEAR_PROFILE:
      return { ...state, profile: null, errors: null, isLoading: true };
    case GET_ALL_PROFILES:
      return { ...state, profileList: payload, isLoading: false };
    case GET_ALL_PROFILES_ERROR:
      return { ...state, profileList: [], errors: payload, isLoading: false };
    case GET_GITHUB_REPOSE:
      return { ...state, profile: { ...state.profile, repose: payload } };
    case GITHUB_REPOSE_FETCH_ERROR:
      return {
        ...state,
        profile: { ...state.profile, repos: null },
        errors: payload
      };
    default:
      return state;
  }
};
