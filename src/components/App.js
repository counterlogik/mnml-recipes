import React from "react";
import RecipeList from "./RecipeList";
import base from "../base";

class App extends React.Component {
  state = {
    recipes: []
  };

  componentDidMount() {
    base.syncState("recipes", {
      context: this,
      state: "recipes",
      asArray: true
    });
  }

  addRecipe = () => {
    const recipes = this.state.recipes.concat([
      {
        title: `recipe-${Date.now()}`,
        dateAdded: Date.now()
      }
    ]);
    this.setState({ recipes });
  };

  render() {
    if (this.state.recipes.length < 1) {
      return <h1>No recipes!</h1>;
    }

    return (
      <div className="App">
        <RecipeList recipes={this.state.recipes} addRecipe={this.addRecipe} />
      </div>
    );
  }
}

export default App;
