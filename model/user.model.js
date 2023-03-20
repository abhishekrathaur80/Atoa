const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: (value) => {
      return validator.isEmail(value);
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        throw new Error(
          "Password must contain at least one letter and one number"
        );
      }
    },
  },
  mobileNo: {
    type: Number,
    required: true,
  },
});

// User Model
const User = mongoose.model("users", userSchema);
module.exports = User;
