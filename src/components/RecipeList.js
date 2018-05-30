import React from "react";

class RecipeList extends React.Component {
  recipeTitleInput = React.createRef();

  createRecipe = event => {
    event.preventDefault();
    this.props.addRecipe(this.recipeTitleInput.current.value);
    // refresh the form
    event.currentTarget.reset();
  };

  render() {
    return (
      <form className="recipeList" onSubmit={this.createRecipe}>
        <h1>Recipes</h1>
        <ul>
          {Object.keys(this.props.recipes).map(key => {
            return (
              <li key={this.props.recipes[key].index}>
                {this.props.recipes[key].title}
                <button
                  className="deleteRecipe"
                  onClick={event => {
                    event.preventDefault();
                    this.props.deleteRecipe(key);
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
        <button type="submit">+ Add Recipe</button>
      </form>
    );
  }
}

export default RecipeList;
