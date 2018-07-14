const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const Ingredient = require("./models/Ingredient");
const Recipe = require("./models/Recipe");
const Step = require("./models/Step");
const app = express();

// here we are configuring express to use body-parser as middle-ware.
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// GET api entry point message
router.get("/", function(req, res, next) {
  res.json({
    message:
      "This is the default route for our Recipes API, try a more specific route query."
  });
});

// add route
router.get("/recipes/add", function(req, res, next) {
  res.json({
    message: "Add recipe route, try a POST next time!"
  });
});

// add submit POST route
router.post("/recipes/add", function(req, res) {
  const recipe = new Recipe({ title: req.body.title, _id: req.body.id });
  recipe.title = req.body.title;

  recipe.save(function(err) {
    if (err) res.send(err);
    else res.json({ message: "Recipe deleted!" });
  });
});

// remove route
router.get("/recipes/remove", function(req, res, next) {
  res.json({
    message: "Remove recipe route, try a POST next time!"
  });
});

// remove submit POST route
router.delete("/recipes/remove", function(req, res, next) {
  Recipe.findByIdAndRemove(req.body.id, function(err) {
    if (err) res.send(err);
    else res.json({ message: "Recipe deleted!" });
  });
});

// add route
router.get("/ingredients/add", function(req, res, next) {
  res.json({
    message: "Add ingredient route, try a POST next time!"
  });
});

// add submit POST route
router.post("/ingredients/add", function(req, res, next) {
  const ingredient = new Ingredient({
    ingredient: req.body.ingredient,
    _id: req.body.id
  });

  ingredient.save(function(err) {
    if (err) {
      res.send(err);
    } else {
      Recipe.findByIdAndUpdate(
        req.body.recipeId,
        { $push: { ingredients: req.body.id } },
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

// remove route
router.get("/ingredients/remove", function(req, res, next) {
  res.json({
    message: "Remove ingredient route, try a POST next time!"
  });
});

// remove submit POST route
router.delete("/ingredients/remove", function(req, res, next) {
  Ingredient.findByIdAndRemove(req.body.id, function(err) {
    if (err) {
      res.send(err);
    } else {
      Recipe.findByIdAndUpdate(
        req.body.recipeId,
        { $pull: { ingredients: req.body.id } },
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

// add route
router.get("/steps/add", function(req, res, next) {
  res.json({
    message: "Add step route, try a POST next time!"
  });
});

// add submit POST route
router.post("/steps/add", function(req, res, next) {
  const step = new Step({ step: req.body.step, _id: req.body.id });

  step.save(function(err) {
    if (err) {
      res.send(err);
    } else {
      Recipe.findByIdAndUpdate(
        req.body.recipeId,
        { $push: { steps: req.body.id } },
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

// remove route
router.get("/steps/remove", function(req, res, next) {
  res.json({
    message: "Remove step route, try a POST next time!"
  });
});

// remove submit POST route
router.delete("/steps/remove", function(req, res, next) {
  Step.findByIdAndRemove(req.body.id, function(err) {
    if (err) {
      res.send(err);
    } else {
      Recipe.findByIdAndUpdate(
        req.body.recipeId,
        { $pull: { steps: req.body.id } },
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
