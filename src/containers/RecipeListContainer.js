import { connect } from "react-redux";
import RecipeList from "../components/RecipeList";
import { addRecipe, removeRecipe } from "../actions";

const mapStateToProps = state => {
  return {
    recipes: state.recipes.byId
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

const RecipeListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeList);

export default RecipeListContainer;
