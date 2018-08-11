const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("./models/User");
const Recipe = require("./models/Recipe");
const CONFIG = require("./config/config");
require("./auth/auth");

// user signup POST route (via Passport middleware)
router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    res.json({
      message: "Signup successful!",
      user: req.user
    });
  }
);

// user login POST route (via Passport middleware)
router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const err = new Error("An error occured!");
        return next(err);
      }
      req.login(user, { session: false }, async error => {
        if (err) return next(err);
        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, CONFIG.jwt_secret);
        return res.json({ token, user_id: user._id });
      });
    } catch (err) {
      return next(err);
    }
  })(req, res, next);
});

// authenticate with JWT for the rest of the routes here
router.use("/", passport.authenticate("jwt", { session: false }));

// profile GET route
router.get("/user/profile", (req, res, next) => {
  res.json({
    message: "You made it to the secure route",
    user: req.user,
    token: req.query.secret_token
  });
});

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
