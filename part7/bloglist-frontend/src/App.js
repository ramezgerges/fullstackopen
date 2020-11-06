import React, { useEffect } from "react";
import { connect } from "react-redux";
import Blogs from "./components/Blogs";
import Users from "./components/Users";
import UserView from "./components/UserView";
import BlogView from "./components/BlogView";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogService";
import loginService from "./services/loginService";
import Notification from "./components/Notification";
import { setUser } from "./reducers/userReducer";
import { setNotification } from "./reducers/notificationReducer";
import { Switch, Route } from "react-router";
import Navigation from "./components/Navigation";

const App = ({ user, setUser, setNotification }) => {
  useEffect(() => {
    const userJSON = window.localStorage.getItem("user");
    if (userJSON) {
      const userObject = JSON.parse(userJSON);
      setUser(userObject);
      blogService.setToken(userObject.token);
    }
  }, [setUser]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username: event.target.username.value,
        password: event.target.password.value,
      });
      window.localStorage.setItem("user", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setNotification(
        {
          type: "success",
          text: "Login successful!",
        },
        5
      );
    } catch (exception) {
      setNotification(
        {
          type: "error",
          text: "Wrong credentials",
        },
        5
      );
    }
  };

  const logout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  return (
    <div>
      {user === null ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <div>
          <Navigation logout={logout} />
          <h2>blog app</h2>
          <Notification />
          <Switch>
            <Route exact path="/">
              <Blogs blogService={blogService} />
            </Route>
            <Route exact path="/users">
              <Users />
            </Route>
            <Route exact path="/users/:id">
              <UserView />
            </Route>
            <Route exact path="/blogs/:id">
              <BlogView />
            </Route>
          </Switch>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  setUser,
  setNotification,
})(App);
