import React from "react";
import { connect } from "react-redux";
import { removeIngredient } from "../actions";

const Ingredient = ({
  ingredient,
  ingredientId,
  removeIngredient,
  recipeId
}) => {
  return (
    <li className="ingredient">
      <p>{ingredient}</p>
      <button
        className="remove remove--ingredient"
        onClick={() => removeIngredient(ingredientId, recipeId)}
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
        {ingredients.map(ingredient => (
          <Ingredient
            key={ingredient.id}
            removeIngredient={removeIngredient}
            ingredientId={ingredient.id}
            ingredient={ingredient.ingredient}
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
