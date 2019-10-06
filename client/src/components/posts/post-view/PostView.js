import React, { useEffect, Fragment, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Spinner from "../../layouts/spinner/spinner";
import CommentList from "./CommentList";
import CommentBox from "./CommentBox";
import {
  getPostDetail,
  updateLike,
  deletePost,
  setEditMode
} from "../../../actions/post";
import Moment from "react-moment";
import ErrorComponent from "../../layouts/error/ErrorComponent";
import EditPost from "../post-form/EditPost";
import "./postView.scss";

const PostView = React.memo(
  ({
    getPostDetail,
    updateLike,
    deletePost,
    location: { pathname },
    post: {
      isLoading,
      cPost: {
        _id,
        tags,
        postDate,
        content,
        title,
        user,
        likes,
        name,
        avatar,
        comments
      },
      editMode
    },
    auth: { user: { _id: userID } },
    history
  }) => {
    const [contentLoaded, setContentLoaded] = useState(false);

    useEffect(() => {
      console.log("Post View Has Rendered");
    });

    useEffect(
      () => {
        const arr = pathname.split("/");
        if (arr[2]) {
          getPostDetail(arr[2]);
        }
      },
      [getPostDetail]
    );

    useEffect(
      () => {
        if (content) {
          const postEl = document.querySelector(".post-content");
          postEl && postEl.insertAdjacentHTML("afterend", content);
          //setContentLoaded(true);
        }
      },
      [content]
    );

    return isLoading
      ? <Spinner />
      : !content
        ? <ErrorComponent title="404 Not found" msg="No post found" />
        : <div className="section">
            {user && userID && editMode
              ? <EditPost />
              : <div className="s-post-wrapper">
                  <div className="post-header">
                    <h2 className="post-title ">
                      {title}
                    </h2>
                    <div className="posted-by-wrapper">
                      <span style={{ marginRight: "10px", fontWeight: "bold" }}>
                        By
                      </span>
                      <div className="posted-by-pic-wrapper">
                        <div className="posted-by-pic">
                          <img src={avatar} alt="photo" />
                        </div>
                      </div>
                      <div className="posted-by-title-wrapper">
                        <h3 className="posted-by">
                          {name}
                        </h3>
                      </div>
                    </div>
                    <h5 className="posted-on">
                      {" "}<span
                        style={{ marginRight: "5px", fontWeight: "bold" }}
                      >
                        <i className="fas fa-clock" /> Posted On
                      </span>{" "}
                      <Moment format="DD, MMM YYYY">{postDate}</Moment>
                    </h5>
                  </div>
                  <div className="post-content-wrapper">
                    <div className="post-content" />
                  </div>

                  <div className="post-view-actions">
                    <button
                      className="btn btn-light"
                      onClick={() => {
                        updateLike(_id, true);
                      }}
                    >
                      <i
                        className={
                          likes &&
                          likes.filter(item => item.user == userID).length == 1
                            ? "fas fa-heart liked-heart"
                            : "fas fa-heart"
                        }
                      />{" "}
                      {likes && likes.length}
                    </button>
                    {user == userID &&
                      <Fragment>
                        <button
                          className="btn btn-light"
                          onClick={() => {
                            history.push(`/editPost/${_id}`);
                          }}
                        >
                          <i className="fas fa-edit" />
                        </button>
                        <button
                          className="btn btn-light"
                          onClick={e => deletePost(_id, true)}
                        >
                          <i className="fas fa-trash-alt" />
                        </button>
                      </Fragment>}
                  </div>

                  <div className="post-footer-section">
                    <CommentBox postID={_id} />
                    <div className="discussion-wrapper">
                      {comments && comments.length > 0
                        ? <Fragment>
                            <h3 className="title">Discussions</h3>
                            <CommentList />
                          </Fragment>
                        : <Fragment>
                            <div className="default-box">
                              <h3 className="default-text">
                                Start a new discussion
                              </h3>
                            </div>
                          </Fragment>}
                    </div>
                  </div>
                </div>}
          </div>;
  },
  (prevProps, nextProps) => {
    if (prevProps.post.cPost._id != nextProps.post.cPost._id) {
      return false;
    } else if (
      (prevProps.post.cPost.comments &&
        prevProps.post.cPost.comments.length > 0 &&
        nextProps.post.cPost.comments &&
        nextProps.post.cPost.comments.length == 0) ||
      (prevProps.post.cPost.comments &&
        prevProps.post.cPost.comments.length == 0 &&
        nextProps.post.cPost.comments &&
        nextProps.post.cPost.comments.length > 0)
    ) {
      return false;
    } else if (
      nextProps.post.cPost.likes &&
      prevProps.post.cPost.likes &&
      prevProps.post.cPost.likes.length != nextProps.post.cPost.likes.length
    ) {
      return false;
    } else if (prevProps.post.isLoading != nextProps.post.isLoading) {
      return false;
    }
    return true;
  }
);

const mapStateToProps = state => ({
  auth: state.authStates,
  post: state.postStates
});

const mapDispatchToProps = {
  getPostDetail,
  updateLike,
  deletePost,
  setEditMode
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(PostView)
);
