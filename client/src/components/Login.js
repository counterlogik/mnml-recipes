import React from "react";

const Login = () => (
  <form action="/api/login" method="post">
    <div>
      <label>Username:</label>
      <input type="text" name="username" />
      <br />
    </div>
    <div>
      <label>Password:</label>
      <input type="password" name="password" />
    </div>
    <div>
      <input type="submit" value="Login" />
    </div>
  </form>
);

export default Login;
