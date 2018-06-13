import React from "react";
import { connect } from "react-redux";
import { removeIngredient } from "../actions";

const Ingredient = ({ ingredient, index, removeIngredient, recipeId }) => {
  return (
    <li>
      {ingredient}
      <button
        className="removeIngredient"
        onClick={() => removeIngredient(index, recipeId)}
      >
        &times;
      </button>
    </li>
  );
};

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Ingredient);
