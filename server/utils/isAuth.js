const jwt = require("jsonwebtoken");
require("dotenv").config();
const { AuthenticationError } = require("apollo-server-express");

const authorize = (req) => {
  const authorizationHeader = req.header.authorization || "";
  if (!authorizationHeader) {
    req.isAuth = false;
    throw new AuthenticationError("You are not auth");
  }

  const token = authorizationHeader.replace("Bearer ", "");
  if (!token || token === "") {
    req.isAuth = false;
    throw new AuthenticationError("You are not auth 222");
  }

  let decodedJWT;
  try {
    decodedJWT = jwt.verify(token, process.env.SECRET);
    if (!decodedJWT) {
      req.isAuth = fasle;
      throw new AuthenticationError("You are not auth 333");
    }
    req.isAuth = true;
    req._id = decodedJWT._id;
    req.email = decodedJWT.email;
  } catch (err) {
    req.isAuth = false;
    throw new AuthenticationError("You are not auth 444");
  }
  return req;
};

module.exports = authorize;
