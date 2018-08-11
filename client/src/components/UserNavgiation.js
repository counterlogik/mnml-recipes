import React, { Component } from "react";
import Auth from "../services/Auth";

class UserNavgiation extends Component {
  login = () => {
    this.props.history.push("/login");
  };

  logout = () => {
    this.props.history.push("/logout");
  };

  render() {
    return (
      <div className="user-navigation">
        {!Auth.isUserAuthenticated() && (
          <button className="button button--auth" onClick={this.login}>
            log in
          </button>
        )}
        {Auth.isUserAuthenticated() && (
          <button className="button button--auth" onClick={this.logout}>
            log out
          </button>
        )}
      </div>
    );
  }
}

export default UserNavgiation;
