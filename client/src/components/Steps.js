import React from "react";

class StepsList extends React.Component {
  handleStepInputChange = event => {
    this.props.onStepChange(event.target.value, event.target.name);
  };

  handleStepRemove = id => {
    this.props.onStepRemove(id);
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
                onClick={() => this.handleStepRemove(step._id)}
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
