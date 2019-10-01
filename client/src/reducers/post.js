import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKE,
  ADD_COMMENT,
  DELETE_COMMENT,
  COMMENT_ERROR,
  GET_POST_DETAIL,
  UPDATE_COMMENT_BOX,
  POST_DELETED,
  CLEAR_POST,
  SET_POST_PREVIEW,
  SET_EDIT_MODE
} from "../actions/constants";
import { stat } from "fs";

const defaultStates = {
  posts: [],
  cPost: {},
  isLoading: true,
  errors: {},
  commentBox: { commentID: null, text: "" },
  previewPost: {},
  editMode: null
};

export default (state = defaultStates, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return { ...state, posts: payload, isLoading: false };
    case GET_POST_DETAIL:
      return { ...state, cPost: payload, isLoading: false };
    case CLEAR_POST:
      return { ...state, cPost: {}, posts: [], isLoading: false };
    case SET_POST_PREVIEW:
      return { ...state, previewPost: payload };
    case SET_EDIT_MODE:
      return { ...state, editMode: payload };
    case POST_DELETED:
      if (payload.isSingle) {
        return { ...state, cPost: {} };
      } else {
        return {
          ...state,
          posts: state.posts.filter(item => item._id != payload.postID)
        };
      }
    case ADD_COMMENT:
      return {
        ...state,
        cPost: { ...state.cPost, comments: payload }
      };
    case UPDATE_COMMENT_BOX:
      return {
        ...state,
        commentBox: { commentID: payload.commentID, text: payload.text }
      };
    case DELETE_COMMENT:
      return {
        ...state,
        cPost: {
          ...state.cPost,
          comments: [
            ...state.cPost.comments.filter(comment => comment._id != payload)
          ]
        }
      };
    case UPDATE_LIKE:
      if (payload.isSingle) {
        return {
          ...state,
          cPost: { ...state.cPost, likes: payload.likes }
        };
      } else {
        return {
          ...state,
          posts: state.posts.map(
            item =>
              item._id == payload.id ? { ...item, likes: payload.likes } : item
          )
        };
      }

    case POST_ERROR:
      return { ...state, posts: null, errors: payload, isLoading: false };
    default:
      return state;
  }
};
