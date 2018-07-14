var express = require("express");
var mongoose = require("mongoose");
var api = require("./api");

//Set up mongoose connection
var mongoDB =
  "mongodb://addisonstaples:AwHjqLqsn9j8CCzMysgQ@ds125001.mlab.com:25001/mern_recipes";
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
