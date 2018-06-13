import { combineReducers } from "redux";

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

function stepsById(state = {}, action) {
  switch (action.type) {
    case "ADD_STEP":
      return addStep(state, action);
    case "REMOVE_STEP":
      return removeStep(state, action);
    default:
      return state;
  }
}

function addStepId(state, action) {
  const { id } = action;
  // Just append the new Step's ID to the list of all IDs
  return state.concat(id);
}

function removeStepId(state, action) {
  // Just remove the Step's ID from the list of all IDs
  return state.filter((item, index) => item !== action.id);
}

function allSteps(state = [], action) {
  switch (action.type) {
    case "ADD_STEP":
      return addStepId(state, action);
    case "REMOVE_STEP":
      return removeStepId(state, action);
    default:
      return state;
  }
}

const stepsReducer = combineReducers({
  byId: stepsById,
  allIds: allSteps
});

export default stepsReducer;
