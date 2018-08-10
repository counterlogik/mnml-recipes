import { connect } from "react-redux";
import RecipeDetails from "../components/RecipeDetails";
import {
  fetchRecipeDetails,
  fetchIngredients,
  fetchSteps,
  addIngredient,
  addStep
} from "../actions";

const mapStateToProps = (state, ownProps) => {
  return {
    recipe: state.recipes.byId[ownProps.match.params.recipeId] || {},
    ingredients:
      state.recipes.byId[ownProps.match.params.recipeId] &&
      state.recipes.byId[ownProps.match.params.recipeId].ingredients
        ? state.recipes.byId[ownProps.match.params.recipeId].ingredients
        : [],
    steps:
      state.recipes.byId[ownProps.match.params.recipeId] &&
      state.recipes.byId[ownProps.match.params.recipeId].steps
        ? state.recipes.byId[ownProps.match.params.recipeId].steps
        : []
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchRecipeDetails: recipeId => {
      dispatch(fetchRecipeDetails(recipeId));
    },
    fetchIngredients: () => {
      dispatch(fetchIngredients());
    },
    fetchSteps: () => {
      dispatch(fetchSteps());
    },
    addIngredient: ingredient => {
      dispatch(addIngredient(ingredient, ownProps.match.params.recipeId));
    },
    addStep: step => {
      dispatch(addStep(step, ownProps.match.params.recipeId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeDetails);
