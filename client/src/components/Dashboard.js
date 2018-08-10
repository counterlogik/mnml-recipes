import React, { Component } from "react";
import RecipeList from "../components/RecipeList";

class Dashboard extends Component {
  login = () => {
    this.props.auth.login();
  };

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        {isAuthenticated() && <RecipeList {...this.props} />}
        {!isAuthenticated() && <h4>you're not logged in.</h4>}
      </div>
    );
  }
}

export default Dashboard;
