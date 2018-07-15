var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  _id: String,
  username: String,
  password: String
});

// return JSON user data to front end
UserSchema.methods.toWeb = function() {
  let json = this.toJSON();
  json.id = this._id;
  return json;
};

module.exports = mongoose.model("User", UserSchema);
