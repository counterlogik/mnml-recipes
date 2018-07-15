import React from "react";

const Register = () => (
  <form action="/api/register" method="post">
    <div>
      <label>Desired Username:</label>
      <input type="text" name="username" />
      <br />
    </div>
    <div>
      <label>Desired Password:</label>
      <input type="password" name="password" />
    </div>
    <div>
      <input type="submit" value="Submit" />
    </div>
  </form>
);

export default Register;
