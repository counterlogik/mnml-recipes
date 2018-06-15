const express = require("express");
const mongoose = require("mongoose");
const api = require("./api");

//Set up mongoose connection
var mongoDB = "mongodb://127.0.0.1/recipes";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = express();

app.set("port", process.env.PORT || 3001);

app.use(express.static("client/build"));

app.use("/api", api);

app.listen(app.get("port"), function() {
  console.log(
    `Find the Recipes app server at: http://localhost:${app.get("port")}/`
  );
});
