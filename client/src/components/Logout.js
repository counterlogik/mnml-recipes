import React from "react";
import Auth from "../services/Auth";

class LogoutFunction extends React.Component {
  componentDidMount() {
    // deauthenticate user
    Auth.deauthenticateUser();
    // change the current URL to / after logout
    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <p>logging out...</p>
      </div>
    );
  }
}

export default LogoutFunction;
