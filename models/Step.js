var stepSchema = mongoose.Schema({
  id: String,
  step: String
});

var Step = mongoose.model("Step", StepSchema);

module.exports = mongoose.model("Step", StepSchema);
