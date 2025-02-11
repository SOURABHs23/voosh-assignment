require("dotenv").config();
const express = require("express");
var cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;
require("./config/mongo_atlas.js"); //BBDD MongoDB conection

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("combined"));

//Routes
const apiRoutes = require("./routes/api.routes.js");
const userRoutes = require("./routes/user.routes.js");

app.use("/api", apiRoutes);
app.use("/user", userRoutes);

//* Serve static assets in production, must be at this location of this file
if (process.env.NODE_ENV === "production") {
  //*Set static folder (VITE --> dist)
  app.use(express.static("client/dist"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
  );
}

app.listen(PORT, () => {
  console.log(`Reallo Backend listening on PORT ${PORT}`);
});
