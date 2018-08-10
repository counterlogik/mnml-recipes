import { connect } from "react-redux";
import RecipeDetails from "../components/RecipeDetails";
import { updateRecipe, addIngredient, addStep } from "../actions";

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
    updateRecipe: (title, ingredients, steps) => {
      dispatch(updateRecipe(recipeId, title, ingredients, steps));
    },
    addIngredient: ingredient => {
      dispatch(addIngredient(ingredient, recipeId));
    },
    addStep: step => {
      dispatch(addStep(step, recipeId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeDetails);
