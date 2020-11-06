import React, { useState } from "react";
import { connect } from "react-redux";
import Notification from "./Notification";
import { PropTypes } from "prop-types";

const LoginForm = ({ handleLogin, message }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form id="loginform" onSubmit={handleLogin}>
      <div>
        <h2>log in to application</h2>
        username
        <input
          type="text"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
      {message && <Notification />}
    </form>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  message: PropTypes.object,
};

const mapStateToProps = (state) => ({
  message: state.notification?.notification ?? null,
});

export default connect(mapStateToProps, null)(LoginForm);
