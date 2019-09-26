import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import CommentItem from "./CommentItem";
import { connect } from "react-redux";

const Comment = React.memo(
  ({ comment, postID, cID }) => {
    const [firstLoaded, setFirstLoaded] = useState(false);
    const [showReplyBox, toggleReplyBox] = useState(false);
    const sComment = useRef(null);
    useEffect(() => {
      console.log(`Comment-${comment._id} has rendered`);
    });
    useEffect(
      () => {
        if (comment.text && firstLoaded) {
          //document.getElementById('mainHeader').focus();
          sComment.current.style.outline = "dotted";
          sComment.current.focus();

          setTimeout(() => {
            sComment.current.style.outline = "none";
          }, 1000);
        } else {
          setFirstLoaded(true);
        }
      },
      [comment.text]
    );

    const replyBoxToggleHandler = () => {
      toggleReplyBox(preState => {
        return !preState;
      });
    };

    return (
      <div className="s-comment" tabIndex="0" ref={sComment}>
        <CommentItem
          replyBoxToggleHandler={replyBoxToggleHandler}
          comment={comment}
          postID={postID}
        />
        <div className="reply-list-wrapper">
          <div className="reply-list" />
          {showReplyBox &&
            <div className="reply-box-wrapper">
              <small>
                <i class="fas fa-reply" /> Replying to JohnDaw
              </small>
              <textarea className="form-control" rows="2" />
            </div>}
        </div>
      </div>
    );
  },
  (prevProps, newProps) => {
    if (prevProps.comment.text != newProps.comment.text) {
      return false;
    }
    return true;
  }
);

const mapStateToProps = (state, ownProps) => ({
  comment: state.postStates.cPost.comments.filter(
    item => item._id == ownProps.cID
  )[0],
  postID: state.postStates.cPost._id
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
