import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { firebaseReducer } from "react-redux-firebase";

import recipesApp from "./recipes";

const rootReducer = combineReducers({
  recipes: recipesApp,
  routing: routerReducer,
  firebase: firebaseReducer
});

export default rootReducer;
