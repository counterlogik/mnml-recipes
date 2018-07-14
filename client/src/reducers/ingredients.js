import { combineReducers } from "redux";

function addIngredientEntry(state, action) {
  const { id, ingredient } = action;

  return {
    ...state,
    [id]: {
      id: id,
      ingredient: ingredient
    }
  };
}

function removeIngredientEntry(state, action) {
  const { id } = action;
  const newState = { ...state };
  delete newState[id];

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
