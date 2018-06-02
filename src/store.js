import { createStore, compose } from "redux";
import { syncHistoryWithStore } from "react-router";
import { browserHistory } from "react-router-redux";

// import the root reducers
import rootReducer from "./reducers/index";

// import the data
import recipes from "./data/recipes";

// create an object for the defautl data
const defaultState = {
  recipes: {
    byId: recipes,
    allIds: []
  },
  ingredients: {
    byId: {},
    allIds: []
  },
  steps: {
    byId: {},
    allIds: []
  }
};

const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(rootReducer, defaultState, enhancers);

export const history = syncHistoryWithStore(browserHistory, store);

if (module.hot) {
  module.hot.accept("./reducers/", () => {
    const nextRootReducer = require("./reducers/index").default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
