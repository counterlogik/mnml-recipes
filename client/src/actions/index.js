import { v4 } from "node-uuid";

export const addRecipe = title => {
  const recipeId = `recipe-${v4()}`;
  return dispatch => {
    fetch("/api/recipes/add", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, same-origin, *omit
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify({ title: title, id: recipeId }) // body data type must match "Content-Type" header
    })
      .then(response => {
        if (!response.ok) throw Error(response.statusText);

        return response;
      })
      .catch(error => console.error("Error:", error))
      .then(response => {
        dispatch({
          type: "ADD_RECIPE",
          id: recipeId,
          title
        });
      });
  };
};

export const removeRecipe = id => {
  return dispatch => {
    fetch("/api/recipes/remove", {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, same-origin, *omit
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify({ id: id }) // body data type must match "Content-Type" header
    })
      .then(response => {
        if (!response.ok) throw Error(response.statusText);

        return response;
      })
      .catch(error => console.error("Error:", error))
      .then(response => {
        dispatch({
          type: "REMOVE_RECIPE",
          id
        });
      });
  };
};

export const addIngredient = (ingredient, recipeId) => {
  const ingredientId = `ingredient-${v4()}`;
  return dispatch => {
    fetch("/api/ingredients/add", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, same-origin, *omit
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify({
        ingredient: ingredient,
        id: ingredientId,
        recipeId: recipeId
      }) // body data type must match "Content-Type" header
    })
      .then(response => {
        if (!response.ok) throw Error(response.statusText);

        return response;
      })
      .catch(error => console.error("Error:", error))
      .then(response => {
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
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, same-origin, *omit
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify({ id: id, recipeId: recipeId }) // body data type must match "Content-Type" header
    })
      .then(response => {
        if (!response.ok) throw Error(response.statusText);

        return response;
      })
      .catch(error => console.error("Error:", error))
      .then(response => {
        dispatch({
          type: "REMOVE_INGREDIENT",
          id,
          recipeId
        });
      });
  };
};

export const addStep = (step, recipeId) => {
  const stepId = `step-${v4()}`;
  return dispatch => {
    fetch("/api/steps/add", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, same-origin, *omit
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify({ step: step, id: stepId, recipeId: recipeId }) // body data type must match "Content-Type" header
    })
      .then(response => {
        if (!response.ok) throw Error(response.statusText);

        return response;
      })
      .catch(error => console.error("Error:", error))
      .then(response => {
        dispatch({
          type: "ADD_STEP",
          id: stepId,
          step,
          recipeId
        });
      });
  };
};

export const removeStep = (id, recipeId) => {
  return dispatch => {
    fetch("/api/steps/remove", {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, same-origin, *omit
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify({ id: id, recipeId: recipeId }) // body data type must match "Content-Type" header
    })
      .then(response => {
        if (!response.ok) throw Error(response.statusText);

        return response;
      })
      .catch(error => console.error("Error:", error))
      .then(response => {
        dispatch({
          type: "REMOVE_STEP",
          id,
          recipeId
        });
      });
  };
};
