import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { firebaseReducer } from "react-redux-firebase";

import recipesReducer from "./recipes";
import ingredientsReducer from "./ingredients";
import stepsReducer from "./steps";

const rootReducer = combineReducers({
  recipes: recipesReducer,
  ingredients: ingredientsReducer,
  steps: stepsReducer,
  routing: routerReducer,
  firebase: firebaseReducer
});

export default rootReducer;
