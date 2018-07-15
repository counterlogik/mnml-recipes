import { combineReducers } from "redux";

function fetchRecipes(state, action) {
  const { recipes } = action;

  const arrayToObject = recipesArray =>
    recipesArray.reduce((obj, recipe) => {
      obj[recipe._id] = recipe;
      return obj;
    }, {});

  return arrayToObject(recipes);
}
function addRecipe(state, action) {
  const { id, title } = action;

  return {
    ...state,
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

function addIngredient(state, action) {
  const { id, recipeId } = action;

  const recipe = state[recipeId];

  return {
    ...state,
    [recipeId]: {
      ...recipe,
      ingredients: recipe.ingredients.concat(id)
    }
  };
}

function removeIngredient(state, action) {
  const { id, recipeId } = action;

  const recipe = state[recipeId];

  return {
    ...state,
    [recipeId]: {
      ...recipe,
      ingredients: [
        ...recipe.ingredients.slice(0, id),
        ...recipe.ingredients.slice(id + 1)
      ]
    }
  };
}

function addStep(state, action) {
  const { id, recipeId } = action;

  const recipe = state[recipeId];

  return {
    ...state,
    [recipeId]: {
      ...recipe,
      steps: recipe.steps.concat(id)
    }
  };
}

function removeStep(state, action) {
  const { index, recipeId } = action;

  const recipe = state[recipeId];

  return {
    ...state,
    [recipeId]: {
      ...recipe,
      steps: [...recipe.steps.slice(0, index), ...recipe.steps.slice(index + 1)]
    }
  };
}

function recipesById(state = {}, action) {
  switch (action.type) {
    case "FETCH_RECIPES":
      return fetchRecipes(state, action);
    case "ADD_RECIPE":
      return addRecipe(state, action);
    case "REMOVE_RECIPE":
      return removeRecipe(state, action);
    case "ADD_INGREDIENT":
      return addIngredient(state, action);
    case "REMOVE_INGREDIENT":
      return removeIngredient(state, action);
    case "ADD_STEP":
      return addStep(state, action);
    case "REMOVE_STEP":
      return removeStep(state, action);
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
    case "FETCH_RECIPES":
      return fetchRecipes(state, action);
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
