import { connect } from "react-redux";
import RecipeDetails from "../components/RecipeDetails";
import {
  addIngredient,
  removeIngredient,
  addStep,
  removeStep
} from "../actions";

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.recipes.byId[ownProps.match.params.recipeId]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addIngredient: ingredient => {
      dispatch(addIngredient(ingredient, ownProps.match.params.recipeId));
    },
    removeIngredient: index => {
      dispatch(removeIngredient(index, ownProps.match.params.recipeId));
    },
    addStep: step => {
      dispatch(addStep(step, ownProps.match.params.recipeId));
    },
    removeStep: index => {
      dispatch(removeStep(index, ownProps.match.params.recipeId));
    }
  };
};

const RecipeDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeDetails);

export default RecipeDetailsContainer;
