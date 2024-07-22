const mongoose = require("../config/mongo_atlas");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  list_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "List",
  },
  order: {
    type: Number,
    required: true,
    default: 0,
  },
  //Add more features to the Card...
});

const Card = mongoose.model("Card", cardSchema);

module.exports = { Card };
