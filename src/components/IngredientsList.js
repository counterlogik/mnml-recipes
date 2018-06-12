import React from "react";
import Ingredient from "./Ingredient";

const IngredientsList = ({ ingredients }) => {
  if (ingredients && ingredients.length > 0) {
    return (
      <ul className="ingredients-list">
        {ingredients.map(ingredient => (
          <Ingredient key={ingredient} ingredient={ingredient} />
        ))}
      </ul>
    );
  }

  return <h6>..add some ingredients..</h6>;
};

export default IngredientsList;
