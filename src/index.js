import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import firebase from "firebase/app";
import "firebase/database";
import "./css/style.css";
import registerServiceWorker from "./registerServiceWorker";

// import the root reducers
import rootReducer from "./reducers/index";

// import firebase config and initialize
import { firebaseConfig } from "./base";
firebase.initializeApp(firebaseConfig);

export const database = firebase.database();

// react-redux-firebase options
const config = {
  userProfile: "users", // firebase root where user profiles are stored
  enableLogging: false // enable/disable Firebase's database logging
};

// Add redux Firebase to compose
const createStoreWithFirebase = compose(reactReduxFirebase(firebase, config))(
  createStore
);

// Create store with reducers and initial state and relevant enhancers
export const store = createStoreWithFirebase(
  rootReducer,
  {},
  applyMiddleware(thunk.withExtraArgument(getFirebase))
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
