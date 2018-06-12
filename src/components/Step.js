import React from "react";

const Step = ({ step, index, removeStep, recipeId }) => {
  return (
    <div className="step">
      <li>{step}</li>
      <button
        className="removeStep"
        onClick={() => removeStep(index, recipeId)}
      >
        &times;
      </button>
    </div>
  );
};

export default Step;
