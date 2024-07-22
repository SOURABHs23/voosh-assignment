const mongoose = require("../config/mongo_atlas");

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  board_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
  },
});

const List = mongoose.model("List", listSchema);

module.exports = { List };
