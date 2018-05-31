import React from "react";

class Ingredient extends React.Component {
  render() {
    return <li>{this.props.ingredient}</li>;
  }
}

export default Ingredient;
