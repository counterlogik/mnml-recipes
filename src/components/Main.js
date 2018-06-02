import React from "react";
import { Link } from "react-router-redux";

class Main extends React.Component {
  render() {
    return (
      <div>
        <h1>
          <Link to="\">recipes</Link>
        </h1>
        {React.cloneElement(this.props.children, this.props)}
      </div>
    );
  }
}

export default Main;
