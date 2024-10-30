const { mongoose } = require("mongoose");
const validator = require("validator");
const bcypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SALT_I = 10;
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "invalid email"],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  name: {
    type: String,
    maxlength: 100,
  },
  lastname: {
    type: String,
    maxlength: 100,
  },
  token: {
    type: String,
  },
});

userSchema.pre("save", function (next) {
  var user = this;
  if (user.isModified("password")) {
    bcypt.genSalt(SALT_I, function (err, salt) {
      if (err) return next(err);
      bcypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
      });
    });
  } else {
    next();
  }
});

userSchema.methods.generateToken = async () => {
  var user = this;
  var token = jwt.sign({ email: user.email }, process.env.SECRET, {
    expiresIn: "7d",
  });
  user.token = token;
  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = { User };
