import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import RecipeList from "../components/RecipeList";
import { addRecipe, removeRecipe } from "../actions";

const mapStateToProps = state => {
  const {
    firebase: { data }
  } = state;
  return {
    recipes: data.recipes ? data.recipes.byId : {}
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addRecipe: title => {
      dispatch(addRecipe(title));
    },
    removeRecipe: id => {
      dispatch(removeRecipe(id));
    }
  };
};

export default compose(
  firebaseConnect([
    "recipes" // sync /recipes from firebase into redux
  ]),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(RecipeList);
