import React from "react";
import Notification from "./Notification";
import { PropTypes } from "prop-types";

const LoginForm = ({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
  message,
}) => (
  <form id="loginform" onSubmit={handleLogin}>
    <div>
      <h2>log in to application</h2>
      username
      <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
      <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
    {message && <Notification message={message} />}
  </form>
);

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  message: PropTypes.object,
};

export default LoginForm;
