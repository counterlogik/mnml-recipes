import React from "react";
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

  addItem = newRecipe => {
    const recipes = this.state.recipes.concat([
      {
        title: newRecipe,
        dateAdded: Date.now()
      }
    ]);
    this.setState({ recipes });
  };

  render() {
    return <div className="App" />;
  }
}

export default App;
