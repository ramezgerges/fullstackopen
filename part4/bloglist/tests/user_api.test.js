const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const logger = require("../utils/logger");
const { initialUsers } = require("./test_helper");

jest.setTimeout(30000);

const api = supertest(app);

afterAll(() => {
  mongoose.connection
    .close()
    .catch((error) =>
      logger.error("MongoDB connection error: ", error.message)
    );
});

beforeEach(async () => {
  await User.deleteMany({});
});

describe("POST /api/users", () => {
  const newUser = initialUsers[0];

  test("creates correct new user and returns it in JSON with 201", async () => {
    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("content-type", /application\/json/);

    expect(response.body.username).toEqual(newUser.username);
    expect(response.body.name).toEqual(newUser.name);
    expect(response.body.passwordHash).not.toBeDefined();
    expect(response.body._id).not.toBeDefined();
    expect(response.body.id).toBeDefined();
    expect(response.body.blogs).toEqual([]);

    const savedUser = await User.findOne({ username: newUser.username });
    expect(savedUser).not.toBeNull();
  });

  test("returns 400 if short password", async () => {
    const { password } = newUser;
    newUser.password = "rt";

    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("content-type", /application\/json/);

    expect(response.body).toEqual({ error: "password shorter than 3" });

    newUser.password = password;
  });

  test("returns 400 if bad password", async () => {
    const { password } = newUser;
    newUser.password = 3;

    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("content-type", /application\/json/);

    expect(response.body).toEqual({ error: "bad password" });
    newUser.password = password;
  });

  test("returns 400 if no username", async () => {
    const { username } = newUser;
    delete newUser.username;

    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("content-type", /application\/json/);

    expect(response.body?.error).toMatch(
      /^User validation failed: username:.*/
    );
    newUser.username = username;
  });

  test("returns 400 if short username", async () => {
    const { username } = newUser;
    newUser.username = "rt";

    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("content-type", /application\/json/);

    expect(response.body?.error).toMatch(
      /^User validation failed: username:.*/
    );
    newUser.username = username;
  });

  test("returns 400 if username not unique", async () => {
    await api.post("/api/users").send(newUser).expect(201);

    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("content-type", /application\/json/);

    expect(response.body?.error).toMatch(
      /^User validation failed: username:.*/
    );
  });
});
