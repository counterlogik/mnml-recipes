import { v4 } from "node-uuid";

export const addRecipe = title => ({
  type: "ADD_RECIPE",
  id: `recipe-${v4()}`,
  title
});

export const removeRecipe = id => ({
  type: "REMOVE_RECIPE",
  id
});

export const addIngredient = (ingredient, recipeId) => ({
  type: "ADD_INGREDIENT",
  id: `ingredient-${v4()}`,
  ingredient,
  recipeId
});

export const removeIngredient = (index, recipeId) => ({
  type: "REMOVE_INGREDIENT",
  index,
  recipeId
});

export const addStep = (step, recipeId) => ({
  type: "ADD_STEP",
  id: `step-${v4()}`,
  step,
  recipeId
});

export const removeStep = (index, recipeId) => ({
  type: "REMOVE_STEP",
  index,
  recipeId
});
