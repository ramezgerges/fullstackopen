import React, { useEffect } from "react";
import NewBlogForm from "./NewBlogForm";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { setUser } from "../reducers/userReducer";
import { setNotification } from "../reducers/notificationReducer";
import {
  setBlogs,
  sortBlogs,
  removeBlog,
  updateBlogLikes,
} from "../reducers/blogReducer";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const Blogs = ({
  blogService,
  setNotification,
  blogs,
  setBlogs,
  sortBlogs,
}) => {
  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => {
        setBlogs(blogs);
        sortBlogs();
      })
      .catch(() =>
        setNotification(
          {
            type: "error",
            text: "Error fetching blogs.",
          },
          5
        )
      );
  }, [blogService, setBlogs, setNotification, sortBlogs]);

  return (
    <div>
      <NewBlogForm
        create={blogService.create}
        setBlogs={setBlogs}
        setMessage={undefined}
        blogs={blogs}
      />
      <br />
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ backgroundColor: "darkgrey" }}>
            <TableRow>
              <TableCell>Blog</TableCell>
              <TableCell>Author</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
                <TableCell>{blog.author}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

Blogs.propTypes = {
  blogService: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  sortBlogs: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => ({
  blogs: state.blogs,
});

export default connect(mapStatetoProps, {
  setUser,
  setNotification,
  setBlogs,
  sortBlogs,
  removeBlog,
  updateBlogLikes,
})(Blogs);
