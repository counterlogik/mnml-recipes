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

      console.log(this.state.current.title);
      console.log(this.state.current.ingredients);
      console.log(this.state.current.steps);

      console.log(this.state.changed.title);
      console.log(this.state.changed.ingredients);
      console.log(this.state.changed.steps);

      let addedIngredients = [];
      let removedIngredients = [];

      let addedSteps = [];
      let removedSteps = [];

      const oldIngredientIds = this.state.current.ingredients.map(
        ingredient => ingredient._id
      );
      const newIngredientIds = this.state.changed.ingredients.map(
        ingredient => ingredient._id
      );

      const oldStepIds = this.state.current.steps.map(step => step._id);
      const newStepIds = this.state.changed.steps.map(step => step._id);

      oldIngredientIds.forEach(oldIngredientId => {
        if (!newIngredientIds.includes(oldIngredientId))
          removedIngredients.push(oldIngredientId);
      });

      newIngredientIds.forEach(newIngredientId => {
        if (!oldIngredientIds.includes(newIngredientId))
          addedIngredients.push(newIngredientId);
      });

      oldStepIds.forEach(oldStepId => {
        if (!newStepIds.includes(oldStepId)) removedSteps.push(oldStepId);
      });

      newStepIds.forEach(newStepId => {
        if (!oldStepIds.includes(newStepId)) addedSteps.push(newStepId);
      });

      this.props.updateRecipe(
        this.state.changed.title,
        newIngredientIds,
        newStepIds
      );
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
