import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKE,
  ADD_COMMENT,
  DELETE_COMMENT,
  COMMENT_ERROR,
  GET_POST_DETAIL,
  UPDATE_COMMENT_BOX
} from "./constants";
import { setAlert } from "./alert";
import axios from "axios";

export const getPosts = () => async dispatch => {
  try {
    let response = await axios.get("/api/post");
    dispatch({
      type: GET_POSTS,
      payload: response.data
    });
  } catch (err) {
    if (err.response) {
      dispatch({
        type: POST_ERROR,
        payload: { status: err.response.status, msg: err.response.statusText }
      });
    }
  }
};

export const getPostDetail = id => async dispatch => {
  try {
    let response = await axios.get(`/api/post/${id}`);
    dispatch({
      type: GET_POST_DETAIL,
      payload: response.data
    });
  } catch (err) {
    if (err.response) {
      dispatch({
        type: POST_ERROR,
        payload: { status: err.response.status, msg: err.response.statusText }
      });
    }
  }
};

export const updateLike = postID => async dispatch => {
  try {
    let response = await axios.put(`/api/post/like/${postID}`);
    dispatch({
      type: UPDATE_LIKE,
      payload: { id: postID, likes: response.data }
    });
    console.log(response);
  } catch (err) {
    if (err.response) {
      console.log(err);
    }
  }
};

export const managePost = (
  title,
  content,
  tags,
  contentPreview
) => async dispatch => {
  try {
    let config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    let body = { title, content, tags, contentPreview };
    let response = await axios.post(`/api/post/`, body, config);
    console.log(response);
    dispatch(setAlert("Post has been published", "success"));
  } catch (err) {
    let errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

export const manageComment = (postID, text, commentID) => async dispatch => {
  try {
    let config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    let body = { postID, text };
    let urlFirst = "/api/post/comment/";
    let url = commentID
      ? `${urlFirst}${postID}/${commentID}`
      : `${urlFirst}/${postID}`;
    let response = await axios.post(url, body, config);
    dispatch({
      type: ADD_COMMENT,
      payload: response.data
    });

    dispatch({
      type: UPDATE_COMMENT_BOX,
      payload: { commentID: null, text: "" }
    });
  } catch (err) {
    if (err.response) {
      let errors = err.response.data.errors;
      console.log(errors);
      dispatch({
        type: COMMENT_ERROR,
        payload: errors
      });
    }
  }
};

export const deleteComment = (postID, commentID) => async dispatch => {
  try {
    let response = await axios.delete(
      `/api/post/comment/${postID}/${commentID}`
    );
    dispatch({
      type: DELETE_COMMENT,
      payload: commentID
    });
  } catch (err) {
    if (err.response) {
      let errors = err.response.data.errors;
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
      }
    }
  }
};

export const updateCommentBox = (text, commentID) => dispatch => {
  dispatch({
    type: UPDATE_COMMENT_BOX,
    payload: { text, commentID }
  });
};
