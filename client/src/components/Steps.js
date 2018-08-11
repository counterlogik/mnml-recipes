import React from "react";
import timesSolid from "../img/times-solid.png";

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
              <textarea
                className="edit-field edit-field--step"
                name={step._id}
                value={step.step}
                onChange={this.handleStepInputChange}
              />
              <button
                className="btn btn--icon btn--delete"
                onClick={() => this.handleStepRemove(step._id)}
              >
                <img
                  className="ico ico--remove"
                  src={timesSolid}
                  alt="remove this step"
                />
              </button>
            </li>
          ))}
      </ul>
    );
  }
}

export default StepsList;
