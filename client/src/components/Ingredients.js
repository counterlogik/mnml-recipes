import React from "react";

class IngredientsList extends React.Component {
  handleIngredientInputChange = event => {
    this.props.onIngredientChange(event.target.value, event.target.name);
  };

  handleIngredientRemove = id => {
    this.props.onIngredientRemove(id);
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
                className="edit-field edit-field--ingredient"
                name={ingredient._id}
                value={ingredient.ingredient}
                onChange={this.handleIngredientInputChange}
              />
              <button
                className="btn btn--icon"
                onClick={() => this.handleIngredientRemove(ingredient._id)}
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
