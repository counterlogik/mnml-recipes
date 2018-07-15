import { v4 } from "node-uuid";

// TODO: refactor actions to handle one OR many items at once

export const fetchRecipes = () => {
  return dispatch => {
    fetch("/api/recipes", {
      method: "GET"
    })
      .then(response => {
        if (!response.ok) throw Error(response.statusText);

        return response;
      })
      .catch(error => console.error("Error:", error))
      .then(response => response.json())
      .then(recipes => {
        dispatch({
          type: "FETCH_RECIPES",
          recipes
        });
      });
  };
};

export const addRecipe = title => {
  const recipeId = `recipe-${v4()}`;
  return dispatch => {
    fetch("/api/recipes/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({ title, recipeId })
    })
      .then(response => {
        if (!response.ok) throw Error(response.statusText);

        return response;
      })
      .catch(error => console.error("Error:", error))
      .then(() => {
        dispatch({ type: "ADD_RECIPE", recipeId, title });
      });
  };
};

export const removeRecipe = recipeId => {
  return (dispatch, getState) => {
    fetch("/api/recipes/remove", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({ recipeId })
    })
      .then(response => {
        if (!response.ok) throw Error(response.statusText);

        return response;
      })
      .catch(error => console.error("Error:", error))
      .then(() => {
        const state = getState();

        // remove all ingredients for that recipe ID
        const ingredientsToDelete = state.recipes.byId[recipeId].ingredients;
        ingredientsToDelete.forEach(ingredientId => {
          fetch("/api/ingredients/remove", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
              ingredientId,
              recipeId
            })
          })
            .then(response => {
              if (!response.ok) throw Error(response.statusText);

              return response;
            })
            .catch(error => console.error("Error:", error))
            .then(() => {
              dispatch({
                type: "REMOVE_INGREDIENT",
                ingredientId,
                recipeId
              });
            });
        });

        // remove all steps for that recipe ID
        const stepsToDelete = state.recipes.byId[recipeId].steps;
        stepsToDelete.forEach(stepId => {
          fetch("/api/steps/remove", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
              stepId,
              recipeId
            })
          })
            .then(response => {
              if (!response.ok) throw Error(response.statusText);

              return response;
            })
            .catch(error => console.error("Error:", error))
            .then(() => {
              dispatch({
                type: "REMOVE_STEP",
                stepId,
                recipeId
              });
            });
        });

        // remove recipe itself
        dispatch({ type: "REMOVE_RECIPE", recipeId });
      });
  };
};

export const addIngredient = (ingredient, recipeId) => {
  const ingredientId = `ingredient-${v4()}`;
  return dispatch => {
    fetch("/api/ingredients/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        ingredient,
        ingredientId,
        recipeId
      })
    })
      .then(response => {
        if (!response.ok) throw Error(response.statusText);

        return response;
      })
      .catch(error => console.error("Error:", error))
      .then(() => {
        dispatch({
          type: "ADD_INGREDIENT",
          ingredientId,
          ingredient,
          recipeId
        });
      });
  };
};

export const removeIngredient = (ingredientId, recipeId) => {
  return dispatch => {
    fetch("/api/ingredients/remove", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({ ingredientId, recipeId })
    })
      .then(response => {
        if (!response.ok) throw Error(response.statusText);

        return response;
      })
      .catch(error => console.error("Error:", error))
      .then(() => {
        dispatch({ type: "REMOVE_INGREDIENT", ingredientId, recipeId });
      });
  };
};

export const addStep = (step, recipeId) => {
  const stepId = `step-${v4()}`;
  return dispatch => {
    fetch("/api/steps/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({ step, stepId, recipeId })
    })
      .then(response => {
        if (!response.ok) throw Error(response.statusText);

        return response;
      })
      .catch(error => console.error("Error:", error))
      .then(() => {
        dispatch({ type: "ADD_STEP", stepId, step, recipeId });
      });
  };
};

export const removeStep = (stepId, recipeId) => {
  return dispatch => {
    fetch("/api/steps/remove", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({ stepId, recipeId })
    })
      .then(response => {
        if (!response.ok) throw Error(response.statusText);

        return response;
      })
      .catch(error => console.error("Error:", error))
      .then(() => {
        dispatch({ type: "REMOVE_STEP", stepId, recipeId });
      });
  };
};
