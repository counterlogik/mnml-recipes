import React from "react";
import { render } from "react-dom";
import { Route, Router } from "react-router-dom";
import UserNavgiation from "./components/UserNavgiation";
import Dashboard from "./components/Dashboard";
import Callback from "./components/Callback";
import RecipeDetails from "./components/RecipeDetails";
import Auth from "./services/Auth";
import history from "./services/History";
import "./css/style.css";
import registerServiceWorker from "./registerServiceWorker";

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

const Routes = () => {
  return (
    <Router history={history}>
      <div className="routed">
        <Route
          path="/"
          render={props => <UserNavgiation auth={auth} {...props} />}
        />
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
            return <RecipeDetails {...props} />;
          }}
        />
      </div>
    </Router>
  );
};

render(Routes(), document.querySelector("#App"));

registerServiceWorker();
