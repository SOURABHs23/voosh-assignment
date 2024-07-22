const mongoose = require("../config/mongo_atlas");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  logged: Boolean,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
