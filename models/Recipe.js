var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var RecipeSchema = Schema({
  _id: String,
  title: String,
  user: String,
  ingredients: Array,
  steps: Array
});

module.exports = mongoose.model("Recipe", RecipeSchema);
