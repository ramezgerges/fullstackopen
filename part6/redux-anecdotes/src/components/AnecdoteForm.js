import React from "react";
import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  const create = (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    props.createAnecdote(content);
    props.setNotification(`You created "${content}"`, 5);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name="content" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default connect(null, {
  createAnecdote,
  setNotification,
})(AnecdoteForm);
