import { combineReducers } from "redux";

import recipesReducer from "./recipes";
import ingredientsReducer from "./ingredients";
import stepsReducer from "./steps";

const rootReducer = combineReducers({
  recipes: recipesReducer,
  ingredients: ingredientsReducer,
  steps: stepsReducer
});

export default rootReducer;
