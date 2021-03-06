import { combineReducers } from "redux";

// TODO: refactor all pertinent recipes reducers to handle one OR many recipes at once

function fetchRecipes(state, action) {
  const { recipes } = action;

  const arrayToObject = recipesArray =>
    recipesArray.reduce((obj, recipe) => {
      obj[recipe._id] = recipe;
      return obj;
    }, {});

  return arrayToObject(recipes);
}

function fetchRecipeDetails(state, action) {
  const { details } = action.details;

  return {
    ...state,
    [details._id]: {
      ...details
    }
  };
}

function updateRecipe(state, action) {
  const { recipeId, user, title, ingredients, steps } = action;

  return {
    ...state,
    [recipeId]: {
      _id: recipeId,
      user,
      title,
      ingredients,
      steps
    }
  };
}

function addRecipe(state, action) {
  const { recipeId } = action;

  return {
    ...state,
    [recipeId]: {
      recipeId,
      title: "",
      ingredients: [],
      steps: []
    }
  };
}

function removeRecipe(state, action) {
  const { recipeId } = action;
  const newState = { ...state };
  delete newState[recipeId];

  return newState;
}

function addIngredient(state, action) {
  const { ingredientId, recipeId } = action;

  const recipe = state[recipeId];

  return {
    ...state,
    [recipeId]: {
      ...recipe,
      ingredients: recipe.ingredients.concat(ingredientId)
    }
  };
}

function addStep(state, action) {
  const { stepId, recipeId } = action;

  const recipe = state[recipeId];

  return {
    ...state,
    [recipeId]: {
      ...recipe,
      steps: recipe.steps.concat(stepId)
    }
  };
}

function recipesById(state = [], action) {
  switch (action.type) {
    case "FETCH_RECIPES":
      return fetchRecipes(state, action);
    case "FETCH_RECIPE_DETAILS":
      return fetchRecipeDetails(state, action);
    case "ADD_RECIPE":
      return addRecipe(state, action);
    case "UPDATE_RECIPE":
      return updateRecipe(state, action);
    case "REMOVE_RECIPE":
      return removeRecipe(state, action);
    case "ADD_INGREDIENT":
      return addIngredient(state, action);
    case "ADD_STEP":
      return addStep(state, action);
    default:
      return state;
  }
}

function fetchRecipeIds(state, action) {
  const { recipes } = action;
  // Replace the list of all Ids with those fetched from the database
  return recipes.map(recipe => recipe._id);
}

function addRecipeId(state, action) {
  const { recipeId } = action;
  // Just append the new Recipe's ID to the list of all IDs
  return state.concat(recipeId);
}

function removeRecipeId(state, action) {
  // Just remove the Recipe's ID from the list of all IDs
  return state.filter(item => item !== action.recipeId);
}

function allRecipes(state = [], action) {
  switch (action.type) {
    case "FETCH_RECIPES":
      return fetchRecipeIds(state, action);
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
