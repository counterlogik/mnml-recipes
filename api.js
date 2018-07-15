const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const CONFIG = require("./config/config");
const Recipe = require("./models/Recipe");
const Ingredient = require("./models/Ingredient");
const Step = require("./models/Step");
const passport = require("passport");

// TODO: refactor all pertinent api endpoints to handle one OR many items at once

// set up mongoose connection
const mongoDB =
  "mongodb://" +
  CONFIG.db_user +
  ":" +
  CONFIG.db_password +
  "@" +
  CONFIG.db_host +
  ":" +
  CONFIG.db_port +
  "/" +
  CONFIG.db_name;
mongoose.connect(mongoDB).catch(() => {
  console.log("Cannot connect to Mongo Server:", mongoDB);
});
mongoose.Promise = global.Promise;

let db = mongoose.connection;
module.exports = db;
db.once("open", () => {
  console.log("Connected to Mongo Server at: " + mongoDB);
});
db.on("error", error => {
  console.log("error", error);
});

// ROUTES
// require("./middleware/passport")(passport);

// GET api entry point message
router.get("/", function(req, res, next) {
  res.json({
    message:
      "This is the default route for our Recipes API, try a more specific route query."
  });
});

// recipes GET route
router.get("/recipes", function(req, res) {
  Recipe.find({}, function(err, docs) {
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
    _id: req.body.recipeId
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
