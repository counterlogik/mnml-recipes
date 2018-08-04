import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/fork-and-knife.png";

class RecipeList extends React.Component {
  recipeTitleInput = React.createRef();

  componentDidMount() {
    this.props.fetchRecipes(localStorage.user_id);
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.addRecipe(
      this.recipeTitleInput.current.value,
      localStorage.user_id
    );
    this.recipeTitleInput.current.value = "";
  };

  render() {
    return (
      <div className="recipeList">
        <div className="flex-header">
          <img src={logo} alt="Recipes!" />
          <h1>Recipes</h1>
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
          <input
            name="recipeTitleInput"
            type="text"
            ref={this.recipeTitleInput}
          />
          <button type="submit">+ Add Recipe</button>
        </form>
      </div>
    );
  }
}

export default RecipeList;
