import React from "react";
import IngredientsList from "./Ingredients";
import StepsList from "./Steps";
import { v4 } from "node-uuid";

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

  handleRecipeTitleChange = event => {
    this.setState({
      changed: {
        title: event.target.value,
        ingredients: this.state.changed.ingredients,
        steps: this.state.changed.steps
      }
    });
  };

  handleAddIngredient = event => {
    event.preventDefault();

    const ingredientId = `ingredient-${v4()}`;
    this.setState({
      changed: {
        title: this.state.changed.title,
        ingredients: this.state.changed.ingredients.concat({
          __v: 0,
          ingredient: "",
          _id: ingredientId
        }),
        steps: this.state.changed.steps
      }
    });
  };

  handleAddStep = event => {
    event.preventDefault();

    const stepId = `step-${v4()}`;
    this.setState({
      changed: {
        title: this.state.changed.title,
        ingredients: this.state.changed.ingredients,
        steps: this.state.changed.steps.concat({
          __v: 0,
          step: "",
          _id: stepId
        })
      }
    });
  };

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

      let removedIngredients = [];
      let removedSteps = [];

      const oldIngredientIds = this.state.current.ingredients.map(
        ingredient => ingredient._id
      );
      const changedIngredientIds = this.state.changed.ingredients.map(
        ingredient => ingredient._id
      );

      const oldStepIds = this.state.current.steps.map(step => step._id);
      const changedStepIds = this.state.changed.steps.map(step => step._id);

      oldIngredientIds.forEach(oldIngredientId => {
        if (!changedIngredientIds.includes(oldIngredientId))
          removedIngredients.push(oldIngredientId);
      });

      oldStepIds.forEach(oldStepId => {
        if (!changedStepIds.includes(oldStepId)) removedSteps.push(oldStepId);
      });

      this.props.updateRecipe(
        this.state.changed.title,
        this.state.changed.ingredients,
        this.state.changed.steps,
        removedIngredients,
        removedSteps
      );
    }
  };

  deleteRecipe = event => {
    this.props.history.replace("/dashboard");
    this.props.removeRecipe();
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

  onIngredientRemove = id => {
    const idx = this.state.changed.ingredients.findIndex(
      ingredient => ingredient._id === id
    );
    const ingredientsLength = this.state.changed.ingredients.length;

    this.setState({
      changed: {
        ...this.state.changed,
        ingredients: [
          ...this.state.changed.ingredients.slice(0, idx),
          ...this.state.changed.ingredients.slice(idx + 1, ingredientsLength)
        ]
      }
    });
  };

  onStepChange = (value, id) => {
    const idx = this.state.changed.steps.findIndex(step => step._id === id);
    const stepsLength = this.state.changed.steps.length;

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
  };

  onStepRemove = id => {
    const idx = this.state.changed.steps.findIndex(step => step._id === id);
    const stepsLength = this.state.changed.steps.length;

    this.setState({
      changed: {
        ...this.state.changed,
        steps: [
          ...this.state.changed.steps.slice(0, idx),
          ...this.state.changed.steps.slice(idx + 1, stepsLength)
        ]
      }
    });
  };

  render() {
    return (
      <main>
        <h2> ... </h2>
        {!this.state.underEdit && (
          <h4 className="grid-header">{this.state.current.title}</h4>
        )}
        {this.state.underEdit && (
          <input
            className="recipe-title-input"
            value={this.state.changed.title}
            onChange={this.handleRecipeTitleChange}
          />
        )}
        <section className="view-box">
          <IngredientsList
            currentIngredients={this.state.current.ingredients}
            changedIngredients={this.state.changed.ingredients}
            underEdit={this.state.underEdit}
            onIngredientChange={this.onIngredientChange}
            onIngredientRemove={this.onIngredientRemove}
          />
          {this.state.underEdit && (
            <button type="button" onClick={this.handleAddIngredient}>
              + ingredient
            </button>
          )}
        </section>
        <section className="view-box view-box--major">
          <StepsList
            currentSteps={this.state.current.steps}
            changedSteps={this.state.changed.steps}
            underEdit={this.state.underEdit}
            onStepChange={this.onStepChange}
            onStepRemove={this.onStepRemove}
          />
          {this.state.underEdit && (
            <button type="button" onClick={this.handleAddStep}>
              + step
            </button>
          )}
        </section>
        <div className="recipe-actions">
          <button type="button" onClick={this.toggleEditMode}>
            {!this.state.underEdit ? "edit this recipe" : "save this recipe"}
          </button>
          {this.state.underEdit && (
            <button type="button" onClick={this.deleteRecipe}>
              delete this recipe
            </button>
          )}
        </div>
      </main>
    );
  }
}

export default RecipeDetails;
