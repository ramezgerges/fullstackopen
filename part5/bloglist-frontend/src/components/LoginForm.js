import React from "react";
import Notification from "./Notification";

const loginForm = ({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
  message,
}) => (
  <form onSubmit={handleLogin}>
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

export default loginForm;
