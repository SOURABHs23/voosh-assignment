const users = require("../models/users.model");
const User = require("../models/User");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const transporter = require("../config/nodemailer");
const regex = require("../utils/auth_regex");
const jwt_secret = process.env.ULTRA_SECRET_KEY || "secert";
const urlRecoverPassword = process.env.URL_RECOVER;
const saltRounds = 10;

// api/users -------------------------------------------------
const getUserId = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const createUser = async (req, res) => {
  let userData = req.body;
  try {
    await users.createUser(userData);
    res.status(201).json({
      message: "User Created!",
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// /user -------------------------------------------------
const loginUser = async (req, res) => {
  let data;
  try {
    const { email, password } = req.body;
    data = await User.findOne({ email: email }, "-_id -__v");
    if (!data) {
      res.status(400).json({ msg: "Incorrect user or password" });
    } else {
      const match = await bcrypt.compare(password, data.password);
      if (match) {
        await User.updateOne({ email: req.body.email }, { logged: true });
        const { email, username } = data;
        const userForToken = {
          email: email,
          username: username,
        };
        const token = jwt.sign(userForToken, jwt_secret);
        res.cookie("email", email).status(200).json({
          msg: "Logged in",
          token: token,
        });
      } else {
        res.status(400).json({ msg: "Incorrect user or password" });
      }
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(400).json(error.message);
  }
};

const signUpUser = async (req, res) => {
  let data;
  try {
    const { email, password, username } = req.body;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    if (regex.validateEmail(email) && regex.validatePassword(password)) {
      data = await User.create({
        email: email,
        password: hashPassword,
        username: username,
        logged: false,
      });
      res.status(201).json(data);
    } else {
      res.status(400).json({ msg: "Invalid email or password" });
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(400).json(error.message);
  }
};

const logout = async (req, res) => {
  try {
    // req.decoded comes from protectedRoute (verifiedToken.js) middleware
    const email = req.decoded.email;
    await User.updateOne({ email }, { logged: false });
    res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    console.log("Error:", error);
    res.status(400).json(error.message);
  }
};

module.exports = {
  getUserId,
  createUser,
  loginUser,
  signUpUser,
  logout,
};
