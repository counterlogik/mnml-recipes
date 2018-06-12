import { connect } from "react-redux";
import Step from "../components/Step";
import { removeStep } from "../actions";

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

const StepContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Step);

export default StepContainer;
