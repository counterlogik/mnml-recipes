import { connect } from "react-redux";
import RecipeDetails from "../components/RecipeDetails";
import {
  removeRecipe,
  updateRecipe,
  updateIngredient,
  addIngredient,
  removeIngredient,
  updateStep,
  addStep,
  removeStep
} from "../actions";

const mapStateToProps = (state, ownProps) => {
  const recipeId = ownProps.match.params.recipeId;

  const recipeIngredientIds =
    state.recipes.byId[recipeId] && state.recipes.byId[recipeId].ingredients
      ? state.recipes.byId[recipeId].ingredients
      : [];

  const recipeIngredients = recipeIngredientIds.map(
    id => state.ingredients.byId[id]
  );

  const recipeStepIds =
    state.recipes.byId[recipeId] && state.recipes.byId[recipeId].steps
      ? state.recipes.byId[recipeId].steps
      : [];

  const recipeSteps = recipeStepIds.map(id => state.steps.byId[id]);

  return {
    recipe: state.recipes.byId[recipeId] || {},
    ingredients: recipeIngredients,
    steps: recipeSteps
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const recipeId = ownProps.match.params.recipeId;

  return {
    removeRecipe: () => {
      dispatch(removeRecipe(recipeId));
    },
    updateRecipe: (
      title,
      ingredients,
      steps,
      removedIngredients,
      removedSteps
    ) => {
      dispatch(
        updateRecipe(
          recipeId,
          title,
          ingredients,
          steps,
          removedIngredients,
          removedSteps
        )
      );
    },
    updateIngredient: (ingredientId, ingredient) => {
      dispatch(updateIngredient(ingredientId, ingredient));
    },
    addIngredient: ingredient => {
      dispatch(addIngredient(ingredient, recipeId));
    },
    removeIngredient: ingredientId => {
      dispatch(removeIngredient(ingredientId, recipeId));
    },
    updateStep: (stepId, step) => {
      dispatch(updateStep(stepId, step));
    },
    addStep: step => {
      dispatch(addStep(step, recipeId));
    },
    removeStep: stepId => {
      dispatch(removeStep(stepId, recipeId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeDetails);
