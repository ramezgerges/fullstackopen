/* eslint react/prop-types: 0 */
//TODO props validation

import React from "react";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  const style = {
    color: message.type === "error" ? "red" : "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };

  return (
    <div className={message.type} style={style}>
      {message.text}
    </div>
  );
};

export default Notification;
