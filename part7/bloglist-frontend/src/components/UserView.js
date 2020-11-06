import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import userService from "../services/userService";
import { connect } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const UserView = ({ setNotification }) => {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    userService
      .getUser(id)
      .then((user) => {
        setUser(user);
      })
      .catch(() => {
        setNotification({
          type: "error",
          text: "Error: couldn't get user data.",
        });
      });
  }, [id, setNotification]);

  if (user === null) return null;

  return (
    <div>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog, index) => (
          <li key={index}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default connect(null, { setNotification })(UserView);
