const mongoose = require("../config/mongo_atlas");

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Board = mongoose.model("Board", boardSchema);

module.exports = { Board };
