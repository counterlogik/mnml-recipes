import React from "react";
import RecipeList from "./RecipeList";
import base from "../base";

class App extends React.Component {
  state = {
    recipes: {}
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
      dateAdded: Date.now(),
      index: `recipe-${Date.now()}`
    };
    this.setState({ recipes });
  };

  deleteRecipe = key => {
    const recipes = { ...this.state.recipes };
    recipes[key] = null;
    this.setState({ recipes });
  };

  render() {
    return (
      <div className="App">
        <RecipeList
          recipes={this.state.recipes}
          addRecipe={this.addRecipe}
          deleteRecipe={this.deleteRecipe}
        />
      </div>
    );
  }
}

export default App;
