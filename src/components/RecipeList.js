import React from "react";
import { Link } from "react-router-redux";

class RecipeList extends React.Component {
  recipeTitleInput = React.createRef();

  createRecipe = event => {
    event.preventDefault();
    this.props.addRecipe(this.recipeTitleInput.current.value);
    this.recipeTitleInput.current.value = "";
  };

  render() {
    return (
      <div className="dashboard">
        <h1 className="dashboard__header">recipes</h1>
        <ul className="hero-list">
          {Object.keys(this.props.recipes).map((recipe, i) => {
            return (
              <li
                i={i}
                recipe={recipe}
                {...this.props}
                className="hero-list__item"
              >
                <Link to={`/recipeDetails/${recipe.id}`}>
                  <button className="loadRecipe">
                    {this.props.recipes[recipe].title}
                  </button>
                </Link>
                <button
                  className="deleteRecipe"
                  onClick={() => this.props.deleteRecipe(recipe)}
                >
                  &times;
                </button>
              </li>
            );
          })}
          <li className="hero-list__item">
            <input
              name="recipeTitleInput"
              type="text"
              ref={this.recipeTitleInput}
            />
            <button type="button" onClick={this.createRecipe}>
              + Add Recipe
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

export default RecipeList;
