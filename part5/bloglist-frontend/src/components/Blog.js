import React, { useState } from "react";
import { PropTypes } from "prop-types";

const Blog = ({ blog, update, deleteBlog, removable = false }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    paddingBottom: 5,
    borderRadius: 6,
  };

  return (
    <div className="blogs" style={blogStyle}>
      {blog.title} {blog.author} &nbsp;
      <button onClick={() => setVisible(!visible)}>
        {visible ? "hide" : "show"}
      </button>
      <br />
      {visible && (
        <div>
          {blog.url}
          <br />
          likes {blog.likes} &nbsp;
          <button onClick={update}>like</button>
          <br />
          {blog.user.name}
          <br />
          {removable && <button onClick={deleteBlog}>remove</button>}
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  removable: PropTypes.bool,
};

export default Blog;
