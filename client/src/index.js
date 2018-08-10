import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { makeRoutes } from "./routes";
import "./css/style.css";
import registerServiceWorker from "./registerServiceWorker";

// import the root reducers
import rootReducer from "./reducers/index";

const initialState = {
  recipes: {},
  ingredients: {},
  steps: {}
};

// Create store with reducers and initial state and relevant enhancers
export const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

const routes = makeRoutes();

render(
  <Provider store={store}>{routes}</Provider>,
  document.querySelector("#App")
);

registerServiceWorker();
