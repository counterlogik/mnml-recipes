import React from "react";
import Step from "./Step";

const StepsList = ({ steps }) => {
  if (steps && steps.length > 0) {
    return (
      <ul className="steps-list">
        {steps.map(step => <Step key={step} step={step} />)}
      </ul>
    );
  }

  return <h6>..add some steps..</h6>;
};

export default StepsList;
