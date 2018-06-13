import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import Step from "../components/Step";
import { removeStep } from "../actions";

const mapStateToProps = (state, ownProps) => {
  const {
    firebase: { data }
  } = state;
  const step = data.recipes
    ? data.recipes.byId[ownProps.recipeId].steps[ownProps.index]
    : "";
  return { step };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    removeStep: (index, recipeId) => {
      dispatch(removeStep(index, recipeId));
    }
  };
};

export default compose(
  firebaseConnect(props => [
    `recipes/byId/${props.recipeId}/steps/${props.index}` // sync /recipes/:recipeId/steps/:stepIndex from firebase into redux
  ]),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Step);
