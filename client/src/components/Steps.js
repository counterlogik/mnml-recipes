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

const StepsList = ({ steps, stepIds }) => {
  if (stepIds && stepIds.length > 0) {
    return (
      <ul className="steps-list">
        {stepIds.map(stepId => (
          <Step
            key={steps[stepId]._id}
            removeStep={removeStep}
            stepId={steps[stepId]._id}
            step={steps[stepId].step}
          />
        ))}
      </ul>
    );
  }

  return <h6>steps...</h6>;
};

const mapStateToProps = state => {
  return {
    steps: state.steps ? state.steps.byId : {}
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
