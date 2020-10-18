const blogRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");
const config = require("../utils/config");
require("express-async-errors");

// eslint-disable-next-line no-unused-vars
blogRouter.get("/", async (request, response, ignore) => {
  const blogs = await Blog.find({}).populate("user", { blogs: 0 });
  response.json(blogs);
});

// eslint-disable-next-line no-unused-vars
blogRouter.get("/:id", async (request, response, ignore) => {
  const blog = await Blog.findById(request.params.id).populate("user", {
    blogs: 0
  });
  if (blog) response.json(blog);
  else response.status(404).end();
});

// eslint-disable-next-line no-unused-vars
blogRouter.post("/", async (request, response, ignore) => {
  const { body, token } = request;
  const decodedToken = jwt.verify(token, config.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    url: body.url,
    author: body.author,
    likes: body.likes,
    user: user?._id
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  return response.status(201).json(
    await Blog.findById(savedBlog._id).populate("user", {
      blogs: 0
    })
  );
});

blogRouter.delete("/:id", async (request, response) => {
  const { id } = request.params;
  const { token } = request;

  const decodedToken = jwt.verify(token, config.SECRET);
  if (!token || !decodedToken.id)
    return response.status(401).json({ error: "token missing or invalid" });

  const user = await User.findById(decodedToken.id);
  const blog = await Blog.findById(id);

  if (!user || !blog) return response.status(404).end();

  if (user._id.toString() !== blog.user.toString())
    return response.status(401).json({ error: "user doesn't match creator" });

  const deletedBlog = await Blog.findByIdAndDelete(id);
  const updatedUser = await User.findByIdAndUpdate(
    decodedToken.id,
    { $pull: { blogs: { $in: id } } },
    { new: true, runValidators: true, context: "query" }
  );

  if (deletedBlog && updatedUser) return response.status(204).end();
  return response.status(404).end();
});

// not updated to use tokens yet
blogRouter.patch("/:id", async (request, response) => {
  const { id } = request.params;
  if (!request.body?.likes) return response.status(400).end();
  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { likes: request.body.likes },
    { new: true, runValidators: true, context: "query" }
  );
  if (!updatedBlog) return response.status(404).end();
  return response.json(updatedBlog);
});

module.exports = blogRouter;
