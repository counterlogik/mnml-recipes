import React from "react";

class Step extends React.Component {
  render() {
    return <li key={this.props.index}>{this.props.index}</li>;
  }
}

export default Step;
