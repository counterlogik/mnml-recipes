import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App";
import throttle from "lodash/throttle";
import { loadState, saveState } from "./localStorage";
import "./css/style.css";
import registerServiceWorker from "./registerServiceWorker";

// import the root reducers
import rootReducer from "./reducers/index";

// try to load state from localStorage
const persistedState = loadState();

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

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.querySelector("#App")
);
registerServiceWorker();
