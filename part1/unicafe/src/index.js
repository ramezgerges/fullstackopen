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

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;

  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  } else {
    return (
      <table>
        <tbody>
          <Statistic text={"good"} value={good} />
          <Statistic text={"neutral"} value={neutral} />
          <Statistic text={"bad"} value={bad} />
          <Statistic text={"all"} value={all} />
          <Statistic text={"average"} value={(good - bad) / all} />
          <Statistic text={"positive"} value={(good * 100 / all) + " %"} />
        </tbody>
      </table>
    );
  }
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  
  const incrementStatFactory = (value, setter) => () => setter(value + 1);

  //console.log(good, neutral, bad);

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={incrementStatFactory(good, setGood)} text={"good"} />
      <Button onClick={incrementStatFactory(neutral, setNeutral)} text={"neutral"} />
      <Button onClick={incrementStatFactory(bad, setBad)} text={"bad"} />

      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />,
  document.getElementById("root")
);