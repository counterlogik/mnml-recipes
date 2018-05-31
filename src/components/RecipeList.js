import React from "react";

class RecipeList extends React.Component {
  recipeTitleInput = React.createRef();

  createRecipe = event => {
    event.preventDefault();
    this.props.addRecipe(this.recipeTitleInput.current.value);
    this.recipeTitleInput.current.value = "";
  };

  render() {
    return (
      <div className="recipeList">
        <h1>Recipes</h1>
        <ul>
          {Object.keys(this.props.recipes).map(recipeId => {
            return (
              <li key={recipeId}>
                <button
                  className="loadRecipe"
                  onClick={event => this.props.loadRecipe(recipeId)}
                >
                  {this.props.recipes[recipeId].title}
                </button>
                <button
                  className="deleteRecipe"
                  onClick={event => {
                    this.props.deleteRecipe(recipeId);
                  }}
                >
                  &times;
                </button>
              </li>
            );
          })}
        </ul>
        <input
          name="recipeTitleInput"
          type="text"
          ref={this.recipeTitleInput}
        />
        <button type="button" onClick={this.createRecipe}>
          + Add Recipe
        </button>
      </div>
    );
  }
}

export default RecipeList;
