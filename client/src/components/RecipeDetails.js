import React from "react";
import { Link } from "react-router-dom";
import IngredientsList from "./Ingredients";
import StepsList from "./Steps";
import Modal from "./Modal";
import arrowLeft from "../img/arrow-alt-circle-left-regular.png";
import editSolid from "../img/edit-solid.png";
import trashAltSolid from "../img/trash-alt-solid.png";
import saveDisk from "../img/save.png";
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
    underEdit: false,
    isModalOpen: false,
    activeTab: "ingredients"
  };

  componentDidMount() {
    fetch(`/api/recipes/details/${this.props.match.params.recipeId}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.access_token}`
      }
    })
      .then(response => {
        if (!response.ok) throw Error(response.statusText);

        return response;
      })
      .catch(error => console.error("Error:", error))
      .then(response => response.json())
      .then(details => {
        this.setState({
          ...this.state,
          current: {
            title: details.title,
            ingredients: details.ingredients,
            steps: details.steps
          }
        });
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

      fetch("/api/recipes/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          authorization: `Bearer ${localStorage.access_token}`
        },
        body: JSON.stringify({
          recipeId: this.props.match.params.recipeId,
          title: this.state.changed.title,
          ingredients: this.state.changed.ingredients,
          steps: this.state.changed.steps
        })
      })
        .then(response => {
          if (!response.ok) throw Error(response.statusText);

          return response;
        })
        .catch(error => console.error("Error:", error))
        .then(() => {
          this.setState({
            current: {
              title: this.state.changed.title,
              ingredients: this.state.changed.ingredients,
              steps: this.state.changed.steps
            }
          });
        });
    }
  };

  toggleContents = () => {
    this.setState({
      activeTab:
        this.state.activeTab === "ingredients" ? "steps" : "ingredients"
    });
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  deleteRecipe = () => {
    this.props.history.replace("/dashboard");

    fetch("/api/recipes/remove", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        authorization: `Bearer ${localStorage.access_token}`
      },
      body: JSON.stringify({ recipeId: this.props.match.params.recipeId })
    })
      .then(response => {
        if (!response.ok) throw Error(response.statusText);

        return response;
      })
      .catch(error => console.error("Error:", error))
      .then(() => {
        this.props.history.replace("/dashboard");
      });
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
      <div className="container container--details">
        <div className="page-header">
          {!this.state.underEdit && (
            <h4 className="header header--main">{this.state.current.title}</h4>
          )}
          {this.state.underEdit && (
            <input
              className="recipe-title-input"
              value={this.state.changed.title}
              onChange={this.handleRecipeTitleChange}
            />
          )}
        </div>

        <main>
          <section
            className={
              "view-box view-box--steps" +
              (this.state.activeTab === "steps" ? " view-box--is-active" : "")
            }
          >
            <IngredientsList
              currentIngredients={this.state.current.ingredients}
              changedIngredients={this.state.changed.ingredients}
              underEdit={this.state.underEdit}
              onIngredientChange={this.onIngredientChange}
              onIngredientRemove={this.onIngredientRemove}
            />
            {this.state.underEdit && (
              <button
                className="btn btn--small"
                type="button"
                onClick={this.handleAddIngredient}
              >
                + ingredient
              </button>
            )}
          </section>
          <section
            className={
              "view-box view-box--ingredients" +
              (this.state.activeTab === "ingredients"
                ? " view-box--is-active"
                : "")
            }
          >
            <StepsList
              currentSteps={this.state.current.steps}
              changedSteps={this.state.changed.steps}
              underEdit={this.state.underEdit}
              onStepChange={this.onStepChange}
              onStepRemove={this.onStepRemove}
            />
            {this.state.underEdit && (
              <button
                className="btn btn--small"
                type="button"
                onClick={this.handleAddStep}
              >
                + step
              </button>
            )}
          </section>
        </main>
        <div className="details-chooser">
          <button
            className={
              "btn btn--details-chooser" +
              (this.state.activeTab === "steps"
                ? " btn--details-chooser--is-active"
                : "")
            }
            type="button"
            onClick={this.toggleContents}
          >
            ingredients
          </button>
          <button
            className={
              "btn btn--details-chooser" +
              (this.state.activeTab === "ingredients"
                ? " btn--details-chooser--is-active"
                : "")
            }
            type="button"
            onClick={this.toggleContents}
          >
            steps
          </button>
        </div>
        <div className="bottom-navigation">
          <div className="app-navigation">
            <Link to={"/dashboard"}>
              <button className="btn btn--nav" type="button">
                <img
                  className="ico ico--nav"
                  src={arrowLeft}
                  alt="go back to recipes list"
                />
              </button>
            </Link>
          </div>
          <div className="recipe-actions">
            <button
              className="btn btn--edit"
              type="button"
              onClick={this.toggleEditMode}
            >
              {!this.state.underEdit ? (
                <img
                  className="ico ico--edit"
                  src={editSolid}
                  alt="edit this recipe"
                />
              ) : (
                <img
                  className="ico ico--edit"
                  src={saveDisk}
                  alt="save this recipe"
                />
              )}
            </button>
            {this.state.underEdit && (
              <button
                className="btn btn--delete"
                type="button"
                onClick={this.openModal}
              >
                <img
                  className="ico ico--delete"
                  src={trashAltSolid}
                  alt="delete this recipe"
                />
              </button>
            )}
          </div>
        </div>
        <Modal>
          {this.state.isModalOpen && (
            <div className="modal">
              <h4 className="modal-header">
                Are you sure you want to delete this recipe?
              </h4>
              <div className="btn-group btn-group--modal">
                <button className="btn btn--modal" onClick={this.deleteRecipe}>
                  delete recipe
                </button>
                <button className="btn btn--modal" onClick={this.closeModal}>
                  do not delete
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    );
  }
}

export default RecipeDetails;
