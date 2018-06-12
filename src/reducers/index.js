import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import recipesReducer from "./recipes";

const rootReducer = combineReducers({
  recipes: recipesReducer,
  routing: routerReducer
});

export default rootReducer;
