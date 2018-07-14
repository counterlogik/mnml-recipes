var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var IngredientSchema = new Schema({
  _id: String,
  ingredient: String
});

module.exports = mongoose.model("Ingredient", IngredientSchema);
