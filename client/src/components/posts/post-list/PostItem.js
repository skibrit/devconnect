import React, { useEffect } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { updateLike } from "../../../actions/post";
import { Link } from "react-router-dom";

const PostItem = ({
  post: { postDate, _id, contentPreview, title, name, avatar, likes, comments },
  updateLike,
  auth: { user: { _id: userID }, isAuthenticated }
}) => {
  return (
    <div className="post-row" id={`post-${_id}`}>
      <div className="post-inner-wrapper">
        <div className="post-left-column">
          <div className="posted-by-user-photo-wrapper">
            <div className="posted-by-user-photo">
              <img src={avatar} alt="photo" />
            </div>
          </div>
          <h4 className="posted-by-user-title">
            {name}
          </h4>
        </div>
        <div className="post-right-column">
          <div className="post-data-wrapper">
            <h2 className="post-title">
              <Link to={`/post/${_id}`} href="#">
                {title}
              </Link>
            </h2>
            <h4 className="posted-by-name">
              by <span>{name}</span>
            </h4>
            <p className="post-desc">
              {contentPreview}
            </p>
            <h5 className="post-date">
              <Moment format="DD, MMM YYYY">
                {postDate}
              </Moment>
            </h5>
            <div className="post-action-wrapper">
              <button
                className="btn btn-light"
                onClick={() => {
                  updateLike(_id);
                }}
              >
                <i
                  className={
                    likes.filter(item => item.user == userID).length == 1
                      ? "fas fa-heart liked-heart"
                      : "fas fa-heart"
                  }
                />{" "}
                {likes.length}
              </button>
              <button className="btn btn-primary">
                Discussions {comments.length}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.authStates
});

const mapDispatchToProps = {
  updateLike
};

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
