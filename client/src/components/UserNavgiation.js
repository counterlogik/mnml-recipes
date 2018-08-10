import React, { Component } from "react";

class UserNavgiation extends Component {
  login = () => {
    this.props.auth.login();
  };

  logout = () => {
    this.props.auth.logout();
  };

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div className="user-navigation">
        {!isAuthenticated() && (
          <button className="button button--login" onClick={this.login}>
            Log In
          </button>
        )}
        {isAuthenticated() && (
          <button className="button button--logout" onClick={this.logout}>
            Log Out
          </button>
        )}
      </div>
    );
  }
}

export default UserNavgiation;