import React from "react";
import IngredientsList from "./Ingredients";
import StepsList from "./Steps";

class RecipeDetails extends React.Component {
  state = {
    current: {
      title: "",
      ingredients: [],
      steps: []
    },
    new: {
      title: "",
      ingredients: [],
      steps: []
    },
    underEdit: false
  };

  componentDidMount() {
    this.props.fetchRecipeDetails(this.props.match.params.recipeId);
    this.props.fetchIngredients();
    this.props.fetchSteps();
    console.log(this.props);
  }

  // componentWillMount() {
  //   this.setState({
  //     current: {
  //       title: this.props.recipe.title,
  //       ingredients: [],
  //       steps: []
  //     },
  //     new: {
  //       title: this.props.recipe.title,
  //       ingredients: [],
  //       steps: []
  //     }
  //   });
  // }

  toggleEditMode = event => {
    event.preventDefault();
    this.setState({ underEdit: !this.state.underEdit });
  };

  render() {
    const {
      match,
      recipe,
      ingredients,
      steps,
      addIngredient,
      addStep
    } = this.props;

    console.log(ingredients);
    console.log(steps);

    return (
      <main>
        <h4 className="grid-header">{recipe.title}</h4>
        <section className="view-box">
          <IngredientsList ingredientIds={ingredients} />
          <button
            type="button"
            onClick={() => {
              addIngredient();
            }}
          >
            + ingredient
          </button>
        </section>
        <section className="view-box view-box--major">
          {<StepsList stepIds={steps} />}
          <button
            type="button"
            onClick={() => {
              addStep();
            }}
          >
            + step
          </button>
        </section>
        <div className="recipe-actions">
          <button type="button" onClick={this.toggleEditMode}>
            edit this recipe
          </button>
        </div>
      </main>
    );
  }
}

export default RecipeDetails;
