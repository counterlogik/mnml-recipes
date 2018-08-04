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

// recipes GET route
router.post("/recipes", function(req, res) {
  Recipe.find({ user: req.body.userId }, function(err, docs) {
    if (err) {
      res.send(err);
    } else {
      res.json(docs);
    }
  });
});

// add recipe POST route
router.post("/recipes/add", function(req, res) {
  const recipe = new Recipe({
    title: req.body.title,
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
