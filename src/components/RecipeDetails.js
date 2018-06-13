import React from "react";
import IngredientsList from "./IngredientsList";
import StepsList from "./StepsList";

const RecipeDetails = ({
  match: { params },
  recipe,
  ingredients,
  steps,
  addIngredient,
  addStep
}) => {
  let ingredientContentInput = React.createRef();
  let stepContentInput = React.createRef();

  return (
    <div>
      <h4>{recipe.title}</h4>
      <IngredientsList
        ingredients={recipe.ingredients.map(
          ingredient => ingredients[ingredient].ingredient
        )}
        recipeId={params.recipeId}
      />
      <input
        name="ingredientContentInput"
        type="text"
        ref={ingredientContentInput}
      />
      <button
        type="button"
        onClick={() => {
          addIngredient(ingredientContentInput.current.value);
          ingredientContentInput.current.value = "";
        }}
      >
        + ingredient
      </button>
      <StepsList
        steps={recipe.steps.map(step => steps[step].step)}
        recipeId={params.recipeId}
      />
      <input name="stepContentInput" type="text" ref={stepContentInput} />
      <button
        type="button"
        onClick={() => {
          addStep(stepContentInput.current.value);
          stepContentInput.current.value = "";
        }}
      >
        + step
      </button>
    </div>
  );
};

export default RecipeDetails;
