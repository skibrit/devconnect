import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ReactTags from "react-tag-autocomplete";
import { setAlert } from "../../../actions/alert";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { stateToHTML } from "draft-js-export-html";
import { managePost } from "../../../actions/post";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./reactTag.scss";
//import "react-tag-autocomplete/s"

const CreatePost = ({ setAlert, managePost }) => {
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

        managePost(
          title,
          content,
          tags.map(item => item.name).join(","),
          contentPreview
        );
      } else {
        throw "Please enter some content for your post";
      }
    } catch (e) {
      setAlert(e.toString(), "danger");
    }
  };

  return (
    <div className="section">
      <div className="page-title-wrapper">
        <h2 className="page-title">Create New Post</h2>
      </div>
      <div>
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
            <button type="button" className="btn btn-primary">
              Preview
            </button>
            <button type="button" className="btn btn-primary">
              Reset
            </button>
            <Link to="/dashboard" type="button" className="btn btn-primary">
              <i className="fas fa-arrow-left" /> Go Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  setAlert,
  managePost
};

export default connect(null, mapDispatchToProps)(CreatePost);
