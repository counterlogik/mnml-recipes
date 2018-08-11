import React, { Component } from "react";
import Auth from "../services/Auth";

class TopNavgiation extends Component {
  login = () => {
    this.props.history.push("/login");
  };

  logout = () => {
    this.props.history.push("/logout");
  };

  render() {
    return (
      <div className="top-navigation">
        {!Auth.isUserAuthenticated() && (
          <button className="btn btn--top-nav" onClick={this.login}>
            log in
          </button>
        )}
        {Auth.isUserAuthenticated() && (
          <button className="btn btn--top-nav" onClick={this.logout}>
            log out
          </button>
        )}
      </div>
    );
  }
}

export default TopNavgiation;
