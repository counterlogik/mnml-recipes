import { combineReducers } from "redux";

function addIngredientEntry(state, action) {
  const { payload } = action;
  const { ingredientId, ingredientContent } = payload;

  // Create our new Ingredient object
  const ingredient = {
    id: ingredientId,
    content: ingredientContent
  };

  // Insert the new Ingredient object into the updated lookup table
  return {
    ...state,
    [ingredientId]: ingredient
  };
}

function removeIngredientEntry(state, action) {
  return {
    ...state,
    [action.id]: null
  };
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
  const { payload } = action;
  const { ingredientId } = payload;
  // Just append the new Ingredient's ID to the list of all IDs
  return state.concat(ingredientId);
}

function removeIngredientId(state, action) {
  // Just remove the Ingredient's ID from the list of all IDs
  return state.filter((item, index) => index !== action.index);
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
