import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

const App = () => {
  const good = () => {
    store.dispatch({
      type: "GOOD",
    });
  };
  const bad = () => {
    store.dispatch({
      type: "BAD",
    });
  };

  const ok = () => {
    store.dispatch({
      type: "OK",
    });
  };

  const zero = () => {
    store.dispatch({
      type: "ZERO",
    });
  };

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={bad}>neutral</button>
      <button onClick={ok}>bad</button>
      <button onClick={zero}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().bad}</div>
      <div>bad {store.getState().ok}</div>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

renderApp();
store.subscribe(renderApp);
