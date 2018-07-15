import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { BrowserRouter as Router } from "react-router-dom";
import throttle from "lodash/throttle";
import App from "./components/App";
import "./css/style.css";
import registerServiceWorker from "./registerServiceWorker";

// import the root reducers
import rootReducer from "./reducers/index";

const initialState = {};

// Create store with reducers and initial state and relevant enhancers
export const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
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
