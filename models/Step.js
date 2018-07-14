var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var StepSchema = new Schema({
  _id: String,
  step: String
});

module.exports = mongoose.model("Step", StepSchema);
