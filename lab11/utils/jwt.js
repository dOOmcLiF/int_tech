const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || "secret_key", {
    expiresIn: "1h",
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || "secret_key");
  } catch (err) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };