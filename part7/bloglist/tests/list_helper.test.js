const listHelper = require("../utils/list_helper");
const helper = require("./test_helper");

const blogs = helper.initialBlogs.concat(helper.newBlog);

describe("Dummy tests", () => {
  test("dummy returns one", () => {
    // eslint-disable-next-line no-shadow
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });
});

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    }
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("test with 6 items", () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(36);
  });

  test("test with 4 items", () => {
    const result = listHelper.totalLikes(blogs.slice(0, 5));
    expect(result).toBe(34);
  });

  test("empty array test", () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });
});

describe("favoriteBlog tests", () => {
  test("empty array test", () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toBe(null);
  });

  test("test with 6 items", () => {
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toBe(blogs[2]);
  });

  test("test with 4 items", () => {
    const result = listHelper.favoriteBlog(blogs.slice(3));
    expect(result).toBe(blogs[3]);
  });
});

describe("mostBlogs tests", () => {
  test("empty array test", () => {
    const result = listHelper.mostBlogs([]);
    expect(result).toBe(null);
  });

  test("test with 6 items", () => {
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3
    });
  });

  test("test with 4 items", () => {
    const result = listHelper.mostBlogs(blogs.slice(0, 4));
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 2
    });
  });
});

describe("mostLikes tests", () => {
  test("empty array test", () => {
    const result = listHelper.mostLikes([]);
    expect(result).toBe(null);
  });

  test("test with 6 items", () => {
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17
    });
  });

  test("test with 2 items", () => {
    const result = listHelper.mostLikes(blogs.slice(0, 2));
    expect(result).toEqual({
      author: "Michael Chan",
      likes: 7
    });
  });
});
