import { combineReducers } from "redux";

function addStepEntry(state, action) {
  const { payload } = action;
  const { stepId, stepContent } = payload;

  // Create our new Step object
  const step = {
    id: stepId,
    content: stepContent
  };

  // Insert the new Step object into the updated lookup table
  return {
    ...state,
    [stepId]: step
  };
}

function removeStepEntry(state, action) {
  return {
    ...state,
    [action.id]: null
  };
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
  const { payload } = action;
  const { stepId } = payload;
  // Just append the new Step's ID to the list of all IDs
  return state.concat(stepId);
}

function removeStepId(state, action) {
  // Just remove the Step's ID from the list of all IDs
  return state.filter((item, index) => index !== action.index);
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
