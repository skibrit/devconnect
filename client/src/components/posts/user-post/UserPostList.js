import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { getMyPosts } from "../../../actions/post";
import Spinner from "../../layouts/spinner/spinner";
import UserPost from "./UserPost";
import "./userpost.scss";

const UserPostList = ({ posts: { posts, isLoading }, getMyPosts }) => {
  useEffect(
    () => {
      getMyPosts();
    },
    [getMyPosts]
  );

  return isLoading
    ? <Spinner />
    : <div className="section">
        <div className="page-title-wrapper">
          <h2 className="page-title">My Posts</h2>
        </div>
        <div className="my-post-list-wrapper">
          <div className="my-post-list-inner-wrapper">
            {posts.map(({ _id }) => {
              return <UserPost id={_id} key={_id} />;
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
  getMyPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPostList);
