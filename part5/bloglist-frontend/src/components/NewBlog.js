import React, { useState } from "react";

const NewBlog = ({ create, blogs, setBlogs, setMessage }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  return (
    <div>
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
      <input
        type="button"
        value="create"
        onClick={async () => {
          try {
            const response = await create({ title, author, url });
            setBlogs(blogs.concat(response));
            setMessage({
              type: "success",
              text: "A new blog was added successfully.",
            });
            setTimeout(() => setMessage(null), 5000);
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
        }}
      />
    </div>
  );
};

export default NewBlog;
