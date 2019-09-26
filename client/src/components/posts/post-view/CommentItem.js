import React, { useEffect } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteComment, updateCommentBox } from "../../../actions/post";

const CommentItem = ({
  replyBoxToggleHandler,
  isReply,
  comment: { _id, user, name, avatar, text, commentDate },
  deleteComment,
  postID,
  updateCommentBox
}) => {
  useEffect(() => {
    console.log(`Comment-${_id} Item has rendered`);
  });

  return (
    <div className="s-row" id={`comment-${_id}`}>
      <div className="left-column">
        <div className="pro-pic-wrapper">
          <img src={avatar} alt="pic" />
        </div>
      </div>
      <div className="right-column">
        <div className="row-wrapper">
          <h3 className="user-title">
            <a href="#">
              {name}
            </a>
          </h3>
        </div>
        <div className="row-wrapper">
          <h4 className="time-date">
            <i class="fas fa-clock" />{" "}
            <Moment format="DD, MMM YYYY">{commentDate}</Moment>
          </h4>
        </div>
        <div>
          <p className="content">
            {text}
          </p>
        </div>

        <div className="action-wrapper">
          <div className="action-btn" onClick={replyBoxToggleHandler}>
            <i class="fas fa-reply" />
          </div>
          <div
            className="action-btn"
            onClick={() => {
              updateCommentBox(text, _id);
            }}
          >
            <i class="fas fa-edit" />
          </div>
          <div className="action-btn">
            <i
              class="fas fa-trash-alt"
              onClick={() => {
                deleteComment(postID, _id);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  deleteComment,
  updateCommentBox
};

export default connect(null, mapDispatchToProps)(CommentItem);
