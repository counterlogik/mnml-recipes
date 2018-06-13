import React from "react";

const Step = ({ step, index, removeStep, recipeId }) => {
  return (
    <li>
      {step}
      <button
        className="removeStep"
        onClick={() => removeStep(index, recipeId)}
      >
        &times;
      </button>
    </li>
  );
};

export default Step;
