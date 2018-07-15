import { combineReducers } from "redux";

function addStepEntry(state, action) {
  const { stepId, step } = action;

  return {
    ...state,
    [stepId]: {
      stepId: stepId,
      step: step
    }
  };
}

function removeStepEntry(state, action) {
  const { stepId } = action;
  const newState = { ...state };
  delete newState[stepId];

  return newState;
}

function stepsById(state = {}, action) {
  switch (action.type) {
    case "ADD_STEP":
      return addStepEntry(state, action);
    case "REMOVE_STEP":
      return removeStepEntry(state, action);
    default:
      return state;
  }
}

function addStepId(state, action) {
  const { stepId } = action;
  // Just append the new Step's ID to the list of all IDs
  return state.concat(stepId);
}

function removeStepId(state, action) {
  // Just remove the Step's ID from the list of all IDs
  return state.filter(item => item !== action.stepId);
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
