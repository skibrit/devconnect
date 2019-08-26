const express = require("express");
const Router = express.Router();
const auth = require("../middlewears/authMiddlewear");
const { check, validationResult } = require('express-validator');
const User = require("../models/User");
const Profile = require("../models/Profile");


// @ROUTE : GET api/profile/inspect
// @DESC  : This route with return the profile information of an user
// @Access : Private
Router.get("/me",auth,async (req,res)=>{
    try{
        let userProfile = await Profile.findOne({user:req.user.id}).populate("user",["name","avatar"])
        if(!userProfile){
            return res.status(400).json({ errors: [{msg:"No profile found of this user"}] });
        }
        res.json(userProfile);
    }catch (err){
        console.log(err.message);
        res.status(500).send("Server error");
    }
});


// @Validation Rules
const validationRules = [
    check('status',"Status is required").not().isEmpty(),
    check('skills',"Skills are required").not().isEmpty()
];

// @ROUTE  : Post api/profile
// @DESC   : This route Creates or updates user profile
// @Access : Private
Router.post("/",[auth,validationRules],async (req,res)=>{
    try{
        //check if all the validation has been done
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()});
        }
        let {
            company,
            website,
            location,
            status,
            skills,
            bio,
            githubUserName,
            youtube,
            twitter,
            facebook,
            linkedin,
            instragram
        } = req.body;

        let profileObj = {user:req.user.id,social:{}};
        if(company) profileObj.company = company;
        if(website) profileObj.website = website;
        if(location) profileObj.location = location;
        if(status) profileObj.status = status;
        if(bio) profileObj.bio = bio;
        if(githubUserName) profileObj.githubUserName = githubUserName;
        if(skills) profileObj.skills = skills.split(",").map((sk)=>sk.trim());

        //create social media links
        if(youtube) profileObj.social.youtube = youtube;
        if(twitter) profileObj.social.twitter = twitter;
        if(linkedin) profileObj.social.linkedin = linkedin;
        if(facebook) profileObj.social.facebook = facebook;
        if(instragram) profileObj.social.instragram = instragram;

        //check if profile has already been created
        let userProfile = await Profile.findOne({user:req.user.id});
        let profile ;
        if(userProfile){
            //update user profile
            profile = await Profile.findOneAndUpdate({user:req.user.id},{$set:profileObj},{new:true});
        }else{
            profile = await new Profile(profileObj);
            profile.save();
        }
        res.json(profile);
    }catch (err){
        console.log(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = Router;



// @ROUTE : GET api/profile
// @DESC  : This route returns all the profile in the database
// @Access : Public
Router.get("/",async (req,res)=>{
    try{
        let profileList = await Profile.find().populate("user",["name","avatar"]);
        res.json(profileList);
    }catch (err){
        console.log(err.message);
        res.status(500).send("Server error");
    }
});



// @ROUTE : GET api/profile/user/:id
// @DESC  : This route returns user profile based on the url ID
// @Access : Public
Router.get("/user/:id",async (req,res)=>{
    try{
        let profile = await Profile.findOne({user:req.params.id}).populate("user",["name","avatar"]);
        if(!profile){
            return res.status(400).json([{msg:"Profile not found"}])
        }
        res.json(profile);
    }catch (err){
        console.log(err.message);
        if(err.kind=="ObjectId"){
            return res.status(400).json([{msg:"Profile not found"}])
        }
        res.status(500).send("Server error");
    }
});



// @ROUTE : DELETE api/profile
// @DESC  : This route deletes the user or their posts
// @Access : Private
Router.delete("/",auth,async (req,res)=>{
    try{
        //remove user profile
        await Profile.findOneAndRemove({user:req.user.id});
        //remove user detail
        await User.findOneAndRemove({_id:req.user.id});
        res.json({msg:'Delete has been successful'});
    }catch (err){
        console.log(err.message);
        res.status(500).send("Server error");
    }
});
