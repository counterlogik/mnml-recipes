import React from "react";

class Ingredient extends React.Component {
  render() {
    return <li key={this.props.index}>{this.props.index}</li>;
  }
}

export default Ingredient;
