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

const IngredientsList = ({ ingredients, ingredientIds }) => {
  if (ingredientIds && ingredientIds.length > 0) {
    return (
      <ul className="ingredients-list">
        {ingredientIds.map(ingredientId => (
          <Ingredient
            key={ingredients[ingredientId]._id}
            removeIngredient={removeIngredient}
            ingredientId={ingredients[ingredientId]._id}
            ingredient={ingredients[ingredientId].ingredient}
          />
        ))}
      </ul>
    );
  }

  return <h6>ingredients....</h6>;
};

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients ? state.ingredients.byId : {}
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
