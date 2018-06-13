import React from "react";
import { connect } from "react-redux";
import { removeStep } from "../actions";

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
)(Step);
