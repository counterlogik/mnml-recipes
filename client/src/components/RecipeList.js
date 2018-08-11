import React from "react";
import { Link } from "react-router-dom";
import plusCircle from "../img/plus-solid.png";
import { v4 } from "node-uuid";

class RecipeList extends React.Component {
  state = {
    recipes: []
  };

  componentDidMount() {
    fetch("/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        authorization: `Bearer ${localStorage.access_token}`
      },
      body: JSON.stringify({ userId: localStorage.user_id })
    })
      .then(response => {
        if (!response.ok) throw Error(response.statusText);

        return response;
      })
      .catch(error => console.error("Error:", error))
      .then(response => response.json())
      .then(recipes => {
        this.setState({ recipes: recipes });
      });
  }

  handleSubmit = event => {
    event.preventDefault();

    // make fetch to API to add Recipe
    const recipeId = `recipe-${v4()}`;
    fetch("/api/recipes/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        authorization: `Bearer ${localStorage.access_token}`
      },
      body: JSON.stringify({ recipeId, userId: localStorage.user_id })
    })
      .then(response => {
        if (!response.ok) throw Error(response.statusText);

        return response;
      })
      .catch(error => console.error("Error:", error))
      .then(() => {
        this.props.history.replace(`/recipeDetails/${recipeId}`);
      });
  };

  render() {
    return (
      <div className="recipe-list">
        <div className="flex-header">
          <h1>your recipes...</h1>
        </div>
        <ul className="recipe-list-grid">
          {this.state.recipes.map(recipe => {
            const recipeId = recipe._id;
            return (
              <li key={recipeId}>
                <Link to={`/recipeDetails/${recipeId}`}>
                  <button className="btn btn--link">{recipe.title}</button>
                </Link>
              </li>
            );
          })}
        </ul>
        <form className="dashboard-actions" onSubmit={this.handleSubmit}>
          <button className="btn btn--add" type="submit">
            <img className="ico ico--add" src={plusCircle} alt="add a recipe" />
          </button>
        </form>
      </div>
    );
  }
}

export default RecipeList;
