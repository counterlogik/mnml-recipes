import React from "react";
import Auth from "../services/Auth";

class Home extends React.Component {
  componentDidMount() {
    // update authenticated state on logout
    this.props.toggleAuthenticateStatus();
  }

  render() {
    return (
      <div className="container container--home">
        <h3 className="header header--home">your recipes...</h3>
        {Auth.isUserAuthenticated() ? (
          <p>you are logged in.</p>
        ) : (
          <p>you are not logged in.</p>
        )}
      </div>
    );
  }
}

export default Home;
