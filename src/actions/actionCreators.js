// Generate unique timestamp based stamps
const generateId = type => `${type}-${Date.now()}`;

// add recipe
export function addRecipe(id, title) {
  return {
    type: "ADD_RECIPE",
    id,
    title
  };
}

// delete recipe
export function deleteRecipe(id) {
  return {
    type: "REMOVE_RECIPE",
    id
  };
}

// add ingredient
export function addIngredient(recipeId, content) {
  const id = generateId("ingredient");

  return {
    type: "ADD_RECIPE",
    recipeId,
    id,
    content
  };
}

// delete ingredient
export function deleteIngredient(id) {
  return {
    type: "REMOVE_RECIPE",
    id
  };
}

// add step
export function addStep(recipeId, content) {
  const id = generateId("ingredient");

  return {
    type: "ADD_RECIPE",
    recipeId,
    id,
    content
  };
}

// delete step
export function deleteStep(id) {
  return {
    type: "REMOVE_RECIPE",
    id
  };
}
