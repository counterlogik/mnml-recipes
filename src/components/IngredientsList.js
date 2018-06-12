import React from "react";
import IngredientContainer from "../containers/IngredientContainer";

const IngredientsList = ({ ingredients, recipeId }) => {
  if (ingredients && ingredients.length > 0) {
    return (
      <ul className="ingredients-list">
        {ingredients.map((ingredient, index) => (
          <IngredientContainer
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
