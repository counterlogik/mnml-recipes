var mongoose = require("mongoose");

var recipeSchema = mongoose.Schema({
  id: String,
  title: String,
  ingredients: [
    {
      [{type: Schema.ObjectId, ref: 'Ingredient'}]
    }
  ],
  steps: [
    {
      [{type: Schema.ObjectId, ref: 'Schema'}]
    }
  ]
});

module.exports = mongoose.model("Recipe", RecipeSchema);
