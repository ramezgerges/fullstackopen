import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import blogService from "../services/blogService";
import { setNotification } from "../reducers/notificationReducer";

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
      <button onClick={likeOnClick}>like</button>
      <br />
      added by {blog.user.name}
      <br />
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <input name="comment" type="text" />
        <button type="submit">add comment</button>
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
