const supertest = require("supertest");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const app = require("../app");
const { initialBlogs, newBlog, initialUsers } = require("./test_helper");
const Blog = require("../models/blog");
const User = require("../models/user");
const logger = require("../utils/logger");

jest.setTimeout(30000);

const api = supertest(app);

let blogs;
let users;
let token;
let blogger;

afterAll(() => {
  mongoose.connection
    .close()
    .catch((error) =>
      logger.error("MongoDB connection error: ", error.message)
    );
});

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const userPromises = initialUsers.map(async (user) => {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(user.password, saltRounds);
    const userObject = new User({ ...user, passwordHash });
    return userObject.save();
  });
  users = await Promise.all(userPromises);

  const blogPromises = initialBlogs.map((blog, index) => {
    let user;
    if (index < Math.floor(initialBlogs.length / 2)) [user] = users;
    else [user] = users;
    const blogObject = new Blog({ ...blog, user: user._id });
    user.blogs = user.blogs.concat(blogObject._id);
    return blogObject.save();
  });
  blogs = await Promise.all(blogPromises);

  const savePromises = users.map((user) => user.save());
  users = await Promise.all(savePromises);

  const initResponse = await api
    .post("/api/login")
    .send(initialUsers[0])
    .expect(200)
    .expect("content-type", /application\/json/);

  token = initResponse.body.token;
  [blogger] = users;
});

describe("GET /api/blogs", () => {
  test("returns JSON and correct length", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("content-type", /application\/json/);

    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test('blogs use "id" not "_id" or "__v"', async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("content-type", /application\/json/);

    response.body.forEach((blog) => {
      expect(blog.id).toBeDefined();
      expect(blog._id).not.toBeDefined();
      expect(blog.__v).not.toBeDefined();
    });
  });
});

describe("GET /api/blogs/:id", () => {
  test("returns correct blog in JSON", async () => {
    const promises = blogs.map(async (blog) => {
      const response = await api
        .get(`/api/blogs/${blog._id}`)
        .expect(200)
        .expect("content-type", /application\/json/);

      expect(response.body).toEqual({
        id: blog._id.toString(),
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        user: blog.user.toString()
      });

      const user = await User.findById(blog.user);
      expect(user.blogs.includes(blog._id.toString())).toEqual(true);
    });

    await Promise.all(promises);
  });

  test("returns 404 if no id matches blog", async () => {
    await api.get("/api/blogs/5a422bc61b54a676222d17fc").expect(404);
  });
});

describe("POST /api/blogs", () => {
  test("creates correct new blog and returns it in JSON with 201", async () => {
    const response = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...newBlog, user: blogger._id.toString() })
      .expect(201)
      .expect("content-type", /application\/json/);

    expect(response.body).toEqual(
      expect.objectContaining({
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
        likes: newBlog.likes,
        user: blogger._id.toString()
      })
    );

    const updatedUser = await User.findById(blogger._id);
    expect(updatedUser.blogs.includes(response.body.id)).toEqual(true);

    const response2 = await api
      .get("/api/blogs")
      .expect(200)
      .expect("content-type", /application\/json/);

    expect(response2.body).toHaveLength(initialBlogs.length + 1);
  });

  test("defaults likes to zero", async () => {
    const newBlogModified = { ...newBlog };
    delete newBlogModified.likes;

    const response = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...newBlogModified, user: blogger._id.toString() })
      .expect(201)
      .expect("content-type", /application\/json/);

    expect(response.body.likes).toEqual(0);
  });

  test("returns 400 if no title", async () => {
    const newBlogModified = { ...newBlog };
    delete newBlogModified.title;

    const response = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...newBlogModified, user: blogger._id.toString() })
      .expect(400)
      .expect("content-type", /application\/json/);

    expect(response.body.error).toMatch(/^Blog validation failed: title:.*/);
  });

  test("returns 400 if no url", async () => {
    const newBlogModified = { ...newBlog };
    delete newBlogModified.url;

    const response = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...newBlogModified, user: blogger._id.toString() })
      .expect(400)
      .expect("content-type", /application\/json/);

    expect(response.body.error).toMatch(/^Blog validation failed: url:.*/);
  });

  test("returns 401 if invalid token", async () => {
    await api
      .post("/api/blogs")
      .set("Authorization", "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9")
      .send({ ...newBlog, user: blogger._id.toString() })
      .expect(401)
      .expect("content-type", /application\/json/);
  });

  test("returns 401 if no token", async () => {
    await api
      .post("/api/blogs")
      .send({ ...newBlog, user: blogger._id.toString() })
      .expect(401)
      .expect("content-type", /application\/json/);
  });
});

describe("DELETE /api/:id", () => {
  test("returns 404 if no blog matches id", async () => {
    await api
      .delete("/api/blogs/5a422bc61b54a676222d17fc")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });

  test("returns 204 if id matches a blog and deletes it", async () => {
    await api
      .delete(`/api/blogs/${blogger.blogs[0]}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);
    await api.get(`/api/blogs/${blogger.blogs[0]}`).expect(404);
  });
});

describe("PATCH /api/blogs/:id", () => {
  test("updates likes and returns blog in JSON", async () => {
    const blog = blogs[0];
    const user = await User.findById(blog.user);
    const userId = user._id;

    const response = await api
      .patch(`/api/blogs/${blog._id}`)
      .send({ likes: 10 })
      .expect(200)
      .expect("content-type", /application\/json/);

    expect(response.body).toEqual({
      id: blog._id.toString(),
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: 10,
      user: userId.toString()
    });
  });

  test("returns 404 if no id matches blog", async () => {
    await api
      .patch("/api/blogs/5a422bc61b54a676222d17fc")
      .send({ likes: 10 })
      .expect(404);
  });

  test("returns 400 if no likes provided", async () => {
    await api.patch("/api/blogs/5a422b3a1b54a676234d17f9").send().expect(400);
  });
});
