import React from "react";
import Ingredient from "./Ingredient";

class IngredientsList extends React.Component {
  render() {
    if (this.props.ingredients && this.props.ingredients.length > 0) {
      return (
        <ul className="ingredients-list">
          {this.props.ingredients.map(ingredient => (
            <Ingredient key={ingredient} index={ingredient} />
          ))}
        </ul>
      );
    }

    return <h6>..add some ingredients..</h6>;
  }
}

export default IngredientsList;
