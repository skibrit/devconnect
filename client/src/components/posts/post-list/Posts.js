import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { getPosts } from "../../../actions/post";
import Spinner from "../../layouts/spinner/spinner";
import PostItem from "./PostItem";
import "./Posts.scss";

const Posts = ({
  auth: { isAuthenticated },
  posts: { posts, isLoading },
  getPosts
}) => {
  useEffect(
    () => {
      getPosts();
    },
    [getPosts]
  );

  return isLoading
    ? <Spinner />
    : <div className="section">
        <div className="page-title-wrapper">
          <h2 className="page-title">Posts</h2>
        </div>
        <div>
          <h4>
            <i className="fas fa-user" /> Welcome to the community
          </h4>
        </div>
        <div className="post-list-wrapper">
          <div className="post-list-inner-wrapper">
            {posts.map((post, i) => {
              return <PostItem key={post._id} post={post} />;
            })}
          </div>
        </div>
      </div>;
};

const mapStateToProps = states => ({
  auth: states.authStates,
  posts: states.postStates
});

const mapDispatchToProps = {
  getPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
