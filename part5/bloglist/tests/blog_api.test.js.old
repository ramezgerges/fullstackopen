const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const { initialDB, newBlog } = require("./test_helper");
const Blog = require("../models/blog");
const logger = require("../utils/logger");

const api = supertest(app);

afterAll(() => {
  mongoose.connection
    .close()
    .catch((error) =>
      logger.error("MongoDB connection error: ", error.message)
    );
});

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogs = initialDB.map((blog) => new Blog(blog));
  const promises = blogs.map((blog) => blog.save());
  await Promise.all(promises);
});

describe("GET /api/blogs", () => {
  test("returns JSON and correct length", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("content-type", /application\/json/);

    expect(response.body).toHaveLength(initialDB.length);
  });

  test('blogs use "id" not "_id"', async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("content-type", /application\/json/);

    response.body.forEach((blog) => {
      expect(blog.id).toBeDefined();
      expect(blog._id).not.toBeDefined(); // eslint-disable-line no-underscore-dangle
    });
  });
});

describe("GET /api/blogs/:id", () => {
  test("returns correct blog in JSON", async () => {
    const response = await api
      .get("/api/blogs/5a422aa71b54a676234d17f8")
      .expect(200)
      .expect("content-type", /application\/json/);

    expect(response.body).toEqual({
      id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5
    });
  });

  test("returns 404 if no id matches blog", async () => {
    await api.get("/api/blogs/5a422bc61b54a676222d17fc").expect(404);
  });
});

describe("POST /api/blogs", () => {
  test("creates correct new blog and returns it in JSON", async () => {
    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("content-type", /application\/json/);

    expect(response.body).toEqual({
      id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2
    });

    const response2 = await api
      .get("/api/blogs")
      .expect(200)
      .expect("content-type", /application\/json/);

    expect(response2.body).toHaveLength(initialDB.length + 1);
  });

  test("defaults likes to zero", async () => {
    const { likes } = newBlog;
    delete newBlog.likes;

    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("content-type", /application\/json/);

    expect(response.body.likes).toEqual(0);

    newBlog.likes = likes;
  });

  test("returns 400 if no title", async () => {
    const { title } = newBlog;
    delete newBlog.title;

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400)
      .expect("content-type", /application\/json/);

    newBlog.title = title;
  });

  test("returns 400 if no url", async () => {
    const { url } = newBlog;
    delete newBlog.url;

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400)
      .expect("content-type", /application\/json/);
    newBlog.url = url;
  });
});

describe("DELETE /api/:id", () => {
  test("returns 404 if no blog matches id", async () => {
    await api.delete("/api/blogs/5a422bc61b54a676222d17fc").expect(404);
  });

  test("returns 204 if id matches a blog and deletes it", async () => {
    await api.delete("/api/blogs/5a422a851b54a676234d17f7").expect(204);
    await api.get("/api/blogs/5a422a851b54a676234d17f7").expect(404);
  });
});

describe("PATCH /api/blogs/:id", () => {
  test("updates likes and returns blog in JSON", async () => {
    const response = await api
      .patch("/api/blogs/5a422b3a1b54a676234d17f9")
      .send({ likes: 10 })
      .expect(200)
      .expect("content-type", /application\/json/);

    expect(response.body).toEqual({
      id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 10
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
