import React, { useEffect, useState } from "react";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogService";
import loginService from "./services/loginService";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const userJSON = window.localStorage.getItem("user");
    if (userJSON) {
      setUser(JSON.parse(userJSON));
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("user", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setMessage({
        type: "success",
        text: "Login successful!",
      });
      setTimeout(() => setMessage(null), 5000);
    } catch (exception) {
      setMessage({
        type: "error",
        text: "Wrong credentials",
      });
      setTimeout(() => setMessage(null), 5000);
    }
  };

  return (
    <div>
      {user === null ? (
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
          message={message}
        />
      ) : (
        <Blogs
          name={user.name}
          setUser={setUser}
          blogService={blogService}
          message={message}
          setMessage={setMessage}
          username={user.username}
        />
      )}
    </div>
  );
};

export default App;
