const express = require("express");
const app = express();
const Routes = require("./routeList");
const path = require("path");
const DbConnected = require("./config/dbConnecter");
const PORT = process.env.PORT || 5000;

//connect to mongo database
DbConnected();

//add middleware parse
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));

//connect routes from routeList
app.use("/api/registration", Routes.registration);
app.use("/api/auth", Routes.auth);
app.use("/api/profile", Routes.profile);
app.use("/api/post", Routes.post);

if (process.env.NODE_ENV == "production") {
}

app.use(express.static("client/build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
