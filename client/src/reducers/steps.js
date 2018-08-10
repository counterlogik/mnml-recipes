import { combineReducers } from "redux";

// TODO: refactor all pertinent steps reducers to handle one OR many steps at once

function fetchSteps(state, action) {
  const { steps } = action;

  const arrayToObject = stepsArray =>
    stepsArray.reduce((obj, step) => {
      obj[step._id] = step;
      return obj;
    }, {});

  return arrayToObject(steps);
}

function updateStepEntry(state, action) {
  const { stepId, step } = action;

  return {
    ...state,
    [stepId]: {
      stepId: stepId,
      step: step
    }
  };
}

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
    case "FETCH_STEPS":
      return fetchSteps(state, action);
    case "UPDATE_STEP":
      return updateStepEntry(state, action);
    case "ADD_STEP":
      return addStepEntry(state, action);
    case "REMOVE_STEP":
      return removeStepEntry(state, action);
    default:
      return state;
  }
}

function fetchStepIds(state, action) {
  const { steps } = action;
  // Replace the list of all Ids with those fetched from the database
  return steps.map(step => step._id);
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
    case "FETCH_STEPS":
      return fetchStepIds(state, action);
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
