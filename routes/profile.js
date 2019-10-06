const express = require("express");
const Router = express.Router();
const auth = require("../middlewears/authMiddlewear");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const Profile = require("../models/Profile");
const Multer = require("multer");
const config = require("config");
const FileUtil = require("../utills/FileUtills.js");
var appRoot = require("app-root-path");
const request = require("request");
const http = require("http");
const axios = require("axios");
const { validateString, validateEmail } = require("../utills/Validator");

let tempDir = config.get("tempDir");
let profileDir = config.get("profileDir");

// @ROUTE : GET api/profile/me
// @DESC  : This route with return the profile information of an user
// @Access : Private
Router.get("/me", auth, async (req, res) => {
  try {
    let userProfile = await Profile.findOne({
      user: req.user.id
    }).populate("user", ["name", "avatar", "email"]);
    if (!userProfile) {
      return res
        .status(400)
        .json({ errors: [{ msg: "No profile found of this user" }] });
    }
    res.json(userProfile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// @Validation Rules
var validationRules = [
  validateString("status", "Status is required"),
  validateString("skills", "Skills are required")
];

// @ROUTE  : Post api/profile
// @DESC   : This route Creates or updates user profile
// @Access : Private
Router.post("/", [auth, validationRules], async (req, res) => {
  try {
    //check if all the validation has been done
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
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

    let profileObj = { user: req.user.id, social: {} };
    if (company) profileObj.company = company;
    if (website) profileObj.website = website;
    if (location) profileObj.location = location;
    if (status) profileObj.status = status;
    if (bio) profileObj.bio = bio;
    if (githubUserName) profileObj.githubUserName = githubUserName;
    if (skills) profileObj.skills = skills.split(",").map(sk => sk.trim());

    //create social media links
    if (youtube) profileObj.social.youtube = youtube;
    if (twitter) profileObj.social.twitter = twitter;
    if (linkedin) profileObj.social.linkedin = linkedin;
    if (facebook) profileObj.social.facebook = facebook;
    if (instragram) profileObj.social.instragram = instragram;

    //check if profile has already been created
    let userProfile = await Profile.findOne({ user: req.user.id });
    let profile;
    if (userProfile) {
      //update user profile
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileObj },
        { new: true }
      );
    } else {
      profile = await new Profile(profileObj);
      profile.save();
    }
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// @ROUTE : GET api/profile
// @DESC  : This route returns all the profile in the database
// @Access : Public
Router.get("/", async (req, res) => {
  try {
    let profileList = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profileList);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// @ROUTE : GET api/profile/user/:id
// @DESC  : This route returns user profile based on the url ID
// @Access : Public
Router.get("/user/:id", async (req, res) => {
  try {
    let profile = await Profile.findOne({
      user: req.params.id
    }).populate("user", ["name", "avatar", "_id", "email"]);
    if (!profile) {
      return res.status(400).json({ error: [{ msg: "Profile not found" }] });
    }
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ error: [{ msg: "Profile not found" }] });
    }
    res.status(500).send("Server error");
  }
});

// @ROUTE : DELETE api/profile
// @DESC  : This route deletes the user profile
// @Access : Private
Router.delete("/", auth, async (req, res) => {
  try {
    let userID = req.user.id;
    //delete the image file if has
    let profilePic = `${profileDir}${userID}/profile.jpg`;
    await FileUtil.deleteFile(profilePic);

    //remove user profile
    await Profile.findOneAndRemove({ user: userID });
    //remove user detail
    await User.findOneAndRemove({ _id: userID });
    res.json({ msg: "Delete has been successful" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// @Validation Rules
validationRules = [
  validateString("title", "Title is required"),
  validateString("company", "Company is required"),
  validateString("location", "Location are required"),
  validateString("from", "From Date is required")
];

// @ROUTE  : Post api/profile/experience
// @DESC   : This route will add or update experience to user profile
// @Access : Private
Router.post("/experience/:id?", [auth, validationRules], async (req, res) => {
  try {
    //check if all the validation has been done
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let { title, company, location, from, to, current, description } = req.body;

    let experienceObj = { title, company, location, from };
    if (to) experienceObj.to = to;
    if (current) experienceObj.current = current;
    if (description) experienceObj.description = description;

    let userProfile = await Profile.findOne({ user: req.user.id });
    if (userProfile) {
      let expIndex = userProfile.experiences
        .map(item => item.id)
        .indexOf(req.params.id);
      if (expIndex > -1) {
        userProfile.experiences[expIndex] = experienceObj;
      } else {
        userProfile.experiences.unshift(experienceObj);
      }
    } else {
      userProfile = { user: req.user.id };
      userProfile.experiences = new Array();
      userProfile.unshift(experienceObj);
    }
    await userProfile.save();
    res.json(userProfile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error ");
  }
});

// @ROUTE  : DELETE api/profile/experience/:id
// @DESC   : This route will delete experience from user profile
// @Access : Private
Router.delete("/experience/:id", auth, async (req, res) => {
  try {
    let userProfile = await Profile.findOne({ user: req.user.id });

    if (!userProfile) {
      return res.status(400).json({ error: [{ msg: "No profile found" }] });
    }

    let expIndex = userProfile.experiences
      .map(item => item.id)
      .indexOf(req.params.id);
    if (expIndex > -1) {
      userProfile.experiences.splice(expIndex, 1);
      await userProfile.save();
    }
    res.json(userProfile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error ");
  }
});

// @Validation Rules
validationRules = [
  validateString("school", "School is required"),
  validateString("degree", "Degree is required"),
  validateString("fieldOfStudy", "Field of Study is required"),
  validateString("from", "From Date is required")
];

// @ROUTE  : Post api/profile/education
// @DESC   : This route will add or update education to user profile
// @Access : Private
Router.post("/education/:id?", [auth, validationRules], async (req, res) => {
  try {
    //check if all the validation has been done
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let {
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description
    } = req.body;

    let educationObj = { school, degree, fieldOfStudy, from };
    if (to) educationObj.to = to;
    if (current) educationObj.current = current;
    if (description) educationObj.description = description;

    let userProfile = await Profile.findOne({ user: req.user.id });
    if (userProfile) {
      let expIndex = userProfile.education
        .map(item => item.id)
        .indexOf(req.params.id);
      if (expIndex > -1) {
        userProfile.education[expIndex] = educationObj;
      } else {
        userProfile.education.unshift(educationObj);
      }
    } else {
      userProfile = { user: req.user.id };
      userProfile.education = new Array();
      userProfile.unshift(educationObj);
    }
    await userProfile.save();
    res.json(userProfile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error ");
  }
});

// @ROUTE  : Post api/profile/education/:id
// @DESC   : This route will delete experience from user profile
// @Access : Private
Router.delete("/education/:id", auth, async (req, res) => {
  try {
    let userProfile = await Profile.findOne({ user: req.user.id });
    if (!userProfile) {
      return res.status(400).json({ error: [{ msg: "No profile found" }] });
    }
    let expIndex = userProfile.education
      .map(item => item.id)
      .indexOf(req.params.id);
    if (expIndex > -1) {
      userProfile.education.splice(expIndex, 1);
      await userProfile.save();
    }
    res.json(userProfile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error ");
  }
});

var storage = Multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, tempDir);
  },
  filename: function(req, file, cb) {
    let extension = file.originalname.split(".").pop();
    cb(null, Date.now() + `.${extension}`); //Appending .jpg
  }
});

var upload = Multer({ storage: storage });

// @ROUTE  : Post api/profile/changeAvatar
// @DESC   : This route will allow user to change avatar
// @Access : Private
Router.post(
  "/changeAvatar",
  [auth, upload.single("avatar")],
  async (req, res) => {
    let avatar = req.file;
    let tempLocation = `${appRoot}${tempDir}${avatar.filename}`;

    try {
      let userID = req.user.id;
      let userProfile = await Profile.findOne({ user: userID });
      if (!userProfile) {
        return res.status(400).json({ error: [{ msg: "No profile found" }] });
      }
      //check if the file is valid
      await FileUtil.isValidFile(avatar);

      //check if this user already has a profile directory created if not create new one
      let profileLocation = `${appRoot}${profileDir}${userID}/`;
      let isDirectoryExist = await FileUtil.createDirectory(profileLocation);

      if (!isDirectoryExist) {
        throw "No profile directory found and unable to create a new one";
      }

      //copy file
      await FileUtil.resizeAndSave(
        tempLocation,
        `${profileLocation}profile.jpg`
      );

      //delete the uploaded file from temp folder
      await FileUtil.deleteFile(tempLocation);

      let baseUrl = req.protocol + "://" + req.headers.host;
      let avatarUrl = baseUrl + `/api/profile/avatar/${userID}`;

      let userDetail = await User.findOneAndUpdate(
        { _id: userID },
        { $set: { avatar: avatarUrl } },
        { new: true }
      );

      console.log(userDetail);
      res.json({
        status: 200,
        msg: "avatar has been updated"
      });
    } catch (err) {
      await FileUtil.deleteFile(tempLocation);
      res.json({
        status: 500,
        msg: err.toString()
      });
    }
  }
);

// @ROUTE  : Post api/profile/avatar/:id?
// @DESC   : This route will allow user to change avatar
// @Access : Private
Router.get("/avatar/:id?", async (req, res) => {
  try {
    let userID;
    if (req.user && req.user.id) {
      userID = req.user.id;
    } else if (req.params && req.params.id) {
      userID = req.params.id;
    }

    if (userID) {
      let filePath = `${profileDir}/${userID}/profile.jpg`;
      let isFileExist = await FileUtil.isFileExist(filePath);
      if (isFileExist) {
        res.sendFile(`${appRoot}/${filePath}`);
      } else {
        res.status(400).send("No avatar found");
      }
    } else {
      res.status(400).send("No avatar found");
    }
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// @ROUTE  : Post api/profile/github/:username?
// @DESC   : This route will allow user to change avatar
// @Access : Private
Router.get("/github/:username?", async (req, res) => {
  try {
    let username = req.params.username;
    if (!username) {
      res.status(400).send("No username found");
    }

    const gitClientID = config.get("githubClientID");
    const gitClientSecrent = config.get("githubSecret");
    const uri = `http://api.github.com/users/${username}/repos?per_page=6&sort=created&direction=desc&client_id=${gitClientID}&client_secret=${gitClientSecrent}`;
    //const uri = `https//api.github.com/users/${username}/repos`;

    const options = {
      uri: uri,
      method: "GET",
      headers: { "user-agent": "node.js" },
      pathname: "/"
    };

    let query = req.query.queryStr;
    //let url = `https://your.service.org?query=${query}`;

    axios({
      method: "get",
      url: uri
    })
      .then(function(response) {
        res.json(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

module.exports = Router;
