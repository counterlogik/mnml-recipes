var express = require("express");
const app = express();
const cors = require("cors");
var mongoose = require("mongoose");
const bodyParser = require("body-parser");
var api = require("./api");
const CONFIG = require("./config/config");

// set up mongoose connection
const mongoDB =
  "mongodb://" +
  CONFIG.db_user +
  ":" +
  CONFIG.db_password +
  "@" +
  CONFIG.db_host +
  ":" +
  CONFIG.db_port +
  "/" +
  CONFIG.db_name;
mongoose.connect(mongoDB).catch(() => {
  console.log("Cannot connect to Mongo Server:", mongoDB);
});
mongoose.Promise = global.Promise;

let db = mongoose.connection;
module.exports = db;
db.once("open", () => {
  console.log("Connected to Mongo Server at: " + mongoDB);
});
db.on("error", error => {
  console.log("error", error);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.set("port", CONFIG.port || 3001);

app.use("/api", api);

app.listen(CONFIG.port, function() {
  console.log(
    "Find the Recipes app server at: http://localhost:" + CONFIG.port
  );
});
