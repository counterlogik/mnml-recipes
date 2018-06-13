import React from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App";
import "./css/style.css";
import registerServiceWorker from "./registerServiceWorker";

// import the root reducers
import rootReducer from "./reducers/index";

// Create store with reducers and initial state and relevant enhancers
export const store = createStore(
  rootReducer,
  {
    recipes: {},
    ingredients: {},
    steps: {}
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.querySelector("#main")
);
registerServiceWorker();
