import { useApolloClient, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import LoginForm from "./components/LoginForm";
import NewBook from "./components/NewBook";
import RecommendedBooks from "./components/RecommendedBooks";
import { LOGIN } from "./queries";

const App = () => {
  const client = useApolloClient();
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => console.log(error),
  });

  useEffect(() => {
    const token = localStorage.getItem("usertoken");
    if (token) setToken(token);
  }, []);

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("usertoken", token);
    }
  }, [result.data]);

  const handleLogin = (event) => {
    event.preventDefault();
    login({
      variables: {
        username: event.target.username.value,
        password: event.target.password.value,
      },
    });
    setPage("authors");
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("recommended")}>recommended</button>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>
      <Authors show={page === "authors"} />
      <Books show={page === "books"} />
      <RecommendedBooks show={page === "recommended"} />
      <NewBook show={page === "add"} />
      <LoginForm show={page === "login"} handleLogin={handleLogin} />
    </div>
  );
};

export default App;
