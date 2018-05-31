import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import RecipeList from "./RecipeList";
import RecipeDetails from "./RecipeDetails";
import base from "../base";
import NotFound from "./NotFound";

class App extends React.Component {
  state = {
    recipes: {},
    loadedRecipe: ""
  };

  componentDidMount() {
    base.syncState("recipes", {
      context: this,
      state: "recipes"
    });
  }

  addRecipe = title => {
    const recipes = this.state.recipes;
    recipes[`recipe-${Date.now()}`] = {
      title: title,
      uid: `recipe-${title}`
    };
    this.setState({ recipes });
  };

  deleteRecipe = id => {
    const recipes = { ...this.state.recipes };
    recipes[id] = null;
    this.setState({ recipes });
  };

  loadRecipe = id => {
    this.setState({ loadedRecipe: id });
  };

  updateRecipe = recipes => {
    this.setState({ recipes });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path={"/"} exact component={RecipeList} />
            <Route path={"/recipeDetails"} component={RecipeDetails} />
            <Route path={"/notFound"} component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
