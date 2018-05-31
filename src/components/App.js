import React from "react";
import RecipeList from "./RecipeList";
import RecipeDetails from "./RecipeDetails";
import base from "../base";

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
    let loadedRecipe = this.state.loadedRecipe;
    loadedRecipe = id;
    this.setState({ loadedRecipe: loadedRecipe });
  };

  updateRecipe = recipes => {
    this.setState({ recipes });
  };

  render() {
    return (
      <div className="App">
        <RecipeList
          recipes={this.state.recipes}
          addRecipe={this.addRecipe}
          deleteRecipe={this.deleteRecipe}
          loadRecipe={this.loadRecipe}
        />
        <RecipeDetails
          recipe={
            this.state.loadedRecipe
              ? this.state.recipes[this.state.loadedRecipe]
              : ""
          }
          recipes={this.state.recipes}
          updateRecipe={this.updateRecipe}
        />
      </div>
    );
  }
}

export default App;
