const express = require("express");
const app = express();
const Routes = require("./routeList");
const DbConnected = require("./config/dbConnecter");
const PORT = process.env.PORT||5000;

//connect to mongo database
DbConnected();

//add middleware parse
app.use(express.urlencoded({ extended: false }))
app.use(express.json({extended:false}));

//connect routes from routeList
app.use("/api/registration",Routes.registration);
app.use("/api/auth",Routes.auth);
app.use("/api/profile",Routes.profile);
app.use("/api/post",Routes.post);

app.listen(PORT,()=>{
    console.log(`Server is listening on ${PORT}`);
});