const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const jwt_secret = process.env.ULTRA_SECRET_KEY || "secret";

const protectedRoutes = express.Router();

protectedRoutes.use(async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Assuming 'Bearer TOKEN'

  if (!token) {
    return res.status(401).json({ msg: "Token not provided" });
  }

  try {
    console.log("trying");
    const decoded = jwt.verify(token, jwt_secret);
    const user = await User.findOne({ email: decoded.email }, "-_id -__v");

    if (!user || user.logged !== true) {
      return res
        .status(401)
        .json({ msg: "Invalid token or user not logged in" });
    }

    req.decoded = decoded;
    next();
  } catch (err) {
    res.status(403).json({ msg: "Invalid token", message: err.message });
    // res.redirect("/")
  }
});

module.exports = protectedRoutes;
