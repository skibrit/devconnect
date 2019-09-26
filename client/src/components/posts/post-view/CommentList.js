import React, { useEffect } from "react";
import Comment from "./Comment";
import { connect } from "react-redux";

const CommentList = React.memo(
  ({ comments }) => {
    useEffect(() => {
      console.log(`Comment List Rendered`);
    });

    return (
      <div className="comment-list-wrapper">
        <div className="comment-list">
          {comments.map(comment => {
            const id = comment._id;
            return <Comment key={id} cID={id} />;
          })}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    console.log("comment list prop render");
    if (prevProps.comments.length != nextProps.comments.length) {
      return false;
    }
    return true;
  }
);

const mapStateToProps = state => ({
  comments:
    state.postStates.cPost && state.postStates.cPost.comments
      ? state.postStates.cPost.comments
      : []
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
