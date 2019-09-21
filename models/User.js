const mongoose = require("mongoose");

const UserScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  regDate: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("user", UserScheme);
