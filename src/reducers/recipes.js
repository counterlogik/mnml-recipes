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

function addStep(state, action) {
  const { recipeId, step } = action;

  // Look up the correct recipe, to simplify the rest of the code
  const recipe = state[recipeId];

  return {
    ...state,
    // Update our Recipe object with a new "steps" array
    [recipeId]: {
      ...recipe,
      steps: recipe.steps.concat(step)
    }
  };
}

function removeStep(state, action) {
  const { index, recipeId } = action;
  const recipe = state[recipeId];
  const steps = recipe.steps;
  return {
    ...state,
    [recipeId]: {
      ...recipe,
      steps: [...steps.slice(0, index), ...steps.slice(index + 1)]
    }
  };
}

function recipesById(state = {}, action) {
  switch (action.type) {
    case "ADD_RECIPE":
      return addRecipe(state, action);
    case "REMOVE_RECIPE":
      return removeRecipe(state, action);
    case "ADD_INGREDIENT":
      return addIngredient(state, action);
    case "ADD_STEP":
      return addStep(state, action);
    case "REMOVE_INGREDIENT":
      return removeIngredient(state, action);
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
