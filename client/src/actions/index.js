import { v4 } from "node-uuid";

// TODO: refactor all pertinent actions to handle one OR many items at once

export const fetchRecipes = userId => {
  return dispatch => {
    fetch("/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        authorization: `Bearer ${localStorage.access_token}`
      },
      body: JSON.stringify({ userId })
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

export const addRecipe = userId => {
  const recipeId = `recipe-${v4()}`;
  return dispatch => {
    fetch("/api/recipes/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        authorization: `Bearer ${localStorage.access_token}`
      },
      body: JSON.stringify({ recipeId, userId })
    })
      .then(response => {
        if (!response.ok) throw Error(response.statusText);

        return response;
      })
      .catch(error => console.error("Error:", error))
      .then(() => {
        dispatch({ type: "ADD_RECIPE", recipeId });
      });
  };
};

export const fetchRecipeDetails = recipeId => {
  return dispatch => {
    fetch(`/api/recipes/details/${recipeId}`, {
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
        dispatch({
          type: "FETCH_RECIPE_DETAILS",
          details
        });
      });
  };
};

export const updateRecipe = (recipeId, title, ingredients, steps) => {
  return (dispatch, getState) => {
    fetch("/api/recipes/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        authorization: `Bearer ${localStorage.access_token}`
      },
      body: JSON.stringify({ recipeId, title, ingredients, steps })
    })
      .then(response => {
        if (!response.ok) throw Error(response.statusText);

        return response;
      })
      .catch(error => console.error("Error:", error))
      .then(() => {
        const state = getState();

        dispatch({
          type: "UPDATE_RECIPE",
          recipeId,
          title,
          ingredients,
          steps
        });
      });
  };
};

export const removeRecipe = recipeId => {
  return (dispatch, getState) => {
    fetch("/api/recipes/remove", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        authorization: `Bearer ${localStorage.access_token}`
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
              "Content-Type": "application/json; charset=utf-8",
              authorization: `Bearer ${localStorage.access_token}`
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
              "Content-Type": "application/json; charset=utf-8",
              authorization: `Bearer ${localStorage.access_token}`
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

export const fetchIngredients = () => {
  return dispatch => {
    fetch("/api/ingredients", {
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
      .then(ingredients => {
        dispatch({
          type: "FETCH_INGREDIENTS",
          ingredients
        });
      });
  };
};

export const updateIngredient = (ingredientId, ingredient) => {
  return dispatch => {
    fetch("/api/ingredients/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        authorization: `Bearer ${localStorage.access_token}`
      },
      body: JSON.stringify({
        ingredientId,
        ingredient
      })
    })
      .then(response => {
        if (!response.ok) throw Error(response.statusText);

        return response;
      })
      .catch(error => console.error("Error:", error))
      .then(() => {
        dispatch({
          type: "UPDATE_INGREDIENT",
          ingredientId,
          ingredient
        });
      });
  };
};

export const addIngredient = (ingredient, recipeId) => {
  const ingredientId = `ingredient-${v4()}`;
  return dispatch => {
    fetch("/api/ingredients/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        authorization: `Bearer ${localStorage.access_token}`
      },
      body: JSON.stringify({
        ingredient: ingredientId,
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
          ingredient: ingredientId,
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
        "Content-Type": "application/json; charset=utf-8",
        authorization: `Bearer ${localStorage.access_token}`
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

export const fetchSteps = () => {
  return dispatch => {
    fetch("/api/steps", {
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
      .then(steps => {
        dispatch({
          type: "FETCH_STEPS",
          steps
        });
      });
  };
};

export const updateStep = (stepId, step) => {
  return dispatch => {
    fetch("/api/steps/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        authorization: `Bearer ${localStorage.access_token}`
      },
      body: JSON.stringify({
        stepId,
        step
      })
    })
      .then(response => {
        if (!response.ok) throw Error(response.statusText);

        return response;
      })
      .catch(error => console.error("Error:", error))
      .then(() => {
        dispatch({
          type: "UPDATE_STEP",
          stepId,
          step
        });
      });
  };
};

export const addStep = (step, recipeId) => {
  const stepId = `step-${v4()}`;
  return dispatch => {
    fetch("/api/steps/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        authorization: `Bearer ${localStorage.access_token}`
      },
      body: JSON.stringify({ step: stepId, stepId, recipeId })
    })
      .then(response => {
        if (!response.ok) throw Error(response.statusText);

        return response;
      })
      .catch(error => console.error("Error:", error))
      .then(() => {
        dispatch({ type: "ADD_STEP", stepId, step: stepId, recipeId });
      });
  };
};

export const removeStep = (stepId, recipeId) => {
  return dispatch => {
    fetch("/api/steps/remove", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        authorization: `Bearer ${localStorage.access_token}`
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
