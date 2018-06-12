import { connect } from "react-redux";
import Ingredient from "../components/Ingredient";
import { removeIngredient } from "../actions";

const mapStateToProps = (state, ownProps) => {
  return {
    ingredient: ownProps.ingredient,
    index: ownProps.index
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    removeIngredient: id => {
      dispatch(removeIngredient(id, ownProps.recipeId));
    }
  };
};

const IngredientContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Ingredient);

export default IngredientContainer;
