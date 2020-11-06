const blogReducer = (state = [], action) => {
  let updatedState;
  switch (action.type) {
    default:
      return state;
    case "SET":
      return action.data.blogs;
    case "ADD":
      return state.concat(action.data.blog);
    case "SORT":
      return state.sort((a, b) => b.likes - a.likes);
    case "REMOVE":
      updatedState.splice(action.data.index, 1);
      return updatedState;
    case "UPDATE_LIKES":
      updatedState = [...state];
      updatedState[action.data.index].likes++;
      return updatedState;
  }
};

export const setBlogs = (blogs) => {
  return (dispatch) => {
    dispatch({
      type: "SET",
      data: {
        blogs,
      },
    });
  };
};

export const addBlog = (blog) => {
  return (dispatch) => {
    dispatch({
      type: "ADD",
      data: {
        blog,
      },
    });
  };
};

export const sortBlogs = () => {
  return (dispatch) => {
    dispatch({
      type: "SORT",
    });
  };
};

export const removeBlog = (index) => {
  return (dispatch) => {
    dispatch({
      type: "REMOVE",
      data: {
        index,
      },
    });
  };
};

export const updateBlogLikes = (index) => {
  return (dispatch) => {
    dispatch({
      type: "UPDATE_LIKES",
      data: {
        index,
      },
    });
  };
};

export default blogReducer;
