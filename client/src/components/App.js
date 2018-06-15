import React from "react";
import { Route, Switch } from "react-router-dom";
import RecipeListContainer from "../containers/RecipeListContainer";
import RecipeDetailsContainer from "../containers/RecipeDetailsContainer";
import NotFound from "./NotFound";

class App extends React.Component {
  state = {
    recipes: {}
  };

  render() {
    return (
      <Switch>
        <Route exact path={"/"} component={RecipeListContainer} />
        <Route
          path={"/recipeDetails/:recipeId"}
          component={RecipeDetailsContainer}
        />
        <Route path={"/notFound"} component={NotFound} />
      </Switch>
    );
  }
}

export default App;
