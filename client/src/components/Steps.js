import React from "react";

class StepsList extends React.Component {
  handleStepInputChange = event => {
    this.props.onStepChange(event.target.value, event.target.name);
  };

  removeStep = (stepId, recipeId) => {
    console.log(stepId, recipeId);
  };

  render() {
    const { currentSteps, changedSteps, underEdit } = this.props;
    return (
      <ul className="steps-list">
        {!underEdit &&
          currentSteps.map(step => (
            <li className="step" key={step._id}>
              <p>{step.step}</p>
            </li>
          ))}
        {underEdit &&
          changedSteps.map(step => (
            <li className="step" key={step._id}>
              <input
                name={step._id}
                value={step.step}
                onChange={this.handleStepInputChange}
              />
              <button
                className="remove remove--step"
                onClick={() =>
                  this.removeStep(step._id, this.props.match.recipeId)
                }
              >
                &times;
              </button>
            </li>
          ))}
      </ul>
    );
  }
}

export default StepsList;
