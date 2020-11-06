import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Navigation = ({ name, logout }) => {
  return (
    <div>
      <Link to="/">blogs</Link> &nbsp;
      <Link to="/users">users</Link> &nbsp;
      {name} logged in &nbsp;
      <button type="button" onClick={logout}>
        logout
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  name: state.user?.name,
});

export default connect(mapStateToProps, null)(Navigation);
