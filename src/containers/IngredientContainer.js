import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import Ingredient from "../components/Ingredient";
import { removeIngredient } from "../actions";

const mapStateToProps = (state, ownProps) => {
  const {
    firebase: { data }
  } = state;
  const ingredient = data.recipes
    ? data.recipes.byId[ownProps.recipeId].ingredients[ownProps.index]
    : "";
  return { ingredient };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    removeIngredient: (index, recipeId) => {
      dispatch(removeIngredient(index, recipeId));
    }
  };
};

export default compose(
  firebaseConnect(props => {
    console.log(props);
    return [
      `recipes/byId/${props.recipeId}/ingredients/${props.index}` // sync /recipes/:recipeId/ingredients/:ingredientIndex from firebase into redux
    ];
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Ingredient);
