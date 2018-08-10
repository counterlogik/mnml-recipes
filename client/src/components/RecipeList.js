import React from "react";
import { Link } from "react-router-dom";

class RecipeList extends React.Component {
  componentDidMount() {
    this.props.fetchRecipes(localStorage.user_id);
    this.props.fetchIngredients();
    this.props.fetchSteps();
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.addRecipe(localStorage.user_id);
  };

  render() {
    return (
      <div className="recipeList">
        <div className="flex-header">
          <h1>your recipes...</h1>
        </div>
        <ul>
          {Object.keys(this.props.recipes).map(recipeId => {
            return (
              <li key={recipeId}>
                <Link to={`/recipeDetails/${recipeId}`}>
                  <button className="loadRecipe">
                    {this.props.recipes[recipeId].title}
                  </button>
                </Link>
                <button
                  className="removeRecipe"
                  onClick={() => this.props.removeRecipe(recipeId)}
                >
                  &times;
                </button>
              </li>
            );
          })}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">+ Add Recipe</button>
        </form>
      </div>
    );
  }
}

export default RecipeList;
