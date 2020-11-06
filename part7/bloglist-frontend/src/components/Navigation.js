import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import { Typography } from "@material-ui/core";

const Navigation = ({ name, logout }) => {
  return (
    <AppBar position="static" style={{ marginBottom: 10 }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu"></IconButton>
        <Button color="inherit" component={Link} to="/">
          blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>
        <Button type="button" onClick={logout}>
          logout
        </Button>
        {name && <Typography variant="h6">{name} logged in</Typography>}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => ({
  name: state.user?.name,
});

export default connect(mapStateToProps, null)(Navigation);
