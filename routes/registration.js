const express = require('express');
const router = express.Router();
const config = require("config");
const bCrypt = require("bcrypt");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { check, validationResult } = require('express-validator');

const validationRules = [
    check('name',"Name is required").not().isEmpty(),
    check('email',"Enter a valid Email").isEmail(),
    check('password',"Password must be more than 6 character").isLength({ min: 6 })
];

// @ROUTE  : /api/registration
// @DESC   : User registration will be handled by this router
// @Access : Public
router.post("/",validationRules,async (req,res)=>{
    //check if all the validation has been done
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let {email,name,password} = req.body;
    try{
        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(400).json({ errors: [{msg:"User already exist"}] });
        }else{
            let avatar = gravatar.url(email, {s: '200', r: 'pg', d: 'mm'});
            const user = new User({email,name,password,avatar});

            //encrypt the password with bCrypt
            let salt = await bCrypt.genSalt(10);
            user.password = await bCrypt.hash(password.toString(),salt);

            //save data into database
            await user.save();

            const payload = {
              user:{
                  id:user.id
              }
            };
            //sent jwt token to the registered user
            jwt.sign(payload, config.get("jwtSecret"), { expiresIn: '1000h' },(err,token)=>{
                if(err) throw err;
                res.json({token});
            });
        }
    }catch (err){
        console.log(err.message);
        return res.status(500).send("Server error");
    }
});

module.exports = router;