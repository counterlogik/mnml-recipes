var express = require("express");
var router = express.Router();

// GET api entry point message
router.get("/", function(req, res, next) {
  res.json({
    message:
      "This default route for our Recipes API, try a more specific route query."
  });
});

// GET recipes listing.
router.get("/recipes", function(req, res, next) {
  res.json({ hi: "respond with resource of recipes" });
  console.log("recipes requested!!!");
});

// GET ingredients listing.
router.get("/ingredients", function(req, res, next) {
  res.send("respond with resource of ingredients");
});

// GET steps listing.
router.get("/steps", function(req, res, next) {
  res.send("respond with resource of steps");
});

module.exports = router;
