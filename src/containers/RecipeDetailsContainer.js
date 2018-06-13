import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import RecipeDetails from "../components/RecipeDetails";
import {
  addIngredient,
  removeIngredient,
  addStep,
  removeStep
} from "../actions";

const mapStateToProps = (state, ownProps) => {
  const {
    firebase: { data }
  } = state;
  const recipe = data.recipes
    ? { ...data.recipes.byId[ownProps.match.params.recipeId] }
    : {};
  return recipe;
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

export default compose(
  firebaseConnect(props => [
    `recipes/byId/${props.match.params.recipeId}` // sync /recipes/:recipeId from firebase into redux
  ]),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(RecipeDetails);
