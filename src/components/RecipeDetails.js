import React from "react";
import IngredientsList from "./IngredientsList";
import StepsList from "./StepsList";

const RecipeDetails = ({
  match: { params },
  title,
  ingredients,
  steps,
  addIngredient,
  removeIngredient,
  addStep,
  removeStep
}) => {
  let ingredientContentInput = React.createRef();
  let stepContentInput = React.createRef();

  return (
    <div>
      <h4>{title}</h4>
      <IngredientsList ingredients={ingredients} />
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
      <StepsList steps={steps} />
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
