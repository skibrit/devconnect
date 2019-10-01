const { check } = require("express-validator");

const validateString = (title, msg) => {
  return check(title, msg).not().isEmpty().isString().trim().escape();
};

const validateEmail = (title, msg) => {
  return check(title, msg).not().isEmpty().isEmail();
};

const validateNumber = (title, msg) => {
  return check(title, msg).not().isEmpty().not().isString();
};

module.exports = {
  validateString,
  validateEmail,
  validateNumber
};
