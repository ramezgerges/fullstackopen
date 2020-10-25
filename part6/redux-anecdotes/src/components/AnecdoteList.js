import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUpvote } from "../reducers/anecdoteReducer";
import {
  removeNotification,
  setNotification,
} from "../reducers/notificationReducer";
import Notification from "../components/Notification";
import Filter from "../components/Filter";

const AnecdoteList = () => {
  const filter = useSelector((state) => state.filter);
  const anecdotes = useSelector((state) => state.anecdotes).filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  );
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(createUpvote(anecdote.id));
    dispatch(setNotification(`You voted "${anecdote.content}"`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
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

export default AnecdoteList;
