const model = require("./User");

async function getUserById(id) {
  const user = await model.User.find({
    _id: id,
  }).exec();
  console.log(user);
  return user;
}

async function createUser(userData) {
  console.log(userData);
  const { username, email, password_hash } = userData;
  const user = new model.User({
    username,
    email,
    password_hash,
  });
  const result = await user.save();
  console.log({
    message: "User created!",
    result,
  });
}

module.exports = {
  getUserById,
  createUser,
};
