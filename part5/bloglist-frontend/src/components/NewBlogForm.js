import React, { useRef, useState } from "react";
import Toggleable from "./Toggleable";
import { PropTypes } from "prop-types";

const NewBlogForm = ({ create, blogs, setBlogs, setMessage }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const newBlogRef = useRef(null);

  const onClick = async () => {
    try {
      const response = await create({ title, author, url });
      setBlogs(blogs.concat(response));
      setMessage({
        type: "success",
        text: "A new blog was added successfully.",
      });
      setTimeout(() => setMessage(null), 5000);
      if (newBlogRef.current) newBlogRef.current.toggleVisibility();
      setUrl("");
      setAuthor("");
      setTitle("");
    } catch (error) {
      const text = error.response
        ? error.response.data.error
        : "An error occurred during creating the blog.";
      setMessage({
        type: "error",
        text: text,
      });
      setTimeout(() => setMessage(null), 5000);
    }
  };

  return (
    <Toggleable ref={newBlogRef} buttonLabel="Create">
      <div id="newblog">
        title:
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
        <br />
        author:
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
        <br />
        url:
        <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
        <br />
        <button id="create" onClick={onClick}>
          create
        </button>
      </div>
    </Toggleable>
  );
};

NewBlogForm.propTypes = {
  create: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  toggleVisibility: PropTypes.func,
};

export default NewBlogForm;
