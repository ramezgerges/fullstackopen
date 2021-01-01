import { useApolloClient, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import LoginForm from "./components/LoginForm";
import NewBook from "./components/NewBook";
import RecommendedBooks from "./components/RecommendedBooks";
import { ALL_BOOKS, GET_BOOKS_BY_GENRE, LOGIN } from "./queries";

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
      localStorage.setItem("usertoken", token);
      setToken(token);
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
    setPage("authors");
    client.clearStore();
  };

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
    addedBook.genres.forEach((genre) => {
      const dataInStore = client.readQuery({
        query: GET_BOOKS_BY_GENRE,
        variables: {
          genre,
        },
      });
      if (!includedIn(dataInStore.allBooks, addedBook)) {
        client.writeQuery({
          query: GET_BOOKS_BY_GENRE,
          data: { allBooks: dataInStore.allBooks.concat(addedBook) },
        });
      }
    });
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
      <Authors show={page === "authors"} authenticated={token !== null} />
      <Books show={page === "books"} updateCacheWith={updateCacheWith} />
      <RecommendedBooks
        show={page === "recommended"}
        authenticated={token !== null}
      />
      <NewBook show={page === "add"} updateCacheWith={updateCacheWith} />
      <LoginForm show={page === "login"} handleLogin={handleLogin} />
    </div>
  );
};

export default App;
