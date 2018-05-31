import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import RecipeList from "./RecipeList";
import RecipeDetails from "./RecipeDetails";
import NotFound from "./NotFound";

const Router = () => (
  <BrowserRouter>
    <Switch>
      {/* <Route path="/" component={App} /> */}
      <Route path="/" component={RecipeList} />
      <Route path="/recipeDetails/:recipeId" component={RecipeDetails} />;
      <Route path="/notFound" component={NotFound} />;
    </Switch>
  </BrowserRouter>
);

export default Router;
