const blogRouter = require("express").Router();
const Blog = require("../models/blog");
require("express-async-errors");

// eslint-disable-next-line no-unused-vars
blogRouter.get("/", async (request, response, next) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

// eslint-disable-next-line no-unused-vars
blogRouter.get("/:id", async (request, response, next) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) response.json(blog);
  else response.status(404).end();
});

// eslint-disable-next-line no-unused-vars
blogRouter.post("/", async (request, response, next) => {
  const blog = new Blog(request.body);

  const result = await blog.save();
  response.status(201).json(result);
});

blogRouter.delete("/:id", async (request, response) => {
  const { id } = request.params;
  const deletedBlog = await Blog.findByIdAndDelete(id);
  if (deletedBlog) response.status(204).json(deletedBlog);
  else response.status(404).end();
});

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
