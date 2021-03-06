import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import ReactTags from "react-tag-autocomplete";
import { setAlert } from "../../../actions/alert";
import { EditorState, ContentState } from "draft-js";
import DraftPasteProcessor from "draft-js/lib/DraftPasteProcessor";
import { Editor } from "react-draft-wysiwyg";
import { stateToHTML } from "draft-js-export-html";
import {
  managePost,
  getPostDetail,
  setPostPreview
} from "../../../actions/post";
import { addLoader } from "../../../actions/global";
import FormLoader from "../../layouts/formLoader/FormLoader";
import Spinner from "../../layouts/spinner/spinner";
import PostPreview from "../post-view/PostPreview";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./reactTag.scss";
//import "react-tag-autocomplete/s"

const componentName = "postForm";

const EditPost = ({
  setAlert,
  managePost,
  addLoader,
  setPostPreview,
  isProcessing,
  location: { pathname },
  getPostDetail,
  post: { cPost, isLoading, previewPost, editMode },
  history,
  auth: { name, avatar }
}) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: ""
  });

  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );

  const [tagData, setTagData] = useState({
    tags: [],
    suggestions: [
      { id: 3, name: "Bananas" },
      { id: 4, name: "Mangos" },
      { id: 5, name: "Lemons" },
      { id: 6, name: "Apricots" }
    ]
  });

  const { title } = formData;
  const { tags, suggestions } = tagData;

  useEffect(
    () => {
      const arr = pathname.split("/");
      if (arr[2]) {
        getPostDetail(arr[2]);
        console.log("Got Data");
      }
    },
    [getPostDetail]
  );

  useEffect(
    () => {
      if (!isLoading && cPost && cPost.content) {
        setFormData({
          title: cPost.title,
          content: cPost.content,
          tags: cPost.tags
        });
        setTagData({
          ...tagData,
          tags: cPost.tags.map((t, i) => {
            return { id: i + 1, name: t };
          })
        });
        const contentHTML = DraftPasteProcessor.processHTML(cPost.content);
        setEditorState(
          EditorState.createWithContent(
            ContentState.createFromBlockArray(contentHTML)
          )
        );
      }
    },
    [isLoading, cPost.content]
  );

  const KeyCodes = {
    comma: 188,
    enter: 13
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  const onEditorChange = value => {
    setEditorState(value);
  };

  const onValueChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleDelete = i => {
    const tagList = tags.slice(0);
    tagList.splice(i, 1);
    setTagData({ ...tagData, tags: tagList });
  };

  const handleAddition = tag => {
    const tagList = [...tags, tag];
    setTagData({ ...tagData, tags: tagList });
  };

  const onSubmit = e => {
    e.preventDefault();
    try {
      let minWordCount = 200;
      let content = stateToHTML(editorState.getCurrentContent());
      let contentText = editorState.getCurrentContent().getPlainText("");
      var contentLength = contentText.length;
      if (contentLength > minWordCount) {
        if (tags.length == 0) {
          throw "You need add atleast one tag for your post";
        }
        if (tags.length > 5) {
          throw "You can add 5 tags max";
        }

        let contentPreview = contentText.substring(0, minWordCount);

        addLoader(componentName);

        managePost(
          title,
          content,
          tags.map(item => item.name).join(","),
          contentPreview,
          history,
          cPost._id
        );
      } else {
        throw "Please enter some content for your post";
      }
    } catch (e) {
      setAlert(e.toString(), "danger");
    }
  };

  const previewPostHandler = () => {
    try {
      let minWordCount = 200;
      let content = stateToHTML(editorState.getCurrentContent());
      let contentText = editorState.getCurrentContent().getPlainText("");
      var contentLength = contentText.length;
      if (title == "") {
        throw "Please enter a title for your post";
      }
      if (contentLength > minWordCount) {
        if (tags.length == 0) {
          throw "You need add atLeast one tag for your post to preview";
        }
        if (tags.length > 5) {
          throw "You can add 5 tags max";
        }
        setPostPreview({
          title,
          content,
          tags: tags.map(item => item.name).join(","),
          postDate: new Date(),
          name: name,
          avatar: avatar
        });
      } else {
        throw "Please enter some content for your post";
      }
    } catch (e) {
      setAlert(e.toString(), "danger");
    }
  };

  return (
    <Fragment>
      {isLoading
        ? <Spinner />
        : <div className="section">
            {previewPost.content
              ? <PostPreview />
              : <Fragment>
                  <div className="page-title-wrapper">
                    <h2 className="page-title">Edit Post</h2>
                  </div>
                  <div className="form-wrapper">
                    {isProcessing && <FormLoader />}
                    <form onSubmit={onSubmit}>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="title"
                          name="title"
                          value={title}
                          onChange={onValueChange}
                          placeholder=" Title of your post ex. coding is awesome"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <Editor
                          editorState={editorState}
                          toolbarClassName="toolbarClassName"
                          wrapperClassName="wrapperClassName"
                          editorClassName="editorClassName"
                          onEditorStateChange={onEditorChange}
                        />
                      </div>
                      <div className="form-group">
                        <ReactTags
                          tags={tags}
                          suggestions={suggestions}
                          handleDelete={handleDelete}
                          handleAddition={handleAddition}
                          delimiters={delimiters}
                          inputFieldPosition="inline"
                          placeholder="Add Tag"
                        />
                        <span className="input-clue">
                          Add atleast one tag. Max 5 allowed
                        </span>
                      </div>
                      <div className="form-group form-btn-wrapper">
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => {
                            previewPostHandler();
                          }}
                        >
                          Preview
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => {
                            setFormData({
                              title: "",
                              content: "",
                              tags: ""
                            });
                            setEditorState(EditorState.createEmpty());
                            setTagData({ ...tagData, tags: [] });
                          }}
                        >
                          Reset
                        </button>
                        <Link
                          to="/dashboard"
                          type="button"
                          className="btn btn-primary"
                        >
                          <i className="fas fa-arrow-left" /> Go Back
                        </Link>
                      </div>
                    </form>
                  </div>
                </Fragment>}
          </div>}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.authStates,
  post: state.postStates,
  isProcessing:
    state.globalStates.loaders.indexOf(componentName) > -1 ? true : false
});

const mapDispatchToProps = {
  setAlert,
  managePost,
  getPostDetail,
  addLoader,
  setPostPreview
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(EditPost)
);
