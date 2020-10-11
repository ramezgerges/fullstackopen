const _ = require("lodash");

// eslint-disable-next-line no-unused-vars
const dummy = () => {
  return 1;
};

const totalLikes = (blogList) => {
  return blogList.reduce((total, curr) => total + curr.likes, 0);
};

const favoriteBlog = (blogList) => {
  if (blogList.length === 0) return null;
  return blogList.reduce(
    (max, curr) => (curr.likes >= max.likes ? curr : max),
    { likes: 0 }
  );
};

const mostBlogs = (blogList) => {
  if (blogList.length === 0) return null;
  const max = _.chain(blogList)
    .countBy((blog) => blog.author)
    .toPairs()
    .sortBy(1)
    .last()
    .value();
  return {
    author: max[0],
    blogs: max[1]
  };
};

const mostLikes = (blogList) => {
  if (blogList.length === 0) return null;
  const authors = new Map();
  let maxLikes = -1;
  let maxAuthor = null;
  blogList.forEach((blog) => {
    const { author } = blog;
    const likes = (authors.has(author) ? authors.get(author) : 0) + blog.likes;
    authors.set(author, likes);
    if (likes > maxLikes) {
      maxAuthor = author;
      maxLikes = likes;
    }
  });
  return {
    author: maxAuthor,
    likes: maxLikes
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
