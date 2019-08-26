const jwt = require("jsonwebtoken");
const config = require("config");

const authMiddlewear = (req,res,next)=>{
    let token = req.header("x-auth-token");
    if(!token){
        return res.status(400).send("No auth token found");
    }
    try{
        let decoded = jwt.verify(token,config.get("jwtSecret"));
        req.user = decoded.user;
        next();
    }catch (err){
        res.status(402).send("Token is not valid");
    }
};
module.exports = authMiddlewear;