const express = require("express");
const Router = express.Router();
const auth = require("../middlewears/authMiddlewear");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const Profile = require("../models/Profile");
const Post = require("../models/Post");

// @Validation Rules
var validationRules = [
  check("title", "Title is required").not().isEmpty(),
  check("content", "Content is required").not().isEmpty(),
  check("contentPreview", "Ccontent Preview is required").not().isEmpty(),
  check("tags", "Tags are required").not().isEmpty()
];

// @ROUTE : POST api/post
// @DESC  : This route allows user to create or update post
// @Access : private
Router.post("/:id?", [auth, validationRules], async (req, res) => {
  //check if all the validation has been done
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const content = req.body.content.trim();
    const title = req.body.title.trim();
    const tags = req.body.tags;
    const contentPreview = req.body.contentPreview.trim();
    let userPost;
    if (req.params.id) {
      userPost = await Post.findById(req.params.id);
    }
    let post;
    if (userPost) {
      post = await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            content: content,
            title: title,
            tags: tags.split(","),
            contentPreview: contentPreview
          }
        },
        { new: true }
      );
    } else {
      //create a new post
      const user = await User.findById(req.user.id).select("-password");
      post = new Post({
        content: content,
        title: title,
        tags: tags.split(","),
        user: req.user.id,
        name: user.name,
        avatar: user.avatar,
        contentPreview: contentPreview
      });
      await post.save();
    }
    res.json(post);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @ROUTE : GET api/post
// @DESC  : This route returns all the post of users
// @Access : private
Router.get("/", auth, async (req, res) => {
  try {
    let postList = await Post.find().sort({ postDate: -1 });
    res.json(postList);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @ROUTE : GET api/post/me
// @DESC  : This route returns all the post of the current user
// @Access : private
Router.get("/me", auth, async (req, res) => {
  try {
    let postList = await Post.find({ user: req.user.id }).sort({
      postDate: -1
    });
    res.json(postList);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @ROUTE : GET api/post/:id
// @DESC  : This route will return a post based on the given id
// @Access : Private
Router.get("/:id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: [{ msg: "No post found" }] });
    }
    res.json(post);
  } catch (err) {
    console.log(err.message);
    if (err.kind == "ObjectId") {
      return res.status(404).json({ error: [{ msg: "No post found" }] });
    }
    res.status(500).send("Server Error");
  }
});

// @ROUTE  : DELETE api/post/:id
// @DESC   : This route will delete a post of the user
// @Access : Private
Router.delete("/:id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post || post.user.toString() != req.user.id) {
      return res
        .status(401)
        .json({ error: [{ msg: "User is not authorized" }] });
    }
    await Post.findOneAndRemove(req.params.id);
    res.json({ msg: "Post has been deleted" });
  } catch (err) {
    console.log(err.message);
    if (err.kind == "ObjectId") {
      return res.status(404).json({ error: [{ msg: "No post found" }] });
    }
    res.status(500).send("Server Error");
  }
});

// @ROUTE :  POST api/post/like/:id
// @DESC  :  This route will allow user like or unlike on a post
// @Access : Private
Router.put("/like/:id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(401).json({ error: [{ msg: "No post found" }] });
    }
    let likeID = post.likes
      .map(item => item.user.toString())
      .indexOf(req.user.id);
    if (likeID > -1) {
      post.likes.splice(likeID, 1);
    } else {
      post.likes.unshift({ user: req.user.id });
    }
    post.save();
    res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    if (err.kind == "ObjectId") {
      return res.status(404).json({ error: [{ msg: "No post found" }] });
    }
    res.status(500).send("Server Error");
  }
});

// @Validation Rules
validationRules = [check("text", "Test is required").not().isEmpty()];

// @ROUTE : POST api/post/comment/:id/:cid?
// @DESC  : This route allows user to create or update comment on a post
// @Access : private
Router.post("/comment/:id/:cid?", [auth, validationRules], async (req, res) => {
  //check if all the validation has been done
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { id, cid } = req.params;
    const text = req.body.text.trim();
    let post;
    if (id) {
      post = await Post.findById(id);
    }

    if (!post) {
      return res.status(404).json({ error: [{ msg: "No post found" }] });
    }

    let commentIndex = post.comments.map(item => item.id).indexOf(cid);
    let comment;

    if (commentIndex > -1) {
      let updateObj = {};
      updateObj[`comments.${commentIndex}.text`] = text;
      post = await Post.findOneAndUpdate(
        { _id: id },
        { $set: updateObj },
        { new: true }
      );
    } else {
      console.log("Entered here");
      //create a new post
      const user = await User.findById(req.user.id).select("-password");
      comment = {
        text: text.trim(),
        user: req.user.id,
        name: user.name,
        avatar: user.avatar
      };
      post.comments.unshift(comment);
      await post.save();
    }

    res.json(post.comments);
  } catch (err) {
    console.log(err.message);
    if (err.kind == "ObjectId") {
      return res.status(404).json({ error: [{ msg: "No post found" }] });
    }
    res.status(500).send("Server Error");
  }
});

// @ROUTE  : DELETE api/post/comment/:id
// @DESC   : This route will delete a comment of a post
// @Access : Private
Router.delete("/comment/:id/:cid", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: [{ msg: "No Post found" }] });
    }
    let commentIndex = post.comments
      .map(item => item.id)
      .indexOf(req.params.cid);
    if (commentIndex > -1) {
      let comment = post.comments[commentIndex];
      if (comment.user.toString() != req.user.id) {
        return res
          .status(404)
          .json({ error: [{ msg: "User is not authorized" }] });
      }
      await post.comments.splice(commentIndex, 1);
      post.save();
    } else {
      return res.status(404).json({ error: [{ msg: "No comment found" }] });
    }
    res.json({ msg: "Comment has been deleted" });
  } catch (err) {
    console.log(err.message);
    if (err.kind == "ObjectId") {
      return res.status(404).json({ error: [{ msg: "No post found" }] });
    }
    res.status(500).send("Server Error");
  }
});

// @ROUTE : POST api/post/replies/:id/:cid/:rid?
// @DESC  : This route allows user to create or update replies on a comment
// @Access : private
Router.post(
  "/replies/:id/:cid/:rid?",
  [auth, validationRules],
  async (req, res) => {
    //check if all the validation has been done
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { id, cid, rid } = req.params;
      const text = req.body.text.trim();
      let post;
      if (id) {
        post = await Post.findById(id);
      }

      if (!post) {
        return res.status(404).json({ error: [{ msg: "No post found" }] });
      }

      let commentIndex = post.comments.map(item => item.id).indexOf(cid);

      if (commentIndex <= -1) {
        return res
          .status(404)
          .json({ error: [{ msg: "The comment has been removed" }] });
      }

      let comment = post.comments[commentIndex];
      let replies = comment.replies;

      //check if there are any comment based on this id then update
      let replyIndex = rid ? replies.map(item => item.id).indexOf(rid) : -1;
      console.log(replyIndex);

      if (replyIndex > -1) {
        let updateObj = {};
        updateObj[`comments.${commentIndex}.replies.${replyIndex}.text`] = text;
        post = await Post.findOneAndUpdate(
          { _id: id },
          { $set: updateObj },
          { new: true }
        );
      } else {
        //create a new post
        const user = await User.findById(req.user.id).select("-password");
        reply = {
          text: text.trim(),
          user: req.user.id,
          name: user.name,
          avatar: user.avatar
        };
        replies.unshift(reply);
        await post.save();
      }

      res.json(replies);
    } catch (err) {
      console.log(err.message);
      if (err.kind == "ObjectId") {
        return res.status(404).json({ error: [{ msg: "No post found" }] });
      }
      res.status(500).send("Server Error");
    }
  }
);

// @ROUTE  : DELETE api/post/replies/:id
// @DESC   : This route will delete a reply from a comment
// @Access : Private
Router.delete("/replies/:id/:cid/:rid", auth, async (req, res) => {
  try {
    const { id, cid, rid } = req.params;
    let post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: [{ msg: "No Post found" }] });
    }

    let commentIndex = post.comments.map(item => item.id).indexOf(cid);

    if (commentIndex == -1) {
      return res
        .status(404)
        .json({ error: [{ msg: "The comment has been removed" }] });
    }

    let comment = post.comments[commentIndex];

    let replyIndex = comment.replies.map(item => item.id).indexOf(rid);
    if (replyIndex > -1) {
      let reply = comment.replies[replyIndex];
      if (reply.user.toString() != req.user.id) {
        return res
          .status(404)
          .json({ error: [{ msg: "User is not authorized" }] });
      }
      await comment.replies.splice(replyIndex, 1);
      post.save();
    } else {
      return res.status(404).json({ error: [{ msg: "No reply found" }] });
    }
    res.json({ msg: "Reply has been deleted" });
  } catch (err) {
    console.log(err.message);
    if (err.kind == "ObjectId") {
      return res.status(404).json({ error: [{ msg: "No post found" }] });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = Router;
