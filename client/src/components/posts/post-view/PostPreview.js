import React, { useEffect, Fragment, useState } from "react";
import { connect } from "react-redux";
import { setPostPreview } from "../../../actions/post";
import Moment from "react-moment";
import "./postView.scss";

const PostPreview = ({
  previewPost: { postDate, content, title, name, avatar },
  setPostPreview
}) => {
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    if (content) {
      const postEl = document.querySelector(".post-content");
      postEl && postEl.insertAdjacentHTML("afterend", content);
    }
  }, []);

  return (
    <div className="section">
      <div className="s-post-wrapper">
        <button
          className="close-btn btn btn-danger"
          style={{ position: "absolute", top: "10px", right: "0px" }}
          onClick={() => {
            setPostPreview({});
          }}
        >
          Close
        </button>
        <div className="post-header">
          <h2 className="post-title">
            {title}
          </h2>
          <div className="posted-by-wrapper">
            <span style={{ marginRight: "10px", fontWeight: "bold" }}>By</span>
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
            {" "}<span style={{ marginRight: "5px", fontWeight: "bold" }}>
              <i className="fas fa-clock" /> Posted On
            </span>{" "}
            <Moment format="DD, MMM YYYY">{postDate}</Moment>
          </h5>
        </div>
        <div className="post-content-wrapper">
          <div className="post-content" />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  previewPost: state.postStates.previewPost
});

const mapDispatchToProps = {
  setPostPreview
};

export default connect(mapStateToProps, mapDispatchToProps)(PostPreview);
