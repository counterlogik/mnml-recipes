import React from "react";

class IngredientsList extends React.Component {
  handleIngredientInputChange = event => {
    this.props.onIngredientChange(event.target.value, event.target.name);
  };

  removeIngredient = (ingredientId, recipeId) => {
    console.log(ingredientId, recipeId);
  };

  render() {
    const { currentIngredients, changedIngredients, underEdit } = this.props;
    return (
      <ul className="ingredients-list">
        {!underEdit &&
          currentIngredients.map(ingredient => (
            <li className="ingredient" key={ingredient._id}>
              <p>{ingredient.ingredient}</p>
            </li>
          ))}
        {underEdit &&
          changedIngredients.map(ingredient => (
            <li className="ingredient" key={ingredient._id}>
              <input
                name={ingredient._id}
                value={ingredient.ingredient}
                onChange={this.handleIngredientInputChange}
              />
              <button
                className="remove remove--ingredient"
                onClick={() =>
                  this.removeIngredient(
                    ingredient._id,
                    this.props.match.recipeId
                  )
                }
              >
                &times;
              </button>
            </li>
          ))}
      </ul>
    );
  }
}

export default IngredientsList;
