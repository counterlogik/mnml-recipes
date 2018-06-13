import { combineReducers } from "redux";

function addIngredient(state, action) {
  const { recipeId, ingredient } = action;

  // Look up the correct recipe, to simplify the rest of the code
  const recipe = state[recipeId];

  return {
    ...state,
    // Update our Recipe object with a new "ingredients" array
    [recipeId]: {
      ...recipe,
      ingredients: recipe.ingredients.concat(ingredient)
    }
  };
}

function removeIngredient(state, action) {
  const { index, recipeId } = action;
  const recipe = state[recipeId];
  const ingredients = recipe.ingredients;
  return {
    ...state,
    [recipeId]: {
      ...recipe,
      ingredients: [
        ...ingredients.slice(0, index),
        ...ingredients.slice(index + 1)
      ]
    }
  };
}

function ingredientsById(state = {}, action) {
  switch (action.type) {
    case "ADD_INGREDIENT":
      return addIngredient(state, action);
    case "REMOVE_INGREDIENT":
      return removeIngredient(state, action);
    default:
      return state;
  }
}

function addIngredientId(state, action) {
  const { id } = action;
  // Just append the new Ingredient's ID to the list of all IDs
  return state.concat(id);
}

function removeIngredientId(state, action) {
  // Just remove the Ingredient's ID from the list of all IDs
  return state.filter((item, index) => item !== action.id);
}

function allIngredients(state = [], action) {
  switch (action.type) {
    case "ADD_INGREDIENT":
      return addIngredientId(state, action);
    case "REMOVE_INGREDIENT":
      return removeIngredientId(state, action);
    default:
      return state;
  }
}

const ingredientsApp = combineReducers({
  byId: ingredientsById,
  allIds: allIngredients
});

export default ingredientsApp;
