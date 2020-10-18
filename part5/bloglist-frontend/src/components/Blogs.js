import React, { useEffect, useState } from "react";
import NewBlogForm from "./NewBlogForm";
import Notification from "./Notification";
import Blog from "./Blog";
import { PropTypes } from "prop-types";

const Blogs = ({ name, blogService, setUser, message, setMessage }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
      .catch(() =>
        setMessage({
          type: "error",
          text: "Error fetching blogs.",
        })
      );
  }, [blogService, setMessage]);

  const updateBlogs = async () => {
    try {
      const blogs = await blogService.getAll();
      setBlogs(blogs.sort((a, b) => b.likes - a.likes));
    } catch (e) {
      setMessage({
        type: "error",
        text: "Error updating blogs.",
      });
      console.log(e);
      setTimeout(() => setMessage(null), 5000);
    }
  };

  const likeOnClick = async (index) => {
    try {
      const blog = blogs[index];
      await blogService.update(blog.id);
      const updatedBlogs = [...blogs];
      updatedBlogs[index].likes++;
      setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes));
      setMessage({
        type: "success",
        text: `Blog ${blog.title} likes updated.`,
      });
      setTimeout(() => setMessage(null), 5000);
    } catch (e) {
      setMessage({
        type: "error",
        text: "Error liking blog.",
      });
    }
    setTimeout(() => setMessage(null), 5000);
    updateBlogs();
  };

  const removeOnClick = async (index) => {
    try {
      const blog = blogs[index];
      if (
        window.confirm(
          `Are you sure you want to delete ${blog.title} by ${blog.author}?`
        )
      ) {
        await blogService.deleteObject(blog.id);
        setBlogs(blogs.splice(index, 1));
      }
    } catch (e) {
      setMessage({
        type: "error",
        text: "Error deleting blog.",
      });
    }
    setTimeout(() => setMessage(null), 5000);
    await updateBlogs();
  };

  return (
    <div>
      <h2>blogs</h2>
      {<Notification message={message} />}
      {name} logged in
      <input
        type="button"
        value="logout"
        onClick={() => {
          window.localStorage.clear();
          setUser(null);
        }}
      />
      <h2>create new</h2>
      <NewBlogForm
        create={blogService.create}
        setBlogs={setBlogs}
        setMessage={setMessage}
        blogs={blogs}
      />
      <br />
      {blogs.map((blog, index) => {
        return (
          <Blog
            key={blog.id}
            blog={blog}
            update={() => likeOnClick(index)}
            deleteBlog={() => removeOnClick(index)}
            removable={name === blog.user.name}
          />
        );
      })}
    </div>
  );
};

Blogs.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  blogService: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
  message: PropTypes.object,
  setMessage: PropTypes.func.isRequired,
};

export default Blogs;
