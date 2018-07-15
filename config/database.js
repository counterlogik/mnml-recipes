const CONFIG = require("./config");

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

module.exports = {
  secret: "nodeauthsecret",
  database: "mongodb://localhost/node-auth"
};
