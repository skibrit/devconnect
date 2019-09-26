import React, { useState, useRef, useEffect } from "react";
import { manageComment, updateCommentBox } from "../../../actions/post";
import { connect } from "react-redux";
import { STATES } from "mongoose";

const CommentBox = ({
  manageComment,
  postID,
  commentBoxData,
  updateCommentBox
}) => {
  const commentBox = useRef(null);
  const { commentID, text } = commentBoxData;

  useEffect(
    () => {
      if (commentID) {
        commentBox.current.focus();
      }
    },
    [commentID]
  );

  const commentHandler = e => {
    if (text && text.trim() != "") {
      manageComment(postID, text, commentID);
    }
  };

  return (
    <div className="comment-box-wrapper">
      <h3 className="comment-box-title title">Write a Comment</h3>
      <textarea
        className="form-control"
        rows="4"
        value={text}
        onChange={e => {
          let value = e.target.value;
          updateCommentBox(value, commentID);
        }}
        ref={commentBox}
      />
      <div className="comment-submit-btn-wrapper">
        <button className="btn btn-secondary" onClick={commentHandler}>
          Submit
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  commentBoxData: state.postStates.commentBox
});

const mapDispatchToProps = {
  manageComment,
  updateCommentBox
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentBox);
