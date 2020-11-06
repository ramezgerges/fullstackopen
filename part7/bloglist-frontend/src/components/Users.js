import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userService from "../services/userService";
import { setNotification } from "../reducers/notificationReducer";
import { connect } from "react-redux";

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
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td style={tdStyle}>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default connect(null, { setNotification })(Users);
