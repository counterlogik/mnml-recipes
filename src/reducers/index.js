import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import recipesReducer from "./recipes";
import ingredientsReducer from "./ingredients";
import stepsReducer from "./steps";

const rootReducer = combineReducers({
  recipes: recipesReducer,
  ingredients: ingredientsReducer,
  steps: stepsReducer,
  routing: routerReducer
});

export default rootReducer;
