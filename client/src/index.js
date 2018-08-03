import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { makeRoutes } from "./routes";
import throttle from "lodash/throttle";
import { loadState, saveState } from "./localStorage";
import "./css/style.css";
import registerServiceWorker from "./registerServiceWorker";

// import the root reducers
import rootReducer from "./reducers/index";

// try to load state from localStorage
const loadedState = loadState();
const persistedState = { ...loadedState };

// Create store with reducers and initial state and relevant enhancers
export const store = createStore(
  rootReducer,
  persistedState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.subscribe(
  throttle(() => {
    saveState({
      recipes: store.getState().recipes,
      ingredients: store.getState().ingredients,
      steps: store.getState().steps
    });
  }),
  1000
);

const routes = makeRoutes();

render(
  <Provider store={store}>{routes}</Provider>,
  document.querySelector("#App")
);

registerServiceWorker();
