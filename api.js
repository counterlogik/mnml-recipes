const express = require("express");
const router = express.Router();
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
require("dotenv").config();
const Recipe = require("./models/Recipe");
const Ingredient = require("./models/Ingredient");
const Step = require("./models/Step");

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw "Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file";
}

const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ["RS256"]
});

// TODO: refactor all pertinent api endpoints to handle one OR many items at once

// GET api entry point message
router.get("/", function(req, res, next) {
  res.json({
    message:
      "This is the default route for our Recipes API, try a more specific route query."
  });
});

router.use(checkJwt);

// recipes POST route (fetch all recipes for user)
router.post("/recipes", function(req, res) {
  Recipe.find({ user: req.body.userId }, function(err, recipes) {
    if (err) {
      res.send(err);
    } else {
      res.json(recipes);
    }
  });
});

// get recipe details GET route (get recipe title, ingredients, and steps)
router.get("/recipes/details/:id", function(req, res) {
  Recipe.findById(req.params.id, function(err, recipe) {
    if (err) res.send(err);
    else
      res.json({
        message: "Recipe details retrieved!",
        details: recipe
      });
  });
});

// update recipe details POST route (update recipe title, ingredients, and steps)
router.post("/recipes/update", function(req, res) {
  console.log(req.body.ingredients);
  console.log(req.body.steps);
  Recipe.findByIdAndUpdate(
    req.body.recipeId,
    {
      title: req.body.title,
      ingredients: req.body.ingredients.map(ingredient => ingredient._id),
      steps: req.body.steps.map(step => step._id)
    },
    function(err, recipe) {
      if (err) res.send(err);
      else {
        let updatedIngredients = [];
        let newIngredients = [];

        async function processIngredientsArray(ingredientsArray) {
          for (const ingredient of ingredientsArray) {
            await Ingredient.findByIdAndUpdate(
              ingredient._id,
              { ingredient: ingredient.ingredient },
              function(err, doc) {
                if (err) {
                  res.send(err);
                } else {
                  if (doc === null) {
                    newIngredients.push(ingredient);
                  } else {
                    updatedIngredients.push(ingredient);
                  }
                }
              }
            );
          }

          let updatedSteps = [];
          let newSteps = [];

          async function processStepsArray(stepsArray) {
            for (const step of stepsArray) {
              await Step.findByIdAndUpdate(
                step._id,
                { step: step.step },
                function(err, doc) {
                  if (err) {
                    res.send(err);
                  } else {
                    if (doc === null) {
                      newSteps.push(step);
                    } else {
                      updatedSteps.push(step);
                    }
                  }
                }
              );
            }

            async function processNewIngredientsArray(newIngredientsArray) {
              for (const newIngredient of newIngredientsArray) {
                const ingredient = new Ingredient({
                  ingredient: newIngredient.ingredient,
                  _id: newIngredient._id
                });

                await ingredient.save(function(err) {
                  if (err) res.send(err);
                });
              }

              async function processNewStepsArray(newStepsArray) {
                for (const newStep of newStepsArray) {
                  const step = new Step({
                    step: newStep.step,
                    _id: newStep._id
                  });

                  await step.save(function(err) {
                    if (err) res.send(err);
                  });
                }

                async function processRemovedIngredientIdsArray(
                  removedIngredientIdsArray
                ) {
                  for (const removedIngredientId of removedIngredientIdsArray) {
                    await Ingredient.findByIdAndRemove(
                      removedIngredientId,
                      function(err) {
                        if (err) res.send(err);
                      }
                    );
                  }

                  async function processRemovedStepIdsArray(
                    removedStepIdsArray
                  ) {
                    for (const removedStepId of removedStepIdsArray) {
                      await Step.findByIdAndRemove(removedStepId, function(
                        err
                      ) {
                        if (err) res.send(err);
                      });
                    }

                    res.json({
                      message: "Recipe details updated!"
                    });
                  }

                  processRemovedStepIdsArray(req.body.removedSteps);
                }

                processRemovedIngredientIdsArray(req.body.removedIngredients);
              }

              processNewStepsArray(newSteps);
            }

            processNewIngredientsArray(newIngredients);
          }

          processStepsArray(req.body.steps);
        }

        processIngredientsArray(req.body.ingredients);
      }
    }
  );
});

// add recipe POST route
router.post("/recipes/add", function(req, res) {
  const recipe = new Recipe({
    _id: req.body.recipeId,
    user: req.body.userId
  });

  recipe.save(function(err) {
    if (err) res.send(err);
    else res.json({ message: "Recipe added!" });
  });
});

// remove recipe DELETE route
router.delete("/recipes/remove", function(req, res, next) {
  Recipe.findByIdAndRemove(req.body.recipeId, function(err) {
    if (err) res.send(err);
    else res.json({ message: "Recipe deleted!" });
  });
});

// ingredients GET route (fetch all ingredients)
router.get("/ingredients", function(req, res) {
  Ingredient.find({}, function(err, ingredients) {
    if (err) {
      res.send(err);
    } else {
      res.json(ingredients);
    }
  });
});

// ingredients for recipeId POST route (fetch all ingredients for recipeId)
router.post("/ingredients/byRecipeId", function(req, res) {
  Recipe.findById(req.body.recipeId, function(err, recipe) {
    if (err) {
      res.send(err);
    } else {
      let ingredients = [];

      async function processIngredientsArray(ingredientsArray) {
        for (const ingredientId of ingredientsArray) {
          await Ingredient.findById(ingredientId, function(err, ingredient) {
            if (err) {
              res.send(err);
            } else {
              ingredients.push(ingredient);
            }
          });
        }
        res.json(ingredients);
      }

      processIngredientsArray(recipe.ingredients);
    }
  });
});

// update ingredient POST route
router.post("/ingredients/update", function(req, res) {
  Ingredient.findByIdAndUpdate(
    req.body.ingredientId,
    {
      ingredient: req.body.ingredient
    },
    function(err, ingredient) {
      if (err) res.send(err);
      else
        res.json({
          message: "Ingredient updated!"
        });
    }
  );
});

// add ingredient POST route
router.post("/ingredients/add", function(req, res, next) {
  const ingredient = new Ingredient({
    ingredient: req.body.ingredient,
    _id: req.body.ingredientId
  });

  ingredient.save(function(err) {
    if (err) {
      res.send(err);
    } else {
      Recipe.findByIdAndUpdate(
        req.body.recipeId,
        { $push: { ingredients: req.body.ingredientId } },
        function(err) {
          if (err) {
            res.send(err);
          } else {
            res.json({ message: "Ingredient added to recipe!" });
          }
        }
      );
    }
  });
});

// remove ingredient DELETE route
router.delete("/ingredients/remove", function(req, res, next) {
  Ingredient.findByIdAndRemove(req.body.ingredientId, function(err) {
    if (err) {
      res.send(err);
    } else {
      Recipe.findByIdAndUpdate(
        req.body.recipeId,
        { $pull: { ingredients: req.body.ingredientId } },
        function(err) {
          if (err) {
            res.send(err);
          } else {
            res.json({ message: "Ingredient removed from recipe!" });
          }
        }
      );
    }
  });
});

// steps GET route (fetch all steps)
router.get("/steps", function(req, res) {
  Step.find({}, function(err, steps) {
    if (err) {
      res.send(err);
    } else {
      res.json(steps);
    }
  });
});

// steps for recipeId POST route (fetch all steps for recipeId)
router.post("/steps/byRecipeId", function(req, res) {
  Recipe.findById(req.body.recipeId, function(err, recipe) {
    if (err) {
      res.send(err);
    } else {
      let steps = [];

      console.log(recipe.steps);

      async function processStepsArray(stepsArray) {
        for (const stepId of stepsArray) {
          await Step.findById(stepId, function(err, step) {
            if (err) {
              res.send(err);
            } else {
              steps.push(step);
            }
          });
        }
        res.json(steps);
      }

      processStepsArray(recipe.steps);
    }
  });
});

// update step POST route
router.post("/steps/update", function(req, res) {
  Step.findByIdAndUpdate(
    req.body.stepId,
    {
      step: req.body.step
    },
    function(err, ingredient) {
      if (err) res.send(err);
      else
        res.json({
          message: "Step updated!"
        });
    }
  );
});

// add step POST route
router.post("/steps/add", function(req, res, next) {
  const step = new Step({ step: req.body.step, _id: req.body.stepId });

  step.save(function(err) {
    if (err) {
      res.send(err);
    } else {
      Recipe.findByIdAndUpdate(
        req.body.recipeId,
        { $push: { steps: req.body.stepId } },
        function(err) {
          if (err) {
            res.send(err);
          } else {
            res.json({ message: "Step added to recipe!" });
          }
        }
      );
    }
  });
});

// remove step DELETE route
router.delete("/steps/remove", function(req, res, next) {
  Step.findByIdAndRemove(req.body.stepId, function(err) {
    if (err) {
      res.send(err);
    } else {
      Recipe.findByIdAndUpdate(
        req.body.recipeId,
        { $pull: { steps: req.body.stepId } },
        function(err) {
          if (err) {
            res.send(err);
          } else {
            res.json({ message: "Step removed from recipe!" });
          }
        }
      );
    }
  });
});

module.exports = router;
