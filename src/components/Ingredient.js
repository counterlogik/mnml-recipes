import React from "react";

const Ingredient = ({ ingredient, index, removeIngredient, recipeId }) => {
  return (
    <div className="ingredient">
      <li>{ingredient}</li>
      <button
        className="removeIngredient"
        onClick={() => removeIngredient(index, recipeId)}
      >
        &times;
      </button>
    </div>
  );
};

export default Ingredient;
