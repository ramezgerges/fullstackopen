import React from "react";
import { connect } from "react-redux";
import { upvoteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import Notification from "../components/Notification";
import Filter from "../components/Filter";

const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes;

  const vote = (anecdote) => {
    props.upvoteAnecdote(anecdote);
    props.setNotification(`You voted "${anecdote.content}"`, 5);
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default connect(
  (state) => {
    const filter = state.filter;
    const anecdotes = state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    );
    return {
      filter,
      anecdotes,
    };
  },
  {
    upvoteAnecdote,
    setNotification,
  }
)(AnecdoteList);
