import React, { Component } from "react";
import RecipeList from "../components/RecipeList";
import Auth from "../services/Auth";

class Dashboard extends Component {
  render() {
    return (
      <div>
        {Auth.isUserAuthenticated() && <RecipeList {...this.props} />}
        {!Auth.isUserAuthenticated() && (
          <h4 className="header header--unauthenticated">
            you're not logged in.
          </h4>
        )}
      </div>
    );
  }
}

export default Dashboard;
