import { connect } from "react-redux";
import RecipeList from "../components/RecipeList";
import {
  fetchRecipes,
  fetchIngredients,
  fetchSteps,
  addRecipe,
  removeRecipe
} from "../actions/index";

const mapStateToProps = state => {
  return {
    recipes: state.recipes ? state.recipes.byId : {},
    ingredients: state.ingredients ? state.ingredients.byId : {},
    steps: state.steps ? state.steps.byId : {}
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchRecipes: userId => {
      dispatch(fetchRecipes(userId));
    },
    fetchIngredients: () => {
      dispatch(fetchIngredients());
    },
    fetchSteps: () => {
      dispatch(fetchSteps());
    },
    addRecipe: (title, userId) => {
      dispatch(addRecipe(title, userId));
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
