import React from "react";
import { Link } from "react-router-dom";
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
      <div className="recipeList">
        <div className="flex-header">
          <h1>your recipes...</h1>
        </div>
        <ul>
          {this.state.recipes.map(recipe => {
            const recipeId = recipe._id;
            return (
              <li key={recipeId}>
                <Link to={`/recipeDetails/${recipeId}`}>
                  <button className="loadRecipe">{recipe.title}</button>
                </Link>
              </li>
            );
          })}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">+ add recipe</button>
        </form>
      </div>
    );
  }
}

export default RecipeList;
