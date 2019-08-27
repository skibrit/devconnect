const express = require("express");
const Router = express.Router();
const auth = require("../middlewears/authMiddlewear");
const { check, validationResult } = require('express-validator');
const User = require("../models/User");
const Profile = require("../models/Profile");
const Post = require("../models/Post");

// @Validation Rules
var validationRules = [
    check('text',"Test is required").not().isEmpty(),
];

// @ROUTE : POST api/post
// @DESC  : This route allows user to create or update post
// @Access : Public
Router.post('/:id?',[auth,validationRules],async (req,res)=>{
    //check if all the validation has been done
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        const text = req.body.text.trim();
        let post ;
        if(req.params.id){
            post = await Post.findById(req.params.id);
        }
        if(post){
            //update previously posted post
            post.text = text;
        }else{
            //create a new post
            const user = await User.findById(req.user.id).select("-password");
            post = new Post({
                text:text.trim(),
                user:req.user.id,
                name:user.name,
                avatar:user.avatar
            });
        }
        await post.save();
        res.json(post);
    }catch (err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});



// @ROUTE : GET api/post
// @DESC  : This route returns all the post of users
// @Access : Public
Router.get('/',async (req,res)=>{
    try{
        let postList = await Post.find().sort({postDate:-1});
        res.json(postList);
    }catch (err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});


// @ROUTE : DELETE api/post/:id
// @DESC  : This route will delete a post of the user
// @Access : Private
Router.get('/:id',auth,async (req,res)=>{
    try{
        let post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({error:[{"msg":"No post found"}]});
        }
        res.json(post);
    }catch (err){
        console.log(err.message);
        if(err.kind=="ObjectId"){
            return res.status(404).json({error:[{"msg":"No post found"}]});
        }
        res.status(500).send("Server Error");
    }
});


// @ROUTE  : DELETE api/post/:id
// @DESC   : This route will delete a post of the user
// @Access : Private
Router.delete('/:id',auth,async (req,res)=>{
    try{
        let post = await Post.findById(req.params.id);

        if(!post || post.user.toString()!=req.user.id){
            return res.status(401).json({error:[{msg:"User is not authorized"}]});
        }
        await Post.findOneAndRemove(req.params.id);
        res.json({"msg":"Post has been deleted"});
    }catch (err){
        console.log(err.message);
        if(err.kind=="ObjectId"){
            return res.status(404).json({error:[{"msg":"No post found"}]});
        }
        res.status(500).send("Server Error");
    }
});



// @ROUTE :  DELETE api/post/like/:id
// @DESC  :  This route will allow user like or unlike on a post
// @Access : Private
Router.post('/like/:id',auth,async (req,res)=>{
    try{
        let post = await Post.findById(req.params.id);
        if(!post){
            return res.status(401).json({error:[{msg:"No post found"}]});
        }
        let likeID = post.likes.map(item=>item.user.toString()).indexOf(req.user.id);
        if(likeID>-1){
            post.likes.splice(likeID,1);
        }else{
            post.likes.unshift({user:req.user.id});
        }
        post.save();
        res.json(post.likes)
    }catch (err){
        console.log(err.message);
        if(err.kind=="ObjectId"){
            return res.status(404).json({error:[{"msg":"No post found"}]});
        }
        res.status(500).send("Server Error");
    }
});




// @Validation Rules
validationRules = [
    check('text',"Test is required").not().isEmpty(),
];

// @ROUTE : POST api/post/comment/:id/:cid?
// @DESC  : This route allows user to create or update comment on a post
// @Access : Public
Router.post('/comment/:id/:cid?',[auth,validationRules],async (req,res)=>{
    //check if all the validation has been done
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        console.log(req.params.id);
        const text = req.body.text.trim();
        let post ;
        if(req.params.id){
            post = await Post.findById(req.params.id);
        }

        if(!post){
            return res.status(404).json({error:[{"msg":"No post found"}]});
        }

        let comment;

        if(req.params.cid){
            //check of there is any comment based on this id then update
            let commentIndex = post.comments.map(item=>item.id).indexOf(req.params.cid);
            if(commentIndex>-1){
                comment = post.comments[commentIndex];
                if( comment.user.toString()==req.user.id){
                    comment.text =text;
                }else{
                    comment = null;
                }
            }
        }else{
            console.log("Entered here")
            //create a new post
            const user = await User.findById(req.user.id).select("-password");
            comment = {
                text:text.trim(),
                user:req.user.id,
                name:user.name,
                avatar:user.avatar
            };
            post.comments.unshift(comment);
        }
        await post.save();
        res.json(post.comments);
    }catch (err){
        console.log(err.message);
        if(err.kind=="ObjectId"){
            return res.status(404).json({error:[{"msg":"No post found"}]});
        }
        res.status(500).send("Server Error");
    }
});



// @ROUTE  : DELETE api/post/comment/:id
// @DESC   : This route will delete a post of the user
// @Access : Private
Router.delete('/comment/:id/:cid',auth,async (req,res)=>{
    try{
        let post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({error:[{msg:"No Post found"}]});
        }
        let commentIndex = post.comments.map(item=>item.id).indexOf(req.params.cid);
        if(commentIndex>-1){
            let comment = post.comments[commentIndex];
            if(comment.user.toString()!=req.user.id){
                return res.status(404).json({error:[{msg:"User is not authorized"}]})
            }
            await post.comments.splice(commentIndex,1);
            post.save();
        }else{
            return res.status(404).json({error:[{msg:"No comment found"}]})
        }
        res.json({"msg":"Comment has been deleted"});
    }catch (err){
        console.log(err.message);
        if(err.kind=="ObjectId"){
            return res.status(404).json({error:[{"msg":"No post found"}]});
        }
        res.status(500).send("Server Error");
    }
});


module.exports = Router;