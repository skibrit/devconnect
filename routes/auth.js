const express = require("express");
const router = express.Router();
const config = require("config");
const bCrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const authMiddleWare = require("../middlewears/authMiddlewear");

// @ROUTE : api/auth
// @DESC  : This route handles the authentication a user auth token
// @Access : Private
router.get("/", authMiddleWare, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

// @Validation Rules
const validationRules = [
  check("email", "Enter a valid Email").isEmail(),
  check("password", "Password is required").not().isEmpty()
];

// @ROUTE : api/auth
// @DESC  : This route handles the authentication and logged in user
// @Access : Public
router.post("/", validationRules, async (req, res) => {
  //check if all the validation has been done
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Email or password invalid" }] });
    }

    //check the password by comparing with bCrypt
    const isMatched = await bCrypt.compare(password, user.password);
    if (!isMatched) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Email or password invalid" }] });
    }
    const payload = {
      user: {
        id: user.id
      }
    };
    //sent jwt token to the user
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: "1000h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
