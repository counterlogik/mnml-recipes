import React from "react";
import { Link } from "react-router-dom";

class Register extends React.Component {
  state = {
    errors: {},
    user: {
      email: "",
      password: ""
    }
  };

  processForm = event => {
    event.preventDefault();

    // encode strings for HTTP body
    const email = this.state.user.email;
    const password = this.state.user.password;

    fetch("/api/signup", {
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

        // set success message
        localStorage.setItem("successMessage", response.message);

        // redirect registered user to login
        this.props.history.push("/login");
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
          <h2 className="header header--auth">register</h2>

          {this.state.errors.summary && (
            <p className="error-message">{this.state.errors.summary}</p>
          )}

          <input
            name="email"
            onChange={this.changeUser}
            value={this.state.user.email}
          />

          <input
            type="password"
            name="password"
            onChange={this.changeUser}
            value={this.state.user.password}
          />

          <button className="btn btn--auth" type="submit">
            log in
          </button>

          <button className="btn btn--auth" type="submit">
            <Link to={"/register"}>register</Link>
          </button>
        </form>
      </div>
    );
  }
}

export default Register;
