import { combineReducers } from "redux";

function addRecipe(state, action) {
  const { id, title } = action;

  return {
    ...state,
    // Update our Recipes object with a new entry
    [id]: {
      id,
      title,
      ingredients: [],
      steps: []
    }
  };
}

function removeRecipe(state, action) {
  const { id } = action;
  const newState = { ...state };
  delete newState[id];

  return newState;
}

function recipesById(state = {}, action) {
  switch (action.type) {
    case "ADD_RECIPE":
      return addRecipe(state, action);
    case "REMOVE_RECIPE":
      return removeRecipe(state, action);
    default:
      return state;
  }
}

function addRecipeId(state, action) {
  const { id } = action;
  // Just append the new Recipe's ID to the list of all IDs
  return state.concat(id);
}

function removeRecipeId(state, action) {
  // Just remove the Recipe's ID from the list of all IDs
  return state.filter((item, index) => item !== action.id);
}

function allRecipes(state = [], action) {
  switch (action.type) {
    case "ADD_RECIPE":
      return addRecipeId(state, action);
    case "REMOVE_RECIPE":
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
