import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import { updateLike, deletePost } from "../../../actions/post";

const UserPost = ({
  post: { _id, title, contentPreview, likes, comments, postDate },
  userID,
  updateLike,
  deletePost
}) => {
  return (
    <div className="m-post-row">
      <div className="m-post">
        <div className="post-date">
          {" "}<span style={{ marginRight: "2px", fontWeight: "bold" }}>
            <i className="fas fa-clock" /> Posted
          </span>{" "}
          <Moment format="DD, MMM YYYY">{postDate}</Moment>
        </div>
        <div className="m-post-line">
          <a className="m-post-title">
            <Link to={`/post/${_id}`}>
              {title}
            </Link>
          </a>
        </div>
        <div className="m-post-line">
          <p className="m-post-content-preview">
            {contentPreview}
          </p>
        </div>
        <div className="m-post-action">
          <button
            className="btn btn-light"
            onClick={() => {
              updateLike(_id);
            }}
          >
            <i
              className={
                likes && likes.filter(item => item.user == userID).length == 1
                  ? "fas fa-heart liked-heart"
                  : "fas fa-heart"
              }
            />{" "}
            {likes && likes.length}
          </button>
          <Link to={`/editPost/${_id}`} className="btn btn-light">
            <i class="fas fa-edit" />
          </Link>
          <button className="btn btn-light" onClick={e => deletePost(_id)}>
            <i class="fas fa-trash-alt" />
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  post: state.postStates.posts.filter(item => item._id == ownProps.id)[0],
  userID: state.authStates.user._id
});

const mapDispatchToProps = {
  updateLike,
  deletePost
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPost);
