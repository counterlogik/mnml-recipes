import React from "react";
import IngredientsList from "./Ingredients";
import StepsList from "./Steps";

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
    <main>
      <button>SAVE</button>
      <h4 className="grid-header">{recipe.title}</h4>
      <section className="view-box">
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
      </section>
      <section className="view-box view-box--major">
        <StepsList
          steps={recipe.steps.map(step => {
            return {
              id: step,
              step: steps[step].step
            };
          })}
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
      </section>
    </main>
  );
};

export default RecipeDetails;
