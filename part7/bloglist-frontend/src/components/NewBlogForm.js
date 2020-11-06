import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import Toggleable from "./Toggleable";
import { PropTypes } from "prop-types";
import { addBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const NewBlogForm = ({ create, addBlog, setNotification }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const newBlogRef = useRef(null);

  const onClick = async () => {
    try {
      const response = await create({ title, author, url });
      addBlog(response);
      setNotification(
        {
          type: "success",
          text: "A new blog was added successfully.",
        },
        5
      );
      if (newBlogRef.current) newBlogRef.current.toggleVisibility();
      setUrl("");
      setAuthor("");
      setTitle("");
    } catch (error) {
      const text = error.response
        ? error.response.data.error
        : "An error occurred during creating the blog.";
      setNotification(
        {
          type: "error",
          text,
        },
        5
      );
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
  addBlog: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  blogs: state.blogs,
});

export default connect(mapStateToProps, {
  addBlog,
  setNotification,
})(NewBlogForm);
