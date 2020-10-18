import React from "react";
import { PropTypes } from "prop-types";

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
    marginBottom: 10,
  };

  return (
    <div id="notif" className={message.type} style={style}>
      {message.text}
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.object,
};

export default Notification;
