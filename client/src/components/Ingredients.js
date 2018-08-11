import React from "react";
import timesSolid from "../img/times-solid.png";

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
              <textarea
                className="edit-field edit-field--ingredient"
                name={ingredient._id}
                value={ingredient.ingredient}
                onChange={this.handleIngredientInputChange}
              />
              <button
                className="btn btn--icon btn--delete"
                onClick={() => this.handleIngredientRemove(ingredient._id)}
              >
                <img
                  className="ico ico--remove"
                  src={timesSolid}
                  alt="remove this ingredient"
                />
              </button>
            </li>
          ))}
      </ul>
    );
  }
}

export default IngredientsList;
