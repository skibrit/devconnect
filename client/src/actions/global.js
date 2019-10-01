import {
  OPEN_MODAL,
  CLOSE_MODAL,
  ADD_LOADER,
  REMOVE_LOADER
} from "./constants";

export const openModal = modalName => dispatch => {
  dispatch({
    type: OPEN_MODAL,
    payload: modalName
  });
};

export const closeModal = modalName => dispatch => {
  dispatch({
    type: CLOSE_MODAL,
    payload: modalName
  });
};

export const addLoader = loaderName => dispatch => {
  dispatch({
    type: ADD_LOADER,
    payload: loaderName
  });
};

export const removeLoader = loaderName => dispatch => {
  dispatch({
    type: REMOVE_LOADER,
    payload: loaderName
  });
};
