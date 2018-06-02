import React from "react";

import { render } from "react-dom";

// Import CSS
import css from "./css/style.styl";

import registerServiceWorker from "./registerServiceWorker";

// Import Components
import App from "./components/App";
import RecipeDetails from "./components/RecipeDetails";
import RecipeList from "./components/RecipeList";

// Import react router deps
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { Provider } from "react-redux";
import store, { history } from "./store";

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="/" exact component={RecipeList} />
        <Route path="/recipeDetails/:recipeId" component={RecipeDetails} />
      </Route>
    </Router>
  </Provider>
);

render(router, document.getElementById("main"));
registerServiceWorker();
