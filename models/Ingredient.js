var mongoose = require("mongoose");

var ingredientSchema = mongoose.Schema({
  id: String,
  ingredient: String
});

module.exports = mongoose.model("Ingredient", IngredientSchema);
