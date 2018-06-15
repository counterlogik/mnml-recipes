import React from "react";
import { connect } from "react-redux";
import { removeIngredient } from "../actions";

const Ingredient = ({ ingredient, index, removeIngredient, recipeId }) => {
  return (
    <li className="ingredient">
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

const IngredientsList = ({ ingredients, recipeId, removeIngredient }) => {
  if (ingredients && ingredients.length > 0) {
    return (
      <ul className="ingredients-list">
        {ingredients.map((ingredient, index) => (
          <Ingredient
            key={index}
            removeIngredient={removeIngredient}
            index={index}
            ingredient={ingredient}
            recipeId={recipeId}
          />
        ))}
      </ul>
    );
  }

  return <h6>..add some ingredients..</h6>;
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
)(IngredientsList);
