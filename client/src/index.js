import React from "react";
import { render } from "react-dom";
import { Route, Router } from "react-router-dom";
import UserNavgiation from "./components/UserNavgiation";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import RecipeDetails from "./components/RecipeDetails";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import Auth from "./services/Auth";
import history from "./services/History";
import "./css/style.css";
import registerServiceWorker from "./registerServiceWorker";

class Routes extends React.Component {
  state = {
    authenticated: false
  };

  componentDidMount() {
    // check if user is logged in on refresh
    this.toggleAuthenticateStatus();
  }

  toggleAuthenticateStatus = () => {
    // check authenticated status and toggle state based on that
    this.setState({ authenticated: Auth.isUserAuthenticated() });
  };

  render() {
    return (
      <Router history={history}>
        <div className="routed">
          <UserNavgiation history={history} {...this.props} />
          <Route
            exact
            path="/"
            render={props => (
              <Home
                toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()}
                {...props}
              />
            )}
          />
          <Route path="/dashboard" render={props => <Dashboard {...props} />} />
          <Route
            path="/recipeDetails/:recipeId"
            render={props => {
              return <RecipeDetails {...props} />;
            }}
          />
          <Route
            path="/login"
            history={history}
            render={props => {
              return (
                <Login
                  toggleAuthenticateStatus={() =>
                    this.toggleAuthenticateStatus()
                  }
                  {...props}
                />
              );
            }}
          />
          <Route path="/register" component={Register} />
          <Route path="/logout" component={Logout} />
        </div>
      </Router>
    );
  }
}

render(<Routes />, document.querySelector("#App"));

registerServiceWorker();
