import React from "react";

class RecipeList extends React.Component {
  render() {
    return (
      <div className="recipeList">
        <h1>Recipes</h1>
        {this.props.recipes.map(recipe => (
          <h2 key={recipe.key}>{recipe.title}</h2>
        ))}
        <button onClick={this.props.addRecipe}>+ Add Recipe</button>
      </div>
    );
  }
}

export default RecipeList;
