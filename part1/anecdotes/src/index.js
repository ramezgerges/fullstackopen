/* eslint react/prop-types: 0 */
//TODO props validation

import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  );
};

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));

  //min- and max-inclusive
  const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  const setRandomAnecdote = () => setSelected(randomIntFromInterval(0, anecdotes.length - 1));
  
  const submitVote = () => {
    const copy = [ ...points ];
    copy[selected]++;
    setPoints(copy);
    setRandomAnecdote();
  };

  const maxIndex = (array) => {
    let index = 0;
    let val = 0;

    for (let i = 0; i < array.length; i++) {
      if (array[i] > val) {
        index = i;
        val = array[i];
      }
    }
    return index;
  };

  //console.log(selected);
  //console.log(points);
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br />
      has {points[selected]} votes
      <br />
      <Button text={"vote"} onClick={submitVote} />
      <Button text={"next anecdote"} onClick={setRandomAnecdote} />
      <h1>Anecdote with most votes</h1>
      {anecdotes[maxIndex(points)]}
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById("root")
);