import React from "react";
import Ingredient from "./Ingredient";

const IngredientsList = ({ ingredients, recipeId }) => {
  if (ingredients && ingredients.length > 0) {
    return (
      <ul className="ingredients-list">
        {ingredients.map((ingredient, index) => (
          <Ingredient
            key={index}
            index={index}
            ingredient={ingredient}
            recipeId={recipeId}
          />
        ))}
      </ul>
    );
  }

  return <h6>..add some ingredients..</h6>;
};

export default IngredientsList;
