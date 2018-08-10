const express = require("express");
const router = express.Router();
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
require("dotenv").config();
const Recipe = require("./models/Recipe");

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
    else res.json(recipe);
  });
});

// update recipe details POST route (update recipe title, ingredients, and steps)
router.post("/recipes/update", function(req, res) {
  Recipe.findByIdAndUpdate(
    req.body.recipeId,
    {
      title: req.body.title,
      ingredients: req.body.ingredients,
      steps: req.body.steps
    },
    function(err, recipe) {
      if (err) res.send(err);
      else res.json({ message: "Recipe updated!" });
    }
  );
});

// add recipe POST route
router.post("/recipes/add", function(req, res) {
  const recipe = new Recipe({
    _id: req.body.recipeId,
    user: req.body.userId,
    title: req.body.title ? req.body.title : "(new recipe)",
    ingredients: [],
    steps: []
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

module.exports = router;
