import "fontsource-roboto";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import blogService from "../services/blogService";
import { setNotification } from "../reducers/notificationReducer";
import { Button, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";

const BlogView = ({ setNotification }) => {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    blogService
      .getBlog(id)
      .then((blog) => {
        setBlog(blog);
      })
      .catch(() => {
        setNotification(
          {
            type: "error",
            text: "Error: couldn't fetch blog.",
          },
          5
        );
      });
  }, [id, setNotification]);

  const likeOnClick = async () => {
    try {
      const updatedBlog = await blogService.update(blog.id);
      setBlog(updatedBlog);
      setNotification(
        {
          type: "success",
          text: `Blog ${blog.title} likes updated.`,
        },
        5
      );
    } catch (e) {
      setNotification(
        {
          type: "error",
          text: "Error liking blog.",
        },
        5
      );
    }
  };

  const addComment = async (event) => {
    event.preventDefault();
    try {
      const response = await blogService.commentOnBlog(
        blog.id,
        event.target.comment.value
      );
      setBlog(response);
      setNotification({
        type: "success",
        text: "Added comment.",
      });
    } catch (e) {
      setNotification({
        type: "error",
        text: "Error: couldn't add comment.",
      });
    }
  };

  if (blog === null) return null;

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <br />
      <a href={blog.url}>{blog.url}</a>
      <br />
      likes {blog.likes} &nbsp;
      <Button variant="outlined" size="small" onClick={likeOnClick}>
        like
      </Button>
      <br />
      added by <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
      <br />
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <TextField required label="comment" name="comment" type="text" />
        <Button variant="contained" type="submit" size="small">
          add comment
        </Button>
      </form>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default connect(null, { setNotification })(BlogView);
