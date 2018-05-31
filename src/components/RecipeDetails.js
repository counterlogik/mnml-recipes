import React from "react";
import IngredientsList from "./IngredientsList";
import StepsList from "./StepsList";

class RecipeDetails extends React.Component {
  ingredientContentInput = React.createRef();
  stepContentInput = React.createRef();

  addIngredient = () => {
    const recipes = this.props.recipes;
    const ingredients = this.props.recipe.ingredients
      ? this.props.recipe.ingredients.concat([
          this.ingredientContentInput.current.value
        ])
      : [this.ingredientContentInput.current.value];
    const recipeToUpdate = Object.entries(recipes).find(
      recipe => recipe[1].title === this.props.recipe.title
    );
    recipes[recipeToUpdate[0]].ingredients = ingredients;
    this.ingredientContentInput.current.value = "";
    this.props.updateRecipe(recipes);
  };

  addStep = () => {
    const recipes = this.props.recipes;
    const steps = this.props.recipe.steps
      ? this.props.recipe.steps.concat([this.stepContentInput.current.value])
      : [this.stepContentInput.current.value];
    const recipeToUpdate = Object.entries(recipes).find(
      recipe => recipe[1].title === this.props.recipe.title
    );
    recipes[recipeToUpdate[0]].steps = steps;
    this.stepContentInput.current.value = "";
    this.props.updateRecipe(recipes);
  };

  render() {
    if (this.props.recipes[this.props.loadedRecipe]) {
      return (
        <div>
          <h4>{this.props.recipes[this.props.loadedRecipe].title}</h4>
          <IngredientsList
            ingredients={
              this.props.recipes[this.props.loadedRecipe].ingredients
                ? this.props.recipes[this.props.loadedRecipe].ingredients
                : false
            }
          />
          <input
            name="ingredientContentInput"
            type="text"
            ref={this.ingredientContentInput}
          />
          <button type="button" onClick={() => this.addIngredient()}>
            + ingredient
          </button>
          <StepsList
            steps={
              this.props.recipes[this.props.loadedRecipe].steps
                ? this.props.recipes[this.props.loadedRecipe].steps
                : false
            }
          />
          <input
            name="stepContentInput"
            type="text"
            ref={this.stepContentInput}
          />
          <button type="button" onClick={() => this.addStep()}>
            + step
          </button>
        </div>
      );
    }

    return <h5>Load recipe here...</h5>;
  }
}

export default RecipeDetails;
