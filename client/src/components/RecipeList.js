import React from "react";
import { Link } from "react-router-dom";

const RecipeList = ({ recipes, addRecipe, removeRecipe }) => {
  let recipeTitleInput = React.createRef();

  return (
    <div className="recipeList">
      <h1>Recipes</h1>
      <ul>
        {Object.keys(recipes).map(recipeId => {
          return (
            <li key={recipeId}>
              <Link to={`/recipeDetails/${recipeId}`}>
                <button className="loadRecipe">
                  {recipes[recipeId].title}
                </button>
              </Link>
              <button
                className="removeRecipe"
                onClick={() => removeRecipe(recipeId)}
              >
                &times;
              </button>
            </li>
          );
        })}
      </ul>
      <input name="recipeTitleInput" type="text" ref={recipeTitleInput} />
      <button
        type="button"
        onClick={() => {
          addRecipe(recipeTitleInput.current.value);
          recipeTitleInput.current.value = "";
        }}
      >
        + Add Recipe
      </button>
    </div>
  );
};

export default RecipeList;
