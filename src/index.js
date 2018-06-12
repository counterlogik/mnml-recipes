import React from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App";
import "./css/style.css";
import registerServiceWorker from "./registerServiceWorker";

// import fake data
import fakeData from "./fakeData";

// import the root reducers
import rootReducer from "./reducers/index";

export const store = createStore(
  rootReducer,
  fakeData,
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
