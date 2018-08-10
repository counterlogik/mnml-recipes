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
    changed: {
      title: "",
      ingredients: [],
      steps: []
    },
    underEdit: false
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      current: {
        title: this.props.recipe.title,
        ingredients: this.props.ingredients,
        steps: this.props.steps
      }
    });
  }

  toggleEditMode = event => {
    event.preventDefault();

    if (!this.state.underEdit) {
      this.setState({
        changed: {
          title: this.state.current.title,
          ingredients: this.state.current.ingredients,
          steps: this.state.current.steps
        },
        underEdit: true
      });
    } else {
      this.setState({
        current: {
          title: this.state.changed.title,
          ingredients: this.state.changed.ingredients,
          steps: this.state.changed.steps
        },
        underEdit: false
      });
    }
  };

  onIngredientChange = (value, id) => {
    const idx = this.state.changed.ingredients.findIndex(
      ingredient => ingredient._id === id
    );
    const ingredientsLength = this.state.changed.ingredients.length;

    this.setState({
      changed: {
        ...this.state.changed,
        ingredients: [
          ...this.state.changed.ingredients.slice(0, idx),
          { __v: 0, ingredient: value, _id: id },
          ...this.state.changed.ingredients.slice(idx + 1, ingredientsLength)
        ]
      }
    });
  };

  onStepChange = (value, id) => {
    const idx = this.state.changed.steps.findIndex(step => step._id === id);
    const stepsLength = this.state.changed.steps.length;

    console.log(this.state);

    this.setState({
      changed: {
        ...this.state.changed,
        steps: [
          ...this.state.changed.steps.slice(0, idx),
          { __v: 0, step: value, _id: id },
          ...this.state.changed.steps.slice(idx + 1, stepsLength)
        ]
      }
    });

    console.log(this.state);
  };

  render() {
    const { addIngredient, addStep } = this.props;
    return (
      <main>
        <h4 className="grid-header">{this.state.current.title}</h4>
        <section className="view-box">
          <IngredientsList
            currentIngredients={this.state.current.ingredients}
            changedIngredients={this.state.changed.ingredients}
            underEdit={this.state.underEdit}
            onIngredientChange={this.onIngredientChange}
          />
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
          <StepsList
            currentSteps={this.state.current.steps}
            changedSteps={this.state.changed.steps}
            underEdit={this.state.underEdit}
            onStepChange={this.onStepChange}
          />
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
