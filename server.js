import express = require("express");

const app = express();

app.set("port", process.env.PORT || 3001);

app.use(express.static("client/build"));

app.listen(app.get("port"), function() {
  console.log(
    `Find the Recipes app server at: http://localhost:${app.get("port")}/`
  );
});
