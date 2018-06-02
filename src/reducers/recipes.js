import { combineReducers } from "redux";

function addIngredient(state, action) {
  const { payload } = action;
  const { recipeId, ingredientId } = payload;

  // Look up the correct recipe, to simplify the rest of the code
  const recipe = state[recipeId];

  return {
    ...state,
    // Update our Recipe object with a new "ingredients" array
    [recipeId]: {
      ...recipe,
      ingredients: recipe.ingredients.concat(ingredientId)
    }
  };
}

function addStep(state, action) {
  const { payload } = action;
  const { recipeId, stepId } = payload;

  // Look up the correct recipe, to simplify the rest of the code
  const recipe = state[recipeId];

  return {
    ...state,
    // Update our Recipe object with a new "ingredients" array
    [recipeId]: {
      ...recipe,
      ingredients: recipe.steps.concat(stepId)
    }
  };
}

function recipes(state = {}, action) {
  switch (action.type) {
    case "ADD_RECIPE":
      return {
        ...state,
        [action.id]: {
          id: action.id,
          title: action.recipeTitle
        }
      };
    case "REMOVE_RECIPE":
      return { ...state, [action.id]: null };
    default:
      return state;
  }
}

function recipesById(state = {}, action) {
  switch (action.type) {
    case "ADD_INGREDIENT":
      return addIngredient(state, action);
    case "ADD_STEP":
      return addStep(state, action);
    default:
      return state;
  }
}

function addRecipeId(state, action) {
  const { payload } = action;
  const { recipeId } = payload;
  // Just append the new Recipe's ID to the list of all IDs
  return state.concat(recipeId);
}

function removeRecipeId(state, action) {
  // Just remove the Recipe's ID from the list of all IDs
  return state.filter((item, index) => index !== action.index);
}

function allRecipes(state = [], action) {
  switch (action.type) {
    case "ADD_RECIPE":
      return addRecipeId(state, action);
    case "remove_RECIPE":
      return removeRecipeId(state, action);
    default:
      return state;
  }
}

const recipesReducer = combineReducers({
  byId: recipesById,
  allIds: allRecipes
});

export default recipesReducer;
