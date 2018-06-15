import { connect } from "react-redux";
import RecipeList from "../components/RecipeList";
import { addRecipe, removeRecipe } from "../actions/index";

const mapStateToProps = state => {
  return {
    recipes: state.recipes ? state.recipes.byId : {}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeList);
