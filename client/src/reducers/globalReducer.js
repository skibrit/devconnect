import {
  OPEN_MODAL,
  CLOSE_MODAL,
  ADD_LOADER,
  REMOVE_LOADER
} from "../actions/constants";

const defaultState = {
  openModal: [],
  loaders: []
};

export default (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case OPEN_MODAL:
      return { ...state, openModal: [...state.openModal, payload] };
    case CLOSE_MODAL:
      return {
        ...state,
        openModal: state.openModal.filter(item => item != payload)
      };
    case ADD_LOADER:
      return { ...state, loaders: [...state.loaders, payload] };
    case REMOVE_LOADER:
      return {
        ...state,
        loaders: state.loaders.filter(item => item != payload)
      };
    default:
      return state;
  }
};
