import React, { useEffect, useState } from "react";
import NewBlog from "./NewBlog";
import Notification from "./Notification";
import blogService from "../services/blogs";

const Blogs = ({ name, create, setUser, message, setMessage }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

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
      <NewBlog
        create={create}
        setBlogs={setBlogs}
        setMessage={setMessage}
        blogs={blogs}
      />
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            {blog.title} {blog.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
