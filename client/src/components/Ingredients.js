import React from "react";
import { connect } from "react-redux";
import { removeIngredient } from "../actions";

const IngredientsList = ({ ingredients, ingredientIds }) => {
  if (Object.keys(ingredients).length) {
    return (
      <ul className="ingredients-list">
        {ingredientIds.map(ingredientId => (
          <li className="ingredient" key={ingredientId}>
            <p>{ingredients[ingredientId].ingredient}</p>
            <button
              className="remove remove--ingredient"
              onClick={() =>
                removeIngredient(ingredientId, this.props.match.recipeId)
              }
            >
              &times;
            </button>
          </li>
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
