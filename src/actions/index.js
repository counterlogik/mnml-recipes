let nextRecipeId = 100;
let nextIngredientId = 100;
let nextStepId = 100;

export const addRecipe = title => ({
  type: "ADD_RECIPE",
  id: nextRecipeId++,
  title
});

export const removeRecipe = id => ({
  type: "REMOVE_RECIPE",
  id
});

export const addIngredient = (ingredient, recipeId) => ({
  type: "ADD_INGREDIENT",
  id: nextIngredientId++,
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
  id: nextStepId++,
  step,
  recipeId
});

export const removeStep = (index, recipeId) => ({
  type: "REMOVE_STEP",
  index,
  recipeId
});
