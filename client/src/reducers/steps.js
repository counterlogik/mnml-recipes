import { combineReducers } from "redux";

function addStepEntry(state, action) {
  const { id, step } = action;

  return {
    ...state,
    [id]: {
      id: id,
      step: step
    }
  };
}

function removeStepEntry(state, action) {
  const { index } = action;
  const newState = { ...state };
  delete newState[index];

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
