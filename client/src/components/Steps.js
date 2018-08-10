import React from "react";
import { connect } from "react-redux";
import { removeStep } from "../actions";

const StepsList = ({ steps, stepIds }) => {
  if (Object.keys(steps).length) {
    return (
      <ul className="steps-list">
        {stepIds.map(stepId => (
          <li className="step" key={stepId}>
            <p>{steps[stepId].step}</p>
            <button
              className="remove remove--step"
              onClick={() => removeStep(stepId, this.props.match.recipeId)}
            >
              &times;
            </button>
          </li>
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
