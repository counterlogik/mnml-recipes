import React from "react";

const Ingredient = ({ ingredient, index, removeIngredient, recipeId }) => {
  return (
    <li>
      {ingredient}
      <button
        className="removeIngredient"
        onClick={() => removeIngredient(index, recipeId)}
      >
        &times;
      </button>
    </li>
  );
};

export default Ingredient;
