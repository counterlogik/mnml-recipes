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
      body: JSON.stringify({ title: title, id: recipeId })
    })
      .then(response => {
        if (!response.ok) throw Error(response.statusText);

        return response;
      })
      .catch(error => console.error("Error:", error))
      .then(() => {
        dispatch({
          type: "ADD_RECIPE",
          id: recipeId,
          title
        });
      });
  };
};

export const removeRecipe = id => {
  return (dispatch, getState) => {
    fetch("/api/recipes/remove", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({ id: id })
    })
      .then(response => {
        if (!response.ok) throw Error(response.statusText);

        return response;
      })
      .catch(error => console.error("Error:", error))
      .then(() => {
        const state = getState();

        // remove all ingredients for that recipe ID
        const ingredientsToDelete = state.recipes.byId[id].ingredients;
        ingredientsToDelete.forEach(ingredientId => {
          fetch("/api/ingredients/remove", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({ id: ingredientId, recipeId: id })
          })
            .then(response => {
              if (!response.ok) throw Error(response.statusText);

              return response;
            })
            .catch(error => console.error("Error:", error))
            .then(() => {
              dispatch({
                type: "REMOVE_INGREDIENT",
                id: ingredientId,
                recipeId: id
              });
            });
        });

        // remove all steps for that recipe ID
        const stepsToDelete = state.recipes.byId[id].steps;
        stepsToDelete.forEach(stepId => {
          fetch("/api/steps/remove", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({ id: stepId, recipeId: id })
          })
            .then(response => {
              if (!response.ok) throw Error(response.statusText);

              return response;
            })
            .catch(error => console.error("Error:", error))
            .then(() => {
              dispatch({ type: "REMOVE_STEP", id: stepId, recipeId: id });
            });
        });

        // remove recipe itself
        dispatch({ type: "REMOVE_RECIPE", id });
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
        ingredient: ingredient,
        id: ingredientId,
        recipeId: recipeId
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
          id: ingredientId,
          ingredient,
          recipeId
        });
      });
  };
};

export const removeIngredient = (id, recipeId) => {
  return dispatch => {
    fetch("/api/ingredients/remove", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({ id: id, recipeId: recipeId })
    })
      .then(response => {
        if (!response.ok) throw Error(response.statusText);

        return response;
      })
      .catch(error => console.error("Error:", error))
      .then(() => {
        dispatch({ type: "REMOVE_INGREDIENT", id, recipeId });
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
      body: JSON.stringify({ step: step, id: stepId, recipeId: recipeId })
    })
      .then(response => {
        if (!response.ok) throw Error(response.statusText);

        return response;
      })
      .catch(error => console.error("Error:", error))
      .then(() => {
        dispatch({ type: "ADD_STEP", id: stepId, step, recipeId });
      });
  };
};

export const removeStep = (id, recipeId) => {
  return dispatch => {
    fetch("/api/steps/remove", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({ id: id, recipeId: recipeId })
    })
      .then(response => {
        if (!response.ok) throw Error(response.statusText);

        return response;
      })
      .catch(error => console.error("Error:", error))
      .then(() => {
        dispatch({ type: "REMOVE_STEP", id, recipeId });
      });
  };
};
