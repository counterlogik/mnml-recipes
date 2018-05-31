import React from "react";
import Step from "./Step";

class StepsList extends React.Component {
  render() {
    if (this.props.steps && this.props.steps.length > 0) {
      return (
        <ul className="steps-list">
          {this.props.steps.map(step => <Step key={step} index={step} />)}
        </ul>
      );
    }

    return <h6>..add some steps..</h6>;
  }
}

export default StepsList;
