const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const parseError = require("parse-error");
const passport = require("passport");
const cors = require("cors");
const api = require("./api");

const app = express();

const CONFIG = require("./config/config");
// app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Passport
app.use(passport.initialize());

// log environment
console.log("Environment:", CONFIG.app);

// log port
console.log("Serving on Port:", CONFIG.port);

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// app.use(cors());

// app.use(express.static("client/build"));

app.use("/api", api);

app.get("/", function(req, res, next) {
  res.json({
    message:
      "This is the default route for our Recipes API, try a more specific route query."
  });
});

// app.use("/", function(req, res) {
//   res.statusCode = 200; // send the appropriate status code
//   res.json({ status: "success", message: "Parcel Pending API", data: {} });
// });

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error("Not Found");
//   err.status = 404;
//   next(err);
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

module.exports = app;

process.on("unhandledRejection", error => {
  console.error("Uncaught Error", parseError(error));
});
