import React from "react";
import Step from "./Step";

const StepsList = ({ steps, recipeId }) => {
  if (steps && steps.length > 0) {
    return (
      <ul className="steps-list">
        {steps.map((step, index) => (
          <Step key={index} index={index} step={step} recipeId={recipeId} />
        ))}
      </ul>
    );
  }

  return <h6>..add some steps..</h6>;
};

export default StepsList;
