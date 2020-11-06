import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userService from "../services/userService";
import { setNotification } from "../reducers/notificationReducer";
import { connect } from "react-redux";
import {
  Table,
  TableContainer,
  TableCell,
  TableHead,
  TableBody,
  Paper,
  TableRow,
} from "@material-ui/core";

const Users = ({ setNotification }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    userService
      .getAll()
      .then((users) => {
        setUsers(users);
      })
      .catch(() => {
        setNotification({
          type: "error",
          text: "Error: couldn't get user data",
        });
      });
  }, [setNotification]);

  const tdStyle = {
    textAlign: "center",
  };

  return (
    <div>
      <h2>
        <b>Users</b>
      </h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ backgroundColor: "darkgrey" }}>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Blogs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell style={tdStyle}>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default connect(null, { setNotification })(Users);
