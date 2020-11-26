import React, { useState } from "react";
import { PropTypes } from "prop-types";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const LoginForm = ({ handleLogin, show }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (!show) return null;

  const style = {
    marginBottom: 7,
  };

  return (
    <form id="loginform" onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <TextField
        required
        style={style}
        label="username"
        type="text"
        value={username}
        name="username"
        onChange={({ target }) => setUsername(target.value)}
      />
      <br />
      <TextField
        required
        style={style}
        label="password"
        type="password"
        value={password}
        name="password"
        onChange={({ target }) => setPassword(target.value)}
      />
      <br />
      <Button required style={style} variant="contained" type="submit">
        login
      </Button>
    </form>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  message: PropTypes.object,
};

export default LoginForm;
