import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

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

const mapStatetoProps = (state) => ({
  message: state.notification?.notification ?? null,
});

export default connect(mapStatetoProps, null)(Notification);
