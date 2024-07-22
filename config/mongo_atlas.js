const mongoose = require("mongoose");
const uri = process.env.URI_WITH_PASSWORD;
console.log(uri);
mongoose.connect(uri);

const db = mongoose.connection;

db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connection Atlas established"));

module.exports = mongoose;
