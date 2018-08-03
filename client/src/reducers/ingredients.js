import { combineReducers } from "redux";

// TODO: refactor all pertinent ingredients reducers to handle one OR many ingredients at once

function addIngredientEntry(state, action) {
  const { ingredientId, ingredient } = action;

  return {
    ...state,
    [ingredientId]: {
      ingredientId: ingredientId,
      ingredient: ingredient
    }
  };
}

function removeIngredientEntry(state, action) {
  const { ingredientId } = action;
  const newState = { ...state };
  delete newState[ingredientId];

  return newState;
}

function ingredientsById(state = {}, action) {
  switch (action.type) {
    case "ADD_INGREDIENT":
      return addIngredientEntry(state, action);
    case "REMOVE_INGREDIENT":
      return removeIngredientEntry(state, action);
    default:
      return state;
  }
}

function addIngredientId(state, action) {
  const { ingredientId } = action;
  // Just append the new Ingredient's ID to the list of all IDs
  return state.concat(ingredientId);
}

function removeIngredientId(state, action) {
  // Just remove the Ingredient's ID from the list of all IDs
  return state.filter(item => item !== action.ingredientId);
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

const ingredientsReducer = combineReducers({
  byId: ingredientsById,
  allIds: allIngredients
});

export default ingredientsReducer;
