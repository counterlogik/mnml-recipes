import React from "react";
import { Link } from "react-router-dom";
import Auth from "../services/Auth";

class Login extends React.Component {
  state = {
    errors: {},
    successMessage: "",
    user: {
      email: "",
      password: ""
    }
  };

  componentDidMount() {
    const storedMessage = localStorage.getItem("successMessage");
    let successMessage = "";

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem("successMessage");
    }

    this.setState({ successMessage });
  }

  processForm = event => {
    event.preventDefault();

    // encode strings for HTTP body
    const email = this.state.user.email;
    const password = this.state.user.password;

    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({ email, password })
    })
      .then(response => {
        if (!response.ok) throw Error(response.statusText);

        return response;
      })
      .catch(error => {
        console.error("Error:", error);
        this.setState({
          errors: { ...this.state.errors, error }
        });
      })
      .then(response => response.json())
      .then(response => {
        this.setState({
          errors: {}
        });

        // save the token and user id
        Auth.authenticateUser(response.token);
        Auth.storeUserId(response.user_id);

        // update authenticated state
        this.props.toggleAuthenticateStatus();

        // redirect signed in user to dashboard
        this.props.history.push("/dashboard");
      });
  };

  // change the user object
  changeUser = event => {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  };

  render() {
    return (
      <div className="container container--auth">
        <form
          className="form form--auth"
          action="/"
          onSubmit={this.processForm}
        >
          <h2 className="header header--auth">login</h2>

          {this.state.successMessage && (
            <p className="success-message">{this.state.successMessage}</p>
          )}
          {this.state.errors.summary && (
            <p className="error-message">{this.state.errors.summary}</p>
          )}

          <input
            className="edit-field edit-field--auth"
            name="email"
            onChange={this.changeUser}
            value={this.state.user.email}
          />

          <input
            className="edit-field edit-field--auth"
            type="password"
            name="password"
            onChange={this.changeUser}
            value={this.state.user.password}
          />

          <div className="btn-group btn-group--auth">
            <button className="btn btn--auth" type="submit">
              log in
            </button>

            <button className="btn btn--auth">
              <Link to={"/register"}>register</Link>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
