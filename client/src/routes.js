import React from "react";
import { Route, Router } from "react-router-dom";
import App from "./components/App";
import Dashboard from "./components/Dashboard";
import Callback from "./components/Callback";
import RecipeDetailsContainer from "./containers/RecipeDetailsContainer";
import Auth from "./services/Auth";
import history from "./services/History";

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

export const makeRoutes = () => {
  return (
    <Router history={history}>
      <div>
        <Route path="/" render={props => <App auth={auth} {...props} />} />
        <Route
          path="/dashboard"
          render={props => <Dashboard auth={auth} {...props} />}
        />
        <Route
          path="/callback"
          render={props => {
            handleAuthentication(props);
            return <Callback {...props} />;
          }}
        />
        <Route
          path="/recipeDetails/:recipeId"
          render={props => {
            handleAuthentication(props);
            return <RecipeDetailsContainer {...props} />;
          }}
        />
      </div>
    </Router>
  );
};
