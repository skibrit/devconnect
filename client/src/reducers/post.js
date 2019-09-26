import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKE,
  ADD_COMMENT,
  DELETE_COMMENT,
  COMMENT_ERROR,
  GET_POST_DETAIL,
  UPDATE_COMMENT_BOX
} from "../actions/constants";
import { stat } from "fs";

const defaultStates = {
  posts: [],
  cPost: {},
  isLoading: true,
  errors: {},
  commentBox: { commentID: null, text: "" }
};

export default (state = defaultStates, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return { ...state, posts: payload, isLoading: false };
    case GET_POST_DETAIL:
      return { ...state, cPost: payload, isLoading: false };
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
      return {
        ...state,
        posts: state.posts.map(
          item =>
            item._id == payload.id ? { ...item, likes: payload.likes } : item
        )
      };
    case POST_ERROR:
      return { ...state, posts: null, errors: payload, isLoading: false };
    default:
      return state;
  }
};
