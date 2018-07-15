import React from "react";
import { connect } from "react-redux";
import { removeStep } from "../actions";

const Step = ({ step, stepId, removeStep, recipeId }) => {
  return (
    <li className="step">
      <p>{step}</p>
      <button
        className="remove remove--step"
        onClick={() => removeStep(stepId, recipeId)}
      >
        &times;
      </button>
    </li>
  );
};

const StepsList = ({ steps, recipeId, removeStep }) => {
  if (steps && steps.length > 0) {
    return (
      <ul className="steps-list">
        {steps.map(step => (
          <Step
            key={step.id}
            removeStep={removeStep}
            stepId={step.id}
            step={step.step}
            recipeId={recipeId}
          />
        ))}
      </ul>
    );
  }

  return <h6>..add some steps..</h6>;
};

const mapStateToProps = (state, ownProps) => {
  return {
    ingredient: ownProps.step,
    index: ownProps.index
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    removeStep: id => {
      dispatch(removeStep(id, ownProps.recipeId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StepsList);
